import express from "express"
import cors from "cors";
import axios from "axios";

// GitHub API configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
console.log(GITHUB_USERNAME)

// Route: Get weekly commits (7 days before/after selected date)
// app.get("/api/github/weekly-commits",
export const weeklyCommits =  async (req, res) => {
  try {
    const { date } = req.query;
    let targetDate;

    if (date) {
      targetDate = new Date(date);
      if (isNaN(targetDate.getTime())) {
        return res.status(400).json({
          error: "Invalid date format. Use YYYY-MM-DD",
        });
      }
    } else {
      // Default to today's date
      targetDate = new Date();
    }

    // Calculate the 7-day window (7 days before and 7 days after selected date)
    const startDate = new Date(targetDate);
    startDate.setDate(targetDate.getDate() - 7);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(targetDate);
    endDate.setDate(targetDate.getDate() + 7);
    endDate.setHours(23, 59, 59, 999);
    console.log("🔥 weeklyCommits API CALLED");

    console.log("👤 Username:", GITHUB_USERNAME);
    console.log("🔑 Token exists:", !!GITHUB_TOKEN);
    // Get all repos for the user
    const reposResponse = await axios.get(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2026-03-10",
        },
      },
    );

    const repos = reposResponse.data;
    const commitCounts = {};

    // Initialize all 14 days with 0 commits
    for (let i = -7; i <= 7; i++) {
      const date = new Date(targetDate);
      date.setDate(targetDate.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];
      commitCounts[dateStr] = 0;
    }

    // Fetch commits for each repo (limit to first 10 for performance)
    const repoPromises = repos.slice(0, 20).map(async (repo) => {
      try {
        const since = startDate.toISOString();
        const until = endDate.toISOString();

        const commitsResponse = await axios.get(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits`,
          {
            params: {
              since: since,
              until: until,
              per_page: 100,
              author: GITHUB_USERNAME,
            },
            headers: {
              Authorization: `Bearer ${GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
              "X-GitHub-Api-Version": "2026-03-10",
            },
          },
        );

        const commits = commitsResponse.data;

        console.log("================================");
        console.log("📦 REPOSITORY:", repo.name);
        console.log("📅 SINCE:", since);
        console.log("📅 UNTIL:", until);
        console.log("👤 AUTHOR:", GITHUB_USERNAME);
        console.log("🔥 COMMITS FOUND:", commits.length);
        console.log("================================");
        //console.log(commits);
        // Count commits by date
        commits.forEach((commit) => {
          const commitDate = new Date(commit.commit.author.date);
          const dateStr = commitDate.toISOString().split("T")[0];

          // Only count commits within our 7-day window
          if (commitCounts[dateStr] !== undefined) {
            commitCounts[dateStr] += 1;
          }
        });
        
      } catch (error) {
        console.error(`❌ Error fetching commits for ${repo.name}`);
        console.error("Status:", error.response?.status);
        console.error("GitHub message:", error.response?.data);
        console.error("Message:", error.message);
        console.log("Username:", GITHUB_USERNAME);
        console.log("Token exists:", !!GITHUB_TOKEN);
        console.log("Token length:", GITHUB_TOKEN?.length);
        console.log("Token prefix:", GITHUB_TOKEN?.substring(0, 10));
      }
    });

    await Promise.allSettled(repoPromises);
    console.log(`what the hellal ${repoPromises}`)
    // Format data for chart (sorted by date)
    const sortedDates = Object.keys(commitCounts).sort();
    const formattedData = sortedDates.map((date) => ({
      date: date,
      commits: commitCounts[date],
      // Get day of week for display
      day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
    }));
    
    res.json({
      period: {
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
        selected: targetDate.toISOString().split("T")[0],
      },
      data: formattedData,
   
    });
  } catch (error) {
    console.error("Error fetching weekly commits:", error);
    res.status(500).json({
      error: "Failed to fetch weekly commits",
      details: error.message,
    });
  }
};

// Alternative: Get commits with pagination for more accurate results
// app.get("/api/github/weekly-commits-detailed", 
export const weeklyCommitsDetailed = async (req, res) => {
  try {
    const { date } = req.query;
    let targetDate;

    if (date) {
      targetDate = new Date(date);
      if (isNaN(targetDate.getTime())) {
        return res.status(400).json({
          error: "Invalid date format. Use YYYY-MM-DD",
        });
      }
    } else {
      targetDate = new Date();
    }

    // Calculate the 7-day window
    const startDate = new Date(targetDate);
    startDate.setDate(targetDate.getDate() - 7);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(targetDate);
    endDate.setDate(targetDate.getDate() + 7);
    endDate.setHours(23, 59, 59, 999);

    // Get all repos
    let allRepos = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const reposResponse = await axios.get(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
        {
          params: {
            per_page: 100,
            page: page,
            sort: "updated",
          },
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
        },
      );

      const repos = reposResponse.data;
      allRepos = [...allRepos, ...repos];

      if (repos.length < 100) {
        hasMore = false;
      } else {
        page++;
      }
    }

    const commitCounts = {};

    // Initialize all 14 days with 0 commits
    for (let i = -7; i <= 7; i++) {
      const date = new Date(targetDate);
      date.setDate(targetDate.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];
      commitCounts[dateStr] = 0;
    }

    // Process repos in batches
    const batchSize = 3;
    for (let i = 0; i < allRepos.length; i += batchSize) {
      const batch = allRepos.slice(i, i + batchSize);

      const batchPromises = batch.map(async (repo) => {
        try {
          let allCommits = [];
          let commitPage = 1;
          let hasMoreCommits = true;

          while (hasMoreCommits) {
            const commitsResponse = await axios.get(
              `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits`,
              {
                params: {
                  since: startDate.toISOString(),
                  until: endDate.toISOString(),
                  per_page: 100,
                  page: commitPage,
                  author: GITHUB_USERNAME,
                },
                headers: {
                  Authorization: `token ${GITHUB_TOKEN}`,
                  Accept: "application/vnd.github.v3+json",
                },
              },
            );

            const commits = commitsResponse.data;
            allCommits = [...allCommits, ...commits];

            if (commits.length < 100) {
              hasMoreCommits = false;
            } else {
              commitPage++;
            }
          }

          // Count commits by date
          allCommits.forEach((commit) => {
            const commitDate = new Date(commit.commit.author.date);
            const dateStr = commitDate.toISOString().split("T")[0];

            if (commitCounts[dateStr] !== undefined) {
              commitCounts[dateStr] += 1;
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
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Format data for chart
    const sortedDates = Object.keys(commitCounts).sort();
    const formattedData = sortedDates.map((date) => ({
      date: date,
      commits: commitCounts[date],
      day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
    }));

    res.json({
      period: {
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
        selected: targetDate.toISOString().split("T")[0],
      },
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching detailed weekly commits:", error);
    res.status(500).json({
      error: "Failed to fetch detailed weekly commits",
      details: error.message,
    });
  }
};

// Route: Get commit summary for a specific date range
// app.get("/api/github/commits-by-date",
export const commitsByDate = async (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({
        error: "Both start and end dates are required (YYYY-MM-DD)",
      });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({
        error: "Invalid date format. Use YYYY-MM-DD",
      });
    }

    // Get all repos
    const reposResponse = await axios.get(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    const repos = reposResponse.data;
    let totalCommits = 0;
    const dailyCommits = {};

    // Process each repo
    const repoPromises = repos.slice(0, 10).map(async (repo) => {
      try {
        const commitsResponse = await axios.get(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits`,
          {
            params: {
              since: startDate.toISOString(),
              until: endDate.toISOString(),
              per_page: 100,
              author: GITHUB_USERNAME,
            },
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
            },
          },
        );

        const commits = commitsResponse.data;
        totalCommits += commits.length;

        // Count by date
        commits.forEach((commit) => {
          const commitDate = new Date(commit.commit.author.date);
          const dateStr = commitDate.toISOString().split("T")[0];
          dailyCommits[dateStr] = (dailyCommits[dateStr] || 0) + 1;
        });
      } catch (error) {
        console.error(
          `Error fetching commits for ${repo.name}:`,
          error.message,
        );
      }
    });

    await Promise.allSettled(repoPromises);

    res.json({
      totalCommits,
      dailyCommits,
      period: {
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      },
    });
  } catch (error) {
    console.error("Error fetching commits by date:", error);
    res.status(500).json({
      error: "Failed to fetch commits by date",
      details: error.message,
    });
  }
};


