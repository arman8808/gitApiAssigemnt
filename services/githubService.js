import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const GITHUB_API_URL = process.env.GITHUB_URL;
const { GITHUB_PERSONAL_ACCESS_TOKEN, GITHUB_USERNAME } = process.env;

const headers = {
  Authorization: `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}`,
  "Content-Type": "application/json",
};

export const fetchGitHubUserData = async () => {
  try {
    const userResponse = await axios.get(
      `${GITHUB_API_URL}/users/${GITHUB_USERNAME}`,
      { headers }
    );
    const reposResponse = await axios.get(
      `${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos`,
      { headers }
    );

    return {
      followers: userResponse.data.followers,
      following: userResponse.data.following,
      repositories: reposResponse.data.map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count,
      })),
    };
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

export const fetchRepositoryDetails = async (repoName) => {
  try {
    const response = await axios.get(
      `${GITHUB_API_URL}/repos/${GITHUB_USERNAME}/${repoName}`,
      { headers }
    );

    return {
      name: response.data.name,
      description: response.data.description,
      url: response.data.html_url,
      stars: response.data.stargazers_count,
      forks: response.data.forks_count,
      issues: response.data.open_issues_count,
    };
  } catch (error) {
    throw new Error("Failed to fetch repository details");
  }
};

export const createGitHubIssue = async (repoName, title, body) => {
  try {
    const response = await axios.post(
      `${GITHUB_API_URL}/repos/${GITHUB_USERNAME}/${repoName}/issues`,
      { title, body },
      { headers }
    );

    return response.data.html_url;
  } catch (error) {
    throw new Error("Failed to create issue");
  }
};
