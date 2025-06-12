import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import ProfilePage from './Components/ProfilePage'
import EditProfile from './Components/EditProfile'
import { Toaster } from 'react-hot-toast'
import ForbiddenPage from './Components/ErrorPages/ForbiddenPage'
import NotfoundPage from './Components/ErrorPages/NotfoundPage'
import AdminDashboard from './Components/Dashboards/AdminDashboard'
import UserDasboard from './Components/Dashboards/UserDasboard'
import AdminLayout from './Components/Layout/AdminLayout'
import UserLayout from './Components/Layout/UserLayout'


function App() {

  return (
    <>
    <Toaster position='bottom-right' toastOptions={{duration: 2000}}/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>

      <Route path='/user' element={<UserLayout/>}>
        <Route index element={<UserDasboard/>}/>
        <Route path='Profile' element={<ProfilePage/>}/>
        <Route path='EditProfile' element={<EditProfile/>}/>
      </Route>

      <Route path='/admin' element={<AdminLayout/>}>
        <Route index element={<AdminDashboard/>}/>
      </Route>

      <Route path='/403' element={<ForbiddenPage/>}/>
      <Route path='*' element={<NotfoundPage/>}/>
    </Routes>
    </>
  )
}

export default App
