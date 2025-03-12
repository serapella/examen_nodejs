//routes aanmaken, importeer variabelen uit controllers!

import express from "express";
import {
  createSnippet,
  getSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
  dashboard,
} from "../controllers/snippetController";

const router = express.Router();

router.get("/", dashboard);
router.post("/api/snippets", createSnippet);
router.get("/api/snippets", getSnippets);
router.get("/api/snippets/:id", getSnippetById);
router.put("/api/snippets/:id", updateSnippet);
router.delete("/api/snippets/:id", deleteSnippet);

export default router;
