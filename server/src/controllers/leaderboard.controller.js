import axios from "axios";
import { response } from "express";

// GitHub API configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

const leaderboard = async (req, res) => {
  try {
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

    const promisedFetch = repos.slice(0, 20).map(async (repo) => {
      try {
        let allCommits = []
        let page = 1
        let hasMore = true;
        const commitsResponse = await axios.get(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits`,
          {
            params: {
              per_page: page,
              author: GITHUB_USERNAME,
            },
            headers: {
              Authorization: `Bearer ${GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
              "X-GitHub-Api-Version": "2026-03-10",
            },
          },
        );
        const commits = commitsResponse.data
        
        allCommits = [...allCommits, ...commits]
        console.log(allCommits)
        if (allCommits.)
        
      
              
      } catch (error) {
        console.error("Erro Fetching repos ", error)
      }
    })

  } catch  (error) {
     console.error("❌ Error fetching leader board data:", error);
  }
}
export default  leaderboard

import { Octokit } from "octokit";

const octokit = new Octokit({ });

async function getPaginatedData(url) {
  const nextPattern = /(?<=<)([\S]*)(?=>; rel="next")/i;
  let pagesRemaining = true;
  let data = [];

  while (pagesRemaining) {
    const response = await octokit.request(`GET ${url}`, {
      per_page: 100,
      headers: {
        "X-GitHub-Api-Version":
          "2026-03-10",
      },
    });

    const parsedData = parseData(response.data)
    data = [...data, ...parsedData];

    const linkHeader = response.headers.link;

    pagesRemaining = linkHeader && linkHeader.includes(`rel=\"next\"`);

    if (pagesRemaining) {
      url = linkHeader.match(nextPattern)[0];
    }
  }

  return data;
}

function parseData(data) {
  // If the data is an array, return that
    if (Array.isArray(data)) {
      return data
    }

  // Some endpoints respond with 204 No Content instead of empty array
  //   when there is no data. In that case, return an empty array.
  if (!data) {
    return []
  }

  // Otherwise, the array of items that we want is in an object
  // Delete keys that don't include the array of items
  delete data.incomplete_results;
  delete data.repository_selection;
  delete data.total_count;
  // Pull out the array of items
  const namespaceKey = Object.keys(data)[0];
  data = data[namespaceKey];

  return data;
}

const data = await getPaginatedData("/repos/octocat/Spoon-Knife/issues");

console.log(data);
