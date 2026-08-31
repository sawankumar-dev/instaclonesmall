import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction } from '../../../features/Post/state/postAction';

const HomePage = () => {
  const dispatch = useDispatch();
  
  // 1. Redux State se posts ka data nikalna (Aapne slice me jo naam rakha ho, check kar lena)
  const { posts, loading } = useSelector((state) => state.post || { posts: [] });

  useEffect(() => {
    dispatch(getAllPostAction());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center py-12 text-sm font-medium text-gray-500">Loading feeds...</div>;
  }

  return (
    // Centered Feed Container
    <div className="w-full flex flex-col items-center gap-6 py-4">
      
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          
          /* --- INSTAGRAM POST CARD CARD --- */
          <div 
            key={post._id} 
            className="w-full max-w-[470px] bg-white border border-gray-200 rounded-sm md:rounded-lg overflow-hidden shadow-sm"
          >
            
            {/* Header: User Avatar & Name */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                {/* Profile First Letter Circle */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 p-[1.5px]">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-800 uppercase">
                      {post.user?.name ? post.user.name[0] : 'U'}
                    </span>
                  </div>
                </div>
                {/* Real Time Populated User Name */}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900 cursor-pointer hover:underline">
                    {post.user?.name || "Unknown User"}
                  </span>
                </div>
              </div>
              {/* Triple Dots Menu (Sleek Dummy look) */}
              <button className="text-gray-700 hover:text-gray-400">
                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </button>
            </div>

            {/* Main Uploaded Post Image Container */}
            <div className="w-full bg-gray-50 flex items-center justify-center border-y border-gray-100 max-h-[580px] overflow-hidden">
              <img 
                src={post.image} 
                alt={post.caption || "Instagram Post"} 
                className="w-full h-full object-cover select-none"
                loading="lazy"
              />
            </div>

            {/* Footer Action Icons Panel */}
            <div className="px-4 pt-3 pb-2 flex flex-col gap-2">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4 text-gray-800">
                  {/* Like Button Icon */}
                  <button className="hover:text-red-500 transition-colors">
                    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  </button>
                  {/* Comment Button Icon */}
                  <button className="hover:text-gray-500 transition-colors">
                    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48L4.32 19.82a.75.75 0 0 0 .934.934l2.339-1.029a8.947 8.947 0 0 0 4.407 1.026Z" />
                    </svg>
                  </button>
                  {/* Share/Send Button Icon */}
                  <button className="hover:text-gray-500 transition-colors">
                    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L6 12Zm0 0h7.5" />
                    </svg>
                  </button>
                </div>
                {/* Bookmark/Save Icon */}
                <button className="text-gray-800 hover:text-gray-500 transition-colors">
                  <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                  </svg>
                </button>
              </div>

              {/* Dummy Likes Count Display */}
              <span className="text-xs font-bold text-gray-900 mt-1 cursor-pointer">
                1,245 likes
              </span>

              {/* Caption Section: Username + Description Text */}
              <div className="text-sm mt-0.5 leading-relaxed">
                <span className="font-bold text-gray-900 mr-2 cursor-pointer hover:underline">
                  {post.user?.name || "user"}
                </span>
                <span className="text-gray-800 break-words">
                  {post.caption}
                </span>
              </div>

              {/* View Comments Trigger Panel */}
              <span className="text-xs text-gray-500 mt-1 cursor-pointer hover:text-gray-400 select-none">
                View all 42 comments
              </span>
            </div>

          </div>
        ))
      ) : (
        // Blank fall-back wrapper screen
        <div className="text-center py-20 text-gray-400 text-sm font-medium">
          No posts available. Be the first to create one!
        </div>
      )}
    </div>
  );
};

export default HomePage;
