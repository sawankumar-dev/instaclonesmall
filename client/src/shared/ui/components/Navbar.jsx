import { NavLink } from "react-router"

const Navbar = () => {
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
        </nav>
        
        {/* Auth Link (Button style login) */}
        <div>
          <NavLink 
            to={'/auth'} 
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors"
          >
            Log In
          </NavLink>
        </div>

    </div>
  )
}

export default Navbar
