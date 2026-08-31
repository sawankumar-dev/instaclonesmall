import { createBrowserRouter, RouterProvider } from "react-router"
import AuthLayout from "../app/layouts/AuthLayout"
import LoginPage from "../features/Auth/ui/pages/LoginPage"
import RegisterPage from "../features/Auth/ui/pages/RegisterPage"
import MainLayout from "../app/layouts/MainLayout"
import HomePage from "../shared/ui/pages/HomePage"
import AboutPage from "../shared/ui/pages/AboutPage"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { myProfileAction } from "../features/Auth/state/authAction"
import ProtectedRoutes from "./protected/ProtectedRoutes"
import CreatePostPage from "../features/Post/ui/pages/CreatePostPage"

const MainRoutes = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        console.log("Me ek bar jarur chlta hun")
        dispatch(myProfileAction())
    }, [])
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
                },
                {
                    element: <ProtectedRoutes/>,
                    children: [
                        {
                            path: "create",
                            element: <CreatePostPage/>,
                        }
                    ]
                }
            ]
        },
    ])
  return (
    <RouterProvider router={router}/>
  )
}

export default MainRoutes