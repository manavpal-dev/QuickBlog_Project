// // Controllers is used for writing the actual code.
// // ### Frontend (React) → API Route (Express) → Controller (Logic) → Database (MongoDB) ##

// import jwt from 'jsonwebtoken';
// import Blog from '../models/Blog.js';
// import Comment from '../models/Comment.js';

// // This is for the admin logic code define here. ---> api integration
// export const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (
//       email !== process.env.ADMIN_EMAIL ||
//       password !== process.env.ADMIN_PASSWORD
//     ) {
//       return res.json({ success: false, message: 'Invalid Credentials' });
//     }

//     const token = jwt.sign({ email }, process.env.JWT_SECRET);

//     res.json({ success: true, token });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// export const getAllBlogsAdmin = async (req, res) => {
//   try {
//     const blogs = await Blog.find({}).sort({ createdAt: -1 });

//     res.json({ success: true, blogs });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // comment api created ---> /
// export const getAllComments = async (req, res) => {
//   try {
//     const comments = await Comment.find({})
//       .populate('blog')
//       .sort({ createdAt: -1 });

//     res.json({ success: true, comments });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // Dashboard related stuff
// export const getDashboard = async (req, res) => {
//   try {
//     const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);

//     const blogs = await Blog.countDocuments();

//     const comments = await Comment.countDocuments();

//     const drafts = await Blog.countDocuments({ isPublished: false });

//     const dashboardData = {
//       blogs,
//       comments,
//       drafts,
//       recentBlogs,
//     };
//     res.json({ success: true, dashboardData });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // function that admin can delete the comment
// export const deleteCommentById = async (req, res) => {
//   try {
//     const { id } = req.body;
//     await Comment.findByIdAndDelete(id);

//     res.json({ success: true, message: 'Comment deleted successfully' });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // function that admin can approve the comment. --> /api/admin/approve-comment
// export const approveCommentById = async (req, res) => {
//   try {
//     const { id } = req.body;
//     await Comment.findByIdAndUpdate(id,{isApproved:true});

//     res.json({ success: true, message: 'Comment Approved successfully' });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

import jwt from "jsonwebtoken";
import { pool } from "../configs/db.js";

// adminLogin Function
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// getAllBlogsAdmin function
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const [blogs] = await pool.query(
      "SELECT * FROM blogs ORDER BY created_at DESC",
    );

    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// getAllComments function
export const getAllComments = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM comments ORDER BY created_at DESC",
    );

    res.json({ success: true, result });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// getDashboard Function
export const getDashboard = async (req, res) => {
  try {
    const [recentBlogs] = await pool.query(
      "SELECT * FROM blogs ORDER BY created_at DESC LIMIT 5",
    );

    const [blogCount] = await pool.query("SELECT COUNT(*) AS total FROM blogs");

    const [commentCount] = await pool.query(
      "SELECT COUNT(*) AS total FROM comments",
    );

    const [drafts] = await pool.query(
      "SELECT COUNT(*) AS total FROM comments WHERE is_approved = 0",
    );

    const dashboardData = {
      blogCount,
      commentCount,
      drafts,
      recentBlogs,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// deleteCommentById function
export const deleteCommentById = async (req, res) => {
  try {
    const id = Number(req.body.id);

    if (!id) {
      return res.json({ success: false, message: `Comment Id is required` });
    }

    const [result] = await pool.query("DELETE FROM comments WHERE id = ?", [
      id,
    ]);

    if (!result.affectedRows) {
      return res.json({ success: false, message: "Comment not found" });
    }

    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// approveCommentById function
export const approveCommentById = async (req, res) => {
  try {
    const id = Number(req.body.id);

    if (!id) {
      return res.json({
        success: false,
        message: "Comment ID is required",
      });
    }

   const [result] = await pool.query("UPDATE comments SET is_approved = 1 WHERE id = ?", [id]);

   if(result.affectedRows === 0){
    return res.json({success:false, message:"Comment not found"})
  }

    res.json({ success: true, message: "Comment Approved Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
