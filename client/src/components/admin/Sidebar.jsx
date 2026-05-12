import React from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";


const Sidebar = () => {
  

  return (
    <div className="border-r border-gray-300">
      <NavLink end={true} to={'/admin'}
        className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 sm:mt-5 md:mt-0 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-indigo-100 border-r-4 border-purple-900"}`}
      >
        <img src={assets.home_icon} alt="home icon" className="min-w-4 w-5" loading="lazy" />
        <p className="hidden  md:inline-block">Dashboard</p>
      </NavLink>

       <NavLink end={true} to={'/admin/addBlog'}
        className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-indigo-100 border-r-4 border-purple-900"}`}
      >
        <img src={assets.add_icon} alt="add blog icon" className="min-w-4 w-5" loading="lazy" />
        <p className="hidden  md:inline-block">Add Blogs</p>
      </NavLink>

      <NavLink end={true} to={'/admin/listBlog'}
        className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-indigo-100 border-r-4 border-purple-900"}`}
      >
        <img src={assets.list_icon} alt="blog list icon" className="min-w-4 w-5" loading="lazy" />
        <p className="hidden  md:inline-block">Blog List</p>
      </NavLink>

      <NavLink end={true} to={'/admin/comments'}
        className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-indigo-100 border-r-4 border-purple-900"}`}
      >
        <img src={assets.comment_icon} alt="comment icon" className="min-w-4 w-5" loading="lazy" />
        <p className="hidden  md:inline-block">Comments</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
