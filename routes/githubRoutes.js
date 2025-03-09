import express from "express";
import {
  getUserData,
  getRepositoryDetails,
  createIssue,
} from "../controllers/githubController.js";

const router = express.Router();

router.get("/", getUserData);

router.get("/:repoName", getRepositoryDetails);

router.post("/:repoName/issues", createIssue);

export default router;
