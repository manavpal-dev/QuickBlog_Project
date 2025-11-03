import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";

const Addblog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  // function for onSubmitHandler
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);

      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message);
        setImage(false);
        setTitle("");
        setSubTitle("");
        quillRef.current.root.innerHTML = "";
        setCategory("Startup");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false); //rest button
    }
  };

  const generateContent = async () => {
    if (!title) return toast.error("Please enter a title");

    try {
      setLoading(true);
      const { data } = await axios.post("/api/blog/generate", {
        prompt: title,
      });

      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    //Initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <div className="bg-blue-50/50 w-full h-fit sm:min-h-screen">
      <form onSubmit={onSubmitHandler} className="my-10 bg-white ml-10 w-5/6">
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

          <label className="mb-3 text-gray-600" htmlFor="title">
            Blog title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Type here"
            className="border px-4 py-1.5 border-gray-300 mr-10 outline-none mb-4 rounded"
            required
          />

          <label className="mb-3 text-gray-600" htmlFor="titlesub">
            Sub title
          </label>
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
          {loading && (

            <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2">
              <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
            </div>
          )}
            <button disabled={loading}
              type="button"
              className={`absolute bottom-1 right-2 ml-2 text-xs  px-4 py-1.5 rounded text-white ${loading ? "bg-black/40 cursor-not-allowed" : " bg-black/70 hover:underline cursor-pointer"}`}
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
          disabled={isAdding}
          type="submit"
          className="mt-8 w-40 h-10 bg-blue-500 text-white rounded cursor-pointer text-sm hover:bg-blue-600 ml-8 mb-12"
        >
          {isAdding ? "Adding.." : " Add Blog"}
        </button>
      </form>
    </div>
  );
};

export default Addblog;
