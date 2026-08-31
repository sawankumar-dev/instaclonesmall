import { useState } from "react";
import { useForm } from "react-hook-form";
import { apiClient } from "../../../../config/api";

const CreatePostPage = () => {
  const [imagePreview, setImagePreview] = useState(null);
  
  const { 
    register, 
    reset,  
    handleSubmit, 
    watch,
    formState: { errors, isSubmitting } 
  } = useForm();

  // Watch function ka use karke live image change capture karenge aur preview dikhayenge
  const imageFile = watch("image");

  // Jab bhi user naya file choose karega, preview update hoga
  if (imageFile && imageFile.length > 0 && !imagePreview) {
    const file = imageFile[0];
    setImagePreview(URL.createObjectURL(file));
  }

  const onSubmit = async (data) => {
    try {
      // 1. Check if image is selected
      if (!data.image || data.image.length === 0) {
        alert("Please select an image first!");
        return;
      }

      const form = new FormData();
      
      // 🔥 BUG FIX 1: data.image ki jagah data.image[0] use kiya hai actual file nikalne ke liye
      form.append("image", data.image[0]); 
      form.append("caption", data.caption || "");

      console.log("Submitting FormData...");

      // 2. Backend post create endpoint par request bhejna
      // Note: Axios automatically 'multipart/form-data' header lagata hai jab hum FormData bhejte hain
      const response = await apiClient.post("/post/create-post", form);
      console.log("Post Created Successfully:", response.data);

      // Reset form states after success
      setImagePreview(null);
      reset();
      
    } catch (error) {
      console.error("Post Creation Error:", error.response?.data || error.message);
    }
  };

  // Preview clear karne ke liye handler
  const handleRemoveImage = () => {
    setImagePreview(null);
    reset({ image: null });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden mt-6">
      
      {/* Header bar like Instagram */}
      <div className="border-b border-gray-200 py-3 px-4 text-center">
        <h2 className="font-semibold text-gray-800">Create new post</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row min-h-[400px]">
        
        {/* Left Side: Image Upload Box or Preview */}
        <div className="flex-1 bg-gray-50 flex flex-col items-center justify-center border-r border-gray-200 relative p-4 min-h-[300px]">
          {imagePreview ? (
            // Agar image select ho gayi hai toh preview aur change image ka option
            <div className="w-full h-full flex flex-col items-center justify-center relative">
              <img 
                src={imagePreview} 
                alt="Upload preview" 
                className="max-h-[350px] object-contain rounded-md"
              />
              <button 
                type="button" 
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white text-xs p-1.5 rounded-full transition-colors"
              >
                ✕ Remove
              </button>
            </div>
          ) : (
            // Default select image UI panel
            <label className="cursor-pointer flex flex-col items-center gap-3 text-center group">
              {/* Media Icon */}
             <svg 
              xmlns="http://w3.org" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1} 
              stroke="currentColor" 
              className="w-16 h-16 text-gray-400 group-hover:text-blue-500 transition-colors"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" 
              />
            </svg>

              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-500">Select image from computer</span>
              
              {/* Actual File Input Hidden for styling */}
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                {...register("image")}
              />
            </label>
          )}
        </div>

        {/* Right Side: Caption input and Post triggers */}
        <div className="w-full md:w-72 p-4 flex flex-col justify-between bg-white">
          
          {/* Caption Field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Caption</label>
            <textarea 
              placeholder="Write a caption..." 
              rows={5}
              {...register("caption")}
              className="w-full text-sm border-0 border-b border-gray-100 outline-none resize-none focus:border-blue-400 pb-2 transition-all"
            />
          </div>

          {/* Action Trigger Button */}
          <button 
            type="submit" 
            disabled={isSubmitting || !imagePreview}
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold text-sm py-2 rounded transition-colors disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sharing..." : "Share Post"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreatePostPage;
