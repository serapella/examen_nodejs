import { Request, Response } from "express";
import Snippet from "../models/SnippetModel";

export const createSnippet = async (req: Request, res: Response) => {
  try {
    const { title, code, language, tags, expiresIn } = req.body;
    const encodedCode = Buffer.from(code).toString("base64");

    const snippet = new Snippet({
      title,
      code: encodedCode,
      language,
      tags,
      expiresIn,
    });

    await snippet.save();
    res.status(201).json(snippet);
  } catch (error) {
    res.status(500).json({ error: "Error creating snippet" });
  }
};

export const getSnippets = async (req: Request, res: Response) => {
  try {
    const {
      language,
      tags,
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "desc",
    } = req.query;
    const query: any = {};

    if (language) {
      query.language = new RegExp(language as string, "i");
    }

    if (tags) {
      const tagArray = (tags as string).split(",");
      query.tags = { $in: tagArray.map((tag) => new RegExp(tag.trim(), "i")) };
    }

    const snippets = await Snippet.find(query)
      .sort({ [sort as string]: order === "desc" ? -1 : 1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    snippets.forEach((snippet) => {
      snippet.code = Buffer.from(snippet.code, "base64").toString("utf-8");
    });

    res.json(snippets);
  } catch (error) {
    res.status(500).json({ error: "Error fetching snippets" });
  }
};

export const getSnippetById = async (req: Request, res: Response) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet || (snippet.expiresAt && snippet.expiresAt < new Date())) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    snippet.code = Buffer.from(snippet.code, "base64").toString("utf-8");
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ error: "Error fetching snippet" });
  }
};

export const updateSnippet = async (req: Request, res: Response) => {
  try {
    const { title, code, language, tags } = req.body;
    const encodedCode = code ? Buffer.from(code).toString("base64") : undefined;

    const snippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      {
        ...(title && { title }),
        ...(code && { code: encodedCode }),
        ...(language && { language }),
        ...(tags && { tags }),
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    res.json(snippet);
  } catch (error) {
    res.status(500).json({ error: "Error updating snippet" });
  }
};

export const deleteSnippet = async (req: Request, res: Response) => {
  try {
    const snippet = await Snippet.findByIdAndDelete(req.params.id);
    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    res.json({ message: "Snippet deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting snippet" });
  }
};

export const dashboard = async (req: Request, res: Response) => {
  try {
    const { language, tags } = req.query;
    const query: any = {};

    if (language) {
      query.language = new RegExp(language as string, "i");
    }

    if (tags) {
      const tagArray = (tags as string).split(",");
      query.tags = { $in: tagArray.map((tag) => new RegExp(tag.trim(), "i")) };
    }

    const snippets = await Snippet.find(query).sort({ createdAt: -1 });
    snippets.forEach((snippet) => {
      snippet.code = Buffer.from(snippet.code, "base64").toString("utf-8");
    });

    res.render("snippetTable", {
      snippets,
      currentLanguage: language || "",
      currentTags: tags || "",
    });
  } catch (error) {
    res.status(500).render("error", { error: "Error loading dashboard" });
  }
};
