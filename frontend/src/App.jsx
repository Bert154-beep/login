import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import ProfilePage from './Components/ProfilePage'
import EditProfile from './Components/EditProfile'
import { Toaster } from 'react-hot-toast'


function App() {
 //Login

  return (
    <>
    <Toaster position='bottom-right' toastOptions={{duration: 2000}}/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
      <Route path='/Profile' element={<ProfilePage/>}/>
      <Route path='/EditProfile' element={<EditProfile/>}/>
    </Routes>
    </>
  )
}

export default App
