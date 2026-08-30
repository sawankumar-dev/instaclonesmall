import { createBrowserRouter, RouterProvider } from "react-router"
import AuthLayout from "../app/layouts/AuthLayout"
import LoginPage from "../features/Auth/ui/pages/LoginPage"
import RegisterPage from "../features/Auth/ui/pages/RegisterPage"
import MainLayout from "../app/layouts/MainLayout"
import HomePage from "../shared/ui/pages/HomePage"
import AboutPage from "../shared/ui/pages/AboutPage"

const MainRoutes = () => {
    const router = createBrowserRouter([
        {
            path: "/auth",
            element: <AuthLayout/>,
            children: [
                {
                    path: "",
                    element: <LoginPage/>
                },
                {
                    path: "register",
                    element: <RegisterPage/>
                }
            ]
        },
        {
            path: "/",
            element: <MainLayout/>,
            children: [
                {
                    path: "",
                    element: <HomePage/>
                },
                {
                    path: "about",
                    element: <AboutPage/>
                }
            ]
        }
    ])
  return (
    <RouterProvider router={router}/>
  )
}

export default MainRoutes