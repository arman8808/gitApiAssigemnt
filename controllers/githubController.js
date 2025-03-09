import {
    fetchGitHubUserData,
    fetchRepositoryDetails,
    createGitHubIssue,
  } from "../services/githubService.js";
  
  export const getUserData = async (req, res) => {
    try {
      const data = await fetchGitHubUserData();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error in getUserData:", error.message);
      res.status(500).json({ error: "Failed to fetch user data" });
    }
  };
  

  export const getRepositoryDetails = async (req, res) => {
    const { repoName } = req.params;
  
    try {
      const data = await fetchRepositoryDetails(repoName);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error in getRepositoryDetails:", error.message);
      res.status(500).json({ error: "Failed to fetch repository details" });
    }
  };

  export const createIssue = async (req, res) => {
    const { repoName } = req.params;
    const { title, body } = req.body;
  
    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required" });
    }
  
    try {
      const issueUrl = await createGitHubIssue(repoName, title, body);
      res.status(201).json({ issue_url: issueUrl });
    } catch (error) {
      console.error("Error in createIssue:", error.message);
      res.status(500).json({ error: "Failed to create issue" });
    }
  };
  