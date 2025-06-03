import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Homepage from './Components/Homepage'
import { Toaster } from 'react-hot-toast'


function App() {
 

  return (
    <>
    <Toaster position='bottom-right' toastOptions={{duration: 2000}}/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
      <Route path='/Home' element={<Homepage/>}/>
    </Routes>
    </>
  )
}

export default App
