import { pool } from "../configs/db.js";
import fs from "fs";
import imagekit from "../configs/imageKit.js";
import main from "../configs/gemni.js";

//helper function
const getBlogIdFromDb = async (id) => {
  const [rows] = await pool.query("SELECT * FROM blogs WHERE id = ?", [id]);

  return rows[0];
};

// addBlog function
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog,
    );

    const imageFile = req.file;

    // validation
    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    // read file
    const fileBuffer = fs.readFileSync(imageFile.path);

    // upload to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // optimized URL
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    const image = optimizedImageUrl;

    await pool.query(
      `INSERT INTO blogs
      (title, sub_title, description, image, category, is_published)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [title, subTitle, description, image, category, isPublished],
    );

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// getAllBlogs Function
export const getAllBlogs = async (req, res) => {
  try {
    const [blogs] = await pool.query(
      "SELECT * FROM blogs WHERE is_published = true ORDER BY created_at DESC",
    );

    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// getBlogById function
export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await getBlogIdFromDb(blogId);

    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// deleteBlogById function
export const deleteBlogById = async (req, res) => {
  try {
    const id = Number(req.body.id);

    const blog = await getBlogIdFromDb(id);

    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    await pool.query("DELETE FROM blogs WHERE id = ?", [id]);

    res.json({
      success: true,
      message: `Blog "${blog.title}" deleted successfully`,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// togglePublish function
export const togglePublish = async (req, res) => {
  try {
    const id  = Number(req.body.id);
    const blog = await getBlogIdFromDb(id);

    if (!blog) {
      return res.json({ success: false, message: `Blog "${id}" not found` });
    }

    const newStatus = !blog.is_published;

    const [result] = await pool.query(
      "UPDATE blogs SET is_published = ? WHERE id = ?",
      [newStatus, id],
    );

    res.json({
      success: true,
      message: `Blog "${blog.title}" is updated successfully`,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// addComment function
export const addComment = async (req, res) => {
  try {
    const { blog_id, name, content } = req.body;

    await pool.query(
      `INSERT INTO comments (blog_id, name, content) VALUES (?, ?, ?)`,
      [blog_id, name, content],
    );

    res.json({ success: true, message: "Comment added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// getBlogComments
export const getBlogComments = async (req, res) => {
  try {
    const { id } = req.params;

    const [comments] = await pool.query("SELECT * FROM comments WHERE blog_id = ? AND is_approved = 1 ORDER BY created_at DESC", [
      id,
    ]);

    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// generateContent function
export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.json({
        success: false,
        message: "Please Enter prompt for generate content",
      });
    }

    const content = await main(
      prompt +
        " Generate a blog content for this topic in a simple text format",
    );
    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
