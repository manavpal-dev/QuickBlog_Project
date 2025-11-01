import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";

const Addblog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("startup");
  const [isPublished, setIsPublished] = useState(false);

  // function for handlerSubmit
  const handlerSubmit = async (e) => {
    e.preventDefault();
  };

  const generateContent = async () => {};

  useEffect(() => {
    //Initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <div className="bg-blue-50/50 w-full h-fit sm:min-h-screen">
      <form onSubmit={handlerSubmit} className="my-10 bg-white ml-10 w-5/6">
        <div className="py-10 pl-10 flex flex-col">
          <p className="mb-4 text-gray-700 text-md" for="myfile">
            Upload thumbnail
          </p>

          <label className="w-1/4 lg:w-1/7 mb-4" htmlFor="image">
            <img
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              alt=""
            />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              className="border w-1/5"
              required
              hidden
            />
          </label>

          <p className="mb-3 text-gray-600" htmlFor="title">
            Blog title
          </p>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Type here"
            className="border px-4 py-1.5 border-gray-300 mr-10 outline-none mb-4 rounded"
            required
          />

          <p className="mb-3 text-gray-600" htmlFor="titlesub">
            Sub title
          </p>
          <input
            onChange={(e) => setSubTitle(e.target.value)}
            value={subTitle}
            type="text"
            placeholder="Type here"
            className="border px-4 py-1.5 border-gray-300 mr-10 outline-none rounded"
            required
          />

          {/* Blog description */}
          <p className="my-3 text-gray-600">Blog Description</p>

          <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative ">
            {/* useRef used */}
            <div ref={editorRef}></div>

            <button
              type="button"
              className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
              onClick={generateContent}
            >
              Generate With AI
            </button>
          </div>
        </div>

    {/* Blog category section */}
        <p className="mt-4 ml-8">Blog category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="mt-2 ml-8 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select category</option>
          {blogCategories.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        <div className="flex gap-2 mt-4 ml-8">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        <button
          type="submit"
          className="mt-8 w-40 h-10 bg-blue-500 text-white rounded cursor-pointer text-sm hover:bg-blue-600 ml-8 mb-12"
        >
          Add Blog.......
        </button>
      </form>
    </div>
  );
};

export default Addblog;
