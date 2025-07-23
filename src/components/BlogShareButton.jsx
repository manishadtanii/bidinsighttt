import React, { useState } from "react";
// import BlogModal from "./BlogModal"; // Adjust path if needed

const BlogShareButton = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShareClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleShareClick}
        className="bg-gray-700 px-3 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-gray-600 raleway"
      >
        <i className="fas fa-share-alt"></i>
      </button>

      {isModalOpen && (
        <BlogModal post={post} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default BlogShareButton;
