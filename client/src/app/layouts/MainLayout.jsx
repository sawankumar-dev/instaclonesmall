import { Outlet } from 'react-router'
import Navbar from '../../shared/ui/components/Navbar'
import { useSelector } from 'react-redux'

const MainLayout = () => {
  const { isLoading } = useSelector((state) => state.auth)
  if(isLoading) {
    return <div>
      <h1>Loading....</h1>
    </div>
  }
  return (
    // White theme background aur black text color
    <div className='min-h-screen bg-white text-gray-900 flex flex-col'>
      
      {/* Top Navbar fix rahega scroll ke dauran */}
      <div className='sticky top-0 z-50 bg-white border-b border-gray-200'>
        <Navbar />
      </div>

      {/* Main Content Area jahan feed aur stories dikhengi */}
      <main className='flex-1 w-full flex justify-center px-4 py-6'>
        {/* Responsive constraints: Mobile par full width, tablet/desktop par properly centered */}
        <div className='w-full max-w-md md:max-w-2xl lg:max-w-4xl'>
          <Outlet />
        </div>
      </main>

    </div>
  )
}

export default MainLayout
