import axios from "axios";

// ─── Helper: Fetch ALL repos with pagination ───
const fetchAllRepos = async (token) => {
  const repos = [];
  let page = 1;
  const perPage = 100; // Max allowed by GitHub

  while (true) {
    const { data } = await axios.get("https://api.github.com/user/repos", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2026-03-10",
      },
      params: {
        per_page: perPage,
        page: page,
        affiliation: "owner", // Only repos you own (matches your GraphQL logic)
      },
    });

    repos.push(...data);
    if (data.length < perPage) break; // Last page reached
    page++;
  }
  return repos;
};

export const totalRepos = async (req, res) => {
  try {
    const repoData = await fetchAllRepos(process.env.GITHUB_TOKEN);

    res.json({
      message: "successful", // FIXED: typo
      count: repoData.length,
      data: repoData,
    });
  } catch (error) {
    console.error("Error fetching from GitHub:", error.message);
    res.status(500).json({ error: "Failed to fetch GitHub data" });
  }
};

export const totalContribution = async (req, res) => {
  // NOTE: This GraphQL query still has a 100-repo hard limit.
  // For >100 repos, you need cursor-based pagination (pageInfo/endCursor).
  const query = `
    query {
      viewer {
        repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
          nodes {
            name
            defaultBranchRef {
              target {
                ... on Commit {
                  history {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      "https://api.github.com/graphql",
      { query },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    const data = response.data;

    if (data.errors) {
      console.error("GraphQL Errors:", data.errors);
      return res
        .status(400)
        .json({ error: "Failed to fetch data from GitHub" });
    }

    const repos = data.data.viewer.repositories.nodes;
    let totalCommitsAllRepos = 0;

    repos.forEach((repo) => {
      if (repo.defaultBranchRef) {
        totalCommitsAllRepos += repo.defaultBranchRef.target.history.totalCount;
      }
    });

    return res.status(200).json({
      message: "successful",
      totalReposCounted: repos.length,
      totalCommits: totalCommitsAllRepos,
    });
  } catch (error) {
    console.error("Error fetching from GitHub:", error.message);
    return res.status(500).json({ error: "Failed to fetch GitHub data" });
  }
};

export const getCurrentStreak = async (req, res) => {
  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const username = req.query.username || process.env.GITHUB_USERNAME;

    const response = await axios.post(
      "https://api.github.com/graphql",
      {
        query,
        variables: { login: username },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      },
    );

    if (response.data.errors) {
      return res.status(400).json({ error: response.data.errors[0].message });
    }

    const weeks =
      response.data.data.user.contributionsCollection.contributionCalendar
        .weeks;

    // Flatten all days into a single array
    const allDays = weeks.flatMap((week) => week.contributionDays);

    // Sort by date descending (newest first)
    allDays.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Calculate current streak
    let streak = 0;
    let checkedToday = false;

    for (const day of allDays) {
      const count = day.contributionCount;
      const date = new Date(day.date);
      const now = new Date();

      // Skip future dates
      if (date > now) continue;

      // For today: count if there are contributions
      // For past days: count if there are contributions, break if not
      if (!checkedToday) {
        // Check if this is today
        const isToday = date.toDateString() === now.toDateString();
        if (isToday) {
          if (count > 0) streak++;
          checkedToday = true;
          continue;
        } else {
          // No activity today, check if yesterday had activity
          const yesterday = new Date(now);
          yesterday.setDate(yesterday.getDate() - 1);
          const isYesterday = date.toDateString() === yesterday.toDateString();

          if (isYesterday && count > 0) {
            streak++;
          } else if (isYesterday && count === 0) {
            // Streak broken yesterday
            break;
          }
          checkedToday = true;
        }
      }

      if (count > 0) {
        streak++;
      } else {
        break;
      }
    }

    // Find longest streak (optional)
    let longestStreak = 0;
    let currentLongest = 0;
    for (const day of allDays.reverse()) {
      if (day.contributionCount > 0) {
        currentLongest++;
        longestStreak = Math.max(longestStreak, currentLongest);
      } else {
        currentLongest = 0;
      }
    }

    res.json({
      message: "successful",
      currentStreak: streak,
      longestStreak: longestStreak,
      totalContributions: allDays.reduce(
        (sum, d) => sum + d.contributionCount,
        0,
      ),
      lastActiveDate:
        allDays.find((d) => d.contributionCount > 0)?.date || null,
    });
  } catch (error) {
    console.error("Error fetching streak:", error.message);
    res.status(500).json({ error: "Failed to fetch streak data" });
  }
};