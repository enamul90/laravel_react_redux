import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  Search,
  Bell,
  Plus,
  Calendar,
  Tag,
  Edit,
  Trash2,
  Menu,
  X,
  Save,
} from "lucide-react";

import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../services/api";
import Sidebar from "../layout/Sidebar";

// --- Types ---
interface Category {
  id: number;
  categoryName: string;
  description: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

// --- Header ---
const Header = ({
  onMenuClick,
  onAddClick,
}: {
  onMenuClick: () => void;
  onAddClick: () => void;
}) => (
  <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-10">
    <div className="flex items-center gap-4 w-full md:w-auto">
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
      >
        <Menu size={24} />
      </button>
      <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full max-w-md">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search categories..."
          className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-700 placeholder-gray-400"
        />
      </div>
    </div>
    <div className="flex items-center gap-3 sm:gap-4">
      <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative hidden sm:block">
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
      </button>
      <button
        onClick={onAddClick}
        className="flex items-center gap-2 bg-slate-900 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
      >
        <Plus size={18} />
        <span className="hidden sm:inline">Add New</span>
      </button>
    </div>
  </header>
);

// --- StatsRow ---
const StatsRow = ({ data }: { data: Category[] }) => {
  const total = data.length;
  const active = data.filter((c) => c.status === "active").length;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
      <StatCard
        title="Total Categories"
        value={total}
        icon={FolderKanban}
        color="blue"
      />
      <StatCard title="Active" value={active} icon={Tag} color="green" />
      <StatCard
        title="Inactive"
        value={total - active}
        icon={Settings}
        color="orange"
      />
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }: any) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
  };
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs md:text-sm font-medium text-gray-500 mb-1">
          {title}
        </p>
        <h3 className="text-xl md:text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className={`p-2 md:p-3 rounded-lg ${colorClasses[color]}`}>
        <Icon size={20} />
      </div>
    </div>
  );
};

// --- Modal ---
const CategoryModal = ({
  isOpen,
  onClose,
  category,
}: {
  isOpen: boolean;
  onClose: () => void;
  category?: Category;
}) => {
  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
    status: "active" as "active" | "inactive",
  });

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  useEffect(() => {
    if (isOpen && category) {
      setFormData({
        categoryName: category.categoryName,
        description: category.description,
        status: category.status,
      });
    } else if (isOpen) {
      setFormData({ categoryName: "", description: "", status: "active" });
    }
  }, [isOpen, category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (category) {
        await updateCategory({ id: category.id, updatedCategory: formData }).unwrap();
      } else {
        await createCategory(formData).unwrap();
      }
      onClose();
    } catch (err) {
      console.error("Error saving category:", err);
      alert("Something went wrong!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800">
            {category ? "Edit Category" : "Add New Category"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={formData.categoryName}
              onChange={(e) =>
                setFormData({ ...formData, categoryName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Technology"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe this category..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "active" | "inactive",
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Save size={16} />
              {category ? "Update Category" : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main Dashboard ---
const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(
    undefined
  );

  const { data, isLoading, error } = useGetCategoriesQuery(undefined);
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      try {
        await deleteCategory(id).unwrap();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const openAddModal = () => {
    setEditingCategory(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getStatusStyles = (status: string) =>
    status === "active"
      ? "bg-green-50 text-green-700 border-green-100"
      : "bg-gray-50 text-gray-600 border-gray-100";

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: FolderKanban, label: "Categories", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories</p>;

  return (
    <div className="flex min-h-screen bg-gray-50/50 font-sans">
      <Sidebar />

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="relative flex w-64 max-w-[75vw] flex-col bg-slate-900 h-full shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <LayoutDashboard size={20} />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  Admin
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="flex-1 md:ml-64 flex flex-col w-full">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} onAddClick={openAddModal} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Category Management
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              Manage your blog post categories and their status.
            </p>
          </div>

          <StatsRow data={data?.data || []} />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {data?.data?.map((category) => (
              <div
                key={category.id}
                className="group bg-white rounded-xl border border-gray-200 p-4 md:p-6 hover:shadow-lg hover:border-blue-200/50 transition-all duration-300 flex flex-col relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>

                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <FolderKanban size={20} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base md:text-lg font-bold text-gray-900 truncate">
                        {category.categoryName}
                      </h3>
                      <span className="text-xs text-gray-400">
                        ID: #{category.id}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold border shrink-0 ${getStatusStyles(
                      category.status
                    )}`}
                  >
                    {category.status}
                  </span>
                </div>

                <p className="text-gray-600 text-xs md:text-sm mb-4 md:mb-6 flex-grow leading-relaxed line-clamp-3">
                  {category.description}
                </p>

                <div className="pt-3 md:pt-4 border-t border-gray-100 mt-auto">
                  <div className="flex flex-col gap-2 md:gap-3">
                    <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-gray-500">
                      <Calendar size={12} />
                      <span>Updated: {formatDate(category.updated_at)}</span>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3 mt-1">
                      <button
                        onClick={() => openEditModal(category)}
                        className="flex-1 flex items-center justify-center gap-1 md:gap-2 px-2 md:px-3 py-2 text-[10px] md:text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Edit size={12} /> Edit
                      </button>

                      <button
                        onClick={() => handleDelete(category.id)}
                        className="flex-1 flex items-center justify-center gap-1 md:gap-2 px-2 md:px-3 py-2 text-[10px] md:text-xs font-medium text-red-700 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={editingCategory}
      />
    </div>
  );
};

export default Dashboard;