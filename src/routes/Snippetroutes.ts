import express from "express";
import {
  createSnippet,
  getSnippets,
  getSnippetById,
  deleteSnippet,
  dashboard,
} from "../controllers/snippetController";

const snippetRoutes = express.Router();

snippetRoutes.get("/", dashboard);
snippetRoutes.post("/api/snippets", createSnippet);
snippetRoutes.get("/api/snippets", getSnippets);
snippetRoutes.get("/api/snippets/:id", getSnippetById);
snippetRoutes.delete("/api/snippets/:id", deleteSnippet);

export default snippetRoutes;
