import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const AuthLayout = () => {
    const { isAuthenticated } = useSelector((state) => state.auth)
    if(isAuthenticated) {
        return <Navigate to={"/"} replace/>
    }
    return (
    <div>
        <Outlet/>
    </div>
  )
}

export default AuthLayout