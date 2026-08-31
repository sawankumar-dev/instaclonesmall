import { useSelector } from "react-redux"
import { NavLink } from "react-router"

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  return (
    // Amber color hatakar pure white background aur sleek border lagaya hai
    <div className="w-full max-w-5xl mx-auto flex justify-between items-center px-4 py-3 bg-white">
        
        {/* Instagram Logo Text */}
        <div>
          <h2 className="font-serif text-xl font-bold tracking-wide select-none cursor-pointer">
            Instagram
          </h2>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex items-center gap-6 font-medium text-sm text-gray-700">
          <NavLink 
            to={"/"} 
            className={({ isActive }) => 
              `hover:text-black transition-colors ${isActive ? 'font-bold text-black' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to={"/about"} 
            className={({ isActive }) => 
              `hover:text-black transition-colors ${isActive ? 'font-bold text-black' : ''}`
            }
          >
            About
          </NavLink>
          {isAuthenticated && (
            <NavLink 
              to={"/create"} // Route ko '/about' se badalkar '/create' kar diya hai jo zyada sahi hai
              className={({ isActive }) => 
                `flex items-center gap-2 text-sm font-medium transition-colors duration-200 group
                ${isActive ? 'text-blue-600 font-bold' : 'text-blue-600 hover:text-blue-700'}`
              }
            >
              {/* Instagram Square Plus (+) Icon */}
              <svg 
                xmlns="http://w3.org" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor" 
                className="w-5 h-5 transition-transform group-hover:scale-105"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

              {/* Text Label - Mobile par hidden rahega, tablet/desktop par dikhega */}
              <span className="hidden md:inline">Create</span>
            </NavLink>
          )}

        </nav>
        
     {/* Auth Link & User Profile section */}
{isAuthenticated ? (
  <div className="flex items-center gap-3 select-none">
    
    {/* User Profile Avatar Circle */}
    <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 rounded-full p-[1.5px] cursor-pointer hover:scale-105 transition-transform">
      <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
        <span className="text-sm font-bold text-gray-800 uppercase">
          {user?.name?.[0] || "U"}
        </span>
      </div>
    </div>
  </div>
) : (
  <div>
    <NavLink 
      to={'/auth'} 
      className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors"
    >
      Log In
    </NavLink>
  </div>
)}

    </div>
  )
}

export default Navbar
