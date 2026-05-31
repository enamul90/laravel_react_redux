import React, { useEffect, useState } from "react";
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from "../services/api";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const PostFeed: React.FC = () => {
  const {
    data = [],
    error: getError,
    isLoading: getLoading,
  } = useGetCategoriesQuery(undefined);

  const [
    createCategory,
    { isLoading: createLoading, error: createError, isSuccess },
  ] = useCreateCategoryMutation();

  // --- Form States ---
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowPopup(true);

      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  // --- Handlers ---
  const handleAddNew = () => {
    setIsEditing(false);
    setFormData({ title: "", body: "" });
    setIsFormOpen(true);
  };

  const handleEditClick = (post: Post) => {
    setIsEditing(true);
    setSelectedId(post.id);
    setFormData({ title: post.title, body: post.body });
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to form
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      console.log("Updating post ID:", selectedId, formData);
      alert("Post Updated (check console)");
    } else {
      try {
        await createCategory(formData).unwrap();
      } catch (err) {
        console.log("Create Error:", err);
      }
    }
    setIsFormOpen(false); // Close form after submit
  };

  if (getLoading )
    return <div className="text-center p-10 font-bold">Loading...</div>;
  if (getError || createError)
    return (
      <div className="text-center p-10 text-red-500">Error loading data.</div>
    );

  return (
    <>
      {showPopup && (
        <div className="fixed top-5 right-5 z-50">
          <div className="bg-green-500 text-white px-4 py-3 rounded shadow-lg animate-bounce">
            Category Created Successfully 🎉
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
        <div className="max-w-3xl mx-auto">
          {/* Header Area */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Post Management
            </h1>
            {!isFormOpen && (
              <button
                onClick={handleAddNew}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition shadow-sm"
              >
                + Create New Post
              </button>
            )}
          </div>

          {/* --- DYNAMIC INPUT FORM --- */}
          {isFormOpen && (
            <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
              <h2 className="text-lg font-bold mb-4 text-blue-700">
                {isEditing ? `Editing Post #${selectedId}` : "Create New Post"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.body}
                    onChange={(e) =>
                      setFormData({ ...formData, body: e.target.value })
                    }
                    placeholder="Enter body content..."
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    {isEditing ? "Save Changes" : createLoading ? "Loading.." : "Post Content"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="bg-gray-100 text-gray-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* --- POST LIST --- */}
          <div className="space-y-4">
            {data.map((post: Post) => (
              <div
                key={post.id}
                className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex justify-between items-start gap-4"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 capitalize text-lg mb-1">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {post.body}
                  </p>
                  <span className="text-[10px] text-gray-400 mt-2 block uppercase font-bold tracking-widest">
                    User {post.userId}
                  </span>
                </div>

                <div className="flex gap-2">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEditClick(post)}
                    className="p-2 text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  {/* Delete Button */}
                  <button className="p-2 text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostFeed;
