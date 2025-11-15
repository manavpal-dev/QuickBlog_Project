import React from "react";
import { footer_data } from "../assets/assets";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-[#F9F8FE]">
      <div className="lg:flex justify-between items-center px-10">
        <div className="px-4 py-8">
          <img className="" src={assets.logo} alt="" />
          <p className="font-medium max-w-[410px] mt-6 text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde
            quaerat eveniet cumque accusamus atque qui error quo enim fugiat?
          </p>
        </div>

        <div className="grid grid-cols-3 space-x-5 mt-5 ">
          {footer_data.map((data, indx) => (
            <div key={indx} className="flex flex-col gap-2">
              <h6 className="font-semibold text-[1.1rem]">{data.title}</h6>
              <ul className="text-gray-500 font-medium text-[0.9rem]">
                {data.links.map((link, indx) => (
                  <li key={indx}>
                    <a href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-9 mb-5">
        <hr className="h-[0.001% border w-[90%] border-gray-400 " />
      </div>
      <p className="text-center pb-4 text-[1rem] font-normal text-gray-500/100">
        Copyright 2025 © QuickBlog Manav Pal - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
