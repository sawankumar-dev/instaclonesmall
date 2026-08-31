import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoutes = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    console.log(isAuthenticated)
    if(!isAuthenticated) {
        return <Navigate to={"/"} replace/>
    }
  return (
    <Outlet/>
  )
}

export default ProtectedRoutes