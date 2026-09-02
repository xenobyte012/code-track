import axios from "axios";

// GitHub API configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

/**
 * Get heatmap data for a specific year
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getHeatmapData = async (req, res) => {
  try {
    const { year } = req.query;
    const targetYear = year ? parseInt(year) : new Date().getFullYear();
    const currentYear = new Date().getFullYear();
    // Validate year
    if (isNaN(targetYear) || targetYear < 2020 || targetYear > currentYear) {
      return res.status(400).json({
        success: false,
        error: `Invalid year. Please use a valid year (2020-${currentYear})`,
      });
    }

    // Validate GitHub configuration
    if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
      return res.status(500).json({
        success: false,
        error:
          "GitHub configuration is missing. Please check your environment variables.",
      });
    }

    console.log(
      `📊 Fetching heatmap data for ${GITHUB_USERNAME} in ${targetYear}`,
    );

    // Calculate date range for the year
    const startDate = new Date(`${targetYear}-01-01`);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(`${targetYear}-12-31`);
    endDate.setHours(23, 59, 59, 999);

    // Get all repositories
    const repos = await fetchAllRepos();

    if (repos.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No repositories found for this user.",
      });
    }

    console.log(`📁 Found ${repos.length} repositories`);

    // Initialize commit counts for each day of the year
    const commitCounts = initializeDailyCounts(startDate, endDate);

    // Fetch commits from all repositories
    let totalCommits = 0;
    await processReposInBatches(
      repos,
      startDate,
      endDate,
      commitCounts,
      (count) => {
        totalCommits += count;
      },
    );

    // Format data for the heatmap
    const formattedData = formatHeatmapData(commitCounts);

    console.log(`✅ Found ${totalCommits} total commits`);

    res.json({
      success: true,
      year: targetYear,
      totalCommits: totalCommits,
      data: formattedData,
    });
  } catch (error) {
    console.error("❌ Error fetching heatmap data:", error);

    // Handle specific error types
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        return res.status(401).json({
          success: false,
          error: "GitHub authentication failed. Please check your token.",
        });
      } else if (status === 403) {
        return res.status(403).json({
          success: false,
          error: "GitHub API rate limit exceeded. Please try again later.",
        });
      } else if (status === 404) {
        return res.status(404).json({
          success: false,
          error: "GitHub user not found.",
        });
      }
    }

    res.status(500).json({
      success: false,
      error: "Failed to fetch heatmap data",
      details: error.message,
    });
  }
};

/**
 * Fetch all repositories for the user with pagination
 */
const fetchAllRepos = async () => {
  let allRepos = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await axios.get(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
      {
        params: {
          per_page: 100,
          page: page,
          sort: "updated",
        },
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    const repos = response.data;
    allRepos = [...allRepos, ...repos];

    if (repos.length < 100) {
      hasMore = false;
    } else {
      page++;
    }
  }

  return allRepos;
};

/**
 * Initialize daily commit counts for the year
 */
const initializeDailyCounts = (startDate, endDate) => {
  const commitCounts = {};
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split("T")[0];
    commitCounts[dateStr] = 0;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return commitCounts;
};

/**
 * Process repositories in batches to avoid rate limiting
 */
const processReposInBatches = async (
  repos,
  startDate,
  endDate,
  commitCounts,
  onCommitCount,
) => {
  const batchSize = 3;
  let totalCommits = 0;

  for (let i = 0; i < repos.length; i += batchSize) {
    const batch = repos.slice(i, i + batchSize);

    const batchPromises = batch.map(async (repo) => {
      try {
        const commits = await fetchCommitsForRepo(repo, startDate, endDate);

        // Count commits by date
        commits.forEach((commit) => {
          const commitDate = new Date(commit.commit.author.date);
          const dateStr = commitDate.toISOString().split("T")[0];

          if (commitCounts[dateStr] !== undefined) {
            commitCounts[dateStr] += 1;
            totalCommits += 1;
          }
        });
      } catch (error) {
        console.error(
          `Error fetching commits for ${repo.name}:`,
          error.message,
        );
      }
    });

    await Promise.allSettled(batchPromises);

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  if (onCommitCount) {
    onCommitCount(totalCommits);
  }
};

/**
 * Fetch all commits for a single repository with pagination
 */
const fetchCommitsForRepo = async (repo, startDate, endDate) => {
  let allCommits = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await axios.get(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits`,
      {
        params: {
          since: startDate.toISOString(),
          until: endDate.toISOString(),
          per_page: 100,
          page: page,
          author: GITHUB_USERNAME,
        },
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    const commits = response.data;
    allCommits = [...allCommits, ...commits];

    if (commits.length < 100) {
      hasMore = false;
    } else {
      page++;
    }
  }

  return allCommits;
};

/**
 * Format data for the heatmap
 */
const formatHeatmapData = (commitCounts) => {
  return Object.keys(commitCounts).map((date) => ({
    date: date,
    count: commitCounts[date],
  }));
};
