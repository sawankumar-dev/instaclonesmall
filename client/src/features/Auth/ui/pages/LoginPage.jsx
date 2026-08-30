import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import z from 'zod'
import { NavLink } from 'react-router';
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../../state/authAction';

// 1. Schema fixed: Sirf Email aur Password ka exact validation
const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .pipe(z.email("Invalid email format")),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
})

const LoginPage = () => {
  const dispatch = useDispatch()
  // useForm setup
  const { register, reset, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data) => {
    console.log("Form Data:", data)
    await dispatch(loginUserAction(data))
    reset()
  }

  return (
    // Centered alignment layout
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-4">
      
      {/* Main Login Box */}
      <div className="w-full max-w-sm bg-white border border-gray-300 p-8 flex flex-col items-center rounded-sm shadow-sm">
        
        {/* Instagram Heading Logo */}
        <h1 className="font-serif text-3xl font-bold my-6 select-none tracking-wider">
          Instagram
        </h1>

        {/* HTML Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
          
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

          {/* Submit Button */}
          <button 
            type='submit'
            disabled={isSubmitting}
            className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-1.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Log In"}
          </button>
        </form>

        {/* Divider line style */}
        <div className="flex items-center my-5 w-full text-xs text-gray-400 font-semibold">
          <div className="flex-1 h-[1px] bg-gray-200"></div>
          <span className="px-4">OR</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        {/* Dummy Facebook Login Link */}
        <button className="text-sm font-semibold text-blue-900 flex items-center gap-2 hover:underline">
          Log in with Facebook
        </button>
      </div>

      {/* Bottom Switch Box (Sign Up redirect) */}
      <div className="w-full max-w-sm bg-white border border-gray-300 p-5 mt-3 text-center text-sm rounded-sm shadow-sm">
        <NavLink to={"/auth/register"} className="text-gray-600">
          Don't have an account? <span className="text-blue-500 font-semibold cursor-pointer hover:underline">Sign up</span>
        </NavLink>
      </div>

    </div>
  )
}

export default LoginPage