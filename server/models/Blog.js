import { pool } from "../configs/db.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } =
      JSON.parse(req.body.blog);

    await pool.query(
      `INSERT INTO blogs
      (title, sub_title, description, image, category, is_published)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [title, subTitle, description, image, category, isPublished]
    );

    res.json({ success: true });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};