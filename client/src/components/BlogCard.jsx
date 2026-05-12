import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full rounded-lg overflow-hidden shadow hover:scale-105 hover:shadow-blue-400 duration-300 cursor-pointer"
    >
      <img
        src={image}
        srcSet={`${image}?tr=w-640,f-webp 640w, ${image}?tr=w-1024,f-webp 1024w, ${image}?tr=w-1280,f-webp 1280w`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        alt={title}
        className="aspect-video w-full object-cover"
        loading="lazy"
      />
      <span className="ml-5 mt-4 px-3 py-1 inline-block bg-indigo-200 rounded-full text-primary">
        {category}
      </span>

      <div className="p-5 ">
        <h5 className="mb-2 font-medium text-gray-900">{title}</h5>
        <p className="mb-3 text-xs text-gray-600">
          {description.replace(/<[^>]*>/g, "").slice(0, 80)}...{" "}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
