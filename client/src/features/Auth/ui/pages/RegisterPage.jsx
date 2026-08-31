import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, NavLink, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerUserAction } from "../../state/authAction";

// 1. Fixed Schema Validation Syntax
const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters long'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email("Invalid email format"),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password cannot exceed 50 characters")
})

const RegisterPage = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema)
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // 2. Form submission with API integration
  const onSubmit = (data) => {
    try {
      // Backend signup endpoint (e.g., /auth/register)
      dispatch(registerUserAction(data))
      reset();
      console.log(data)
      navigate("/")
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
    }
  }

  return (
    // Centered alignment layout
    <div className="min-h-[85vh] flex flex-col items-center justify-center bg-gray-50 px-4 py-6">
      
      {/* Main Register Box */}
      <div className="w-full max-w-sm bg-white border border-gray-300 p-8 flex flex-col items-center rounded-sm shadow-sm">
        
        {/* Instagram Brand Heading */}
        <h1 className="font-serif text-3xl font-bold mt-4 mb-2 select-none tracking-wider">
          Instagram
        </h1>
        
        {/* Subtitle text like real Instagram */}
        <p className="text-gray-500 font-semibold text-center text-sm mb-6 px-4">
          Sign up to see photos and videos from your friends.
        </p>

        {/* HTML Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
          
          {/* Name Input */}
          <div className="flex flex-col w-full">
            <input 
              type="text" 
              placeholder="Full Name"
              {...register("name")}
              className={`w-full bg-gray-50 text-xs p-2.5 rounded border outline-none transition-all focus:border-gray-400
                ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && (
              <p className="text-red-500 text-[11px] mt-1 pl-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="flex flex-col w-full">
            <input 
              type="email" 
              placeholder="Email address"
              {...register("email")}
              className={`w-full bg-gray-50 text-xs p-2.5 rounded border outline-none transition-all focus:border-gray-400
                ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && (
              <p className="text-red-500 text-[11px] mt-1 pl-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col w-full">
            <input 
              type="password" 
              placeholder="Password"
              {...register("password")}
              className={`w-full bg-gray-50 text-xs p-2.5 rounded border outline-none transition-all focus:border-gray-400
                ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && (
              <p className="text-red-500 text-[11px] mt-1 pl-1">{errors.password.message}</p>
            )}
          </div>

          {/* Policy Text snippet for realism */}
          <p className="text-[11px] text-gray-400 text-center my-1 px-2">
            People who use our service may have uploaded your contact information to Instagram.
          </p>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-1.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Registering..." : "Sign up"}
          </button>
        </form>

      </div>

      {/* Bottom Switch Box (Login redirect) */}
      <div className="w-full max-w-sm bg-white border border-gray-300 p-5 mt-3 text-center text-sm rounded-sm shadow-sm">
        <NavLink to={"/auth"} className="text-gray-600">
          Have an account? <span className="text-blue-500 font-semibold cursor-pointer hover:underline">Log in</span>
        </NavLink>
      </div>

    </div>
  )
}

export default RegisterPage