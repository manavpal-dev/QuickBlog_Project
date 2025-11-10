import React, { useState } from "react";
import { blogCategories } from "../assets/assets.js";
import BlogCard from "./BlogCard.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const {blogs, input} = useAppContext();

  // Api integration
  




  // filteredBlogs function
  const filteredBlogs = ()=>{
    if(input === ''){
      return blogs
    }
    return blogs.filter((blog)=> blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()));
  }

  return (
    <div>
      {/* select blog list */}
      <div className="flex justify-center gap-4 sm:gap-8  my-10  relative">
        {blogCategories.map((item) => (
          <div className="relative" key={item}>
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 ${
                menu === item && "text-white px-4 pt-0.5"
              }`}
            >
              {item}
              {/* for using smoth transition use motion from npm */}
              <div
                className={` ${
                  menu === item
                    ? "absolute left-0 right-0 top-0 h-7 -z-1 bg-indigo-700 rounded-full transition-all "
                    : ""
                }`}
              ></div>
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">

        {/* checking the blog list is equal to blog card or not */}

        {filteredBlogs().filter((blog) => (menu === "All" ? true : blog.category === menu))
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
