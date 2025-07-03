import {Routes,Route} from "react-router-dom"
import Files from "./components/Files"
import Home from "./MainPage/Home"
import Profile from "./components/Profile"

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Files/>}/>
      <Route path='spreadsheet' element={<Home/>}/>
      <Route path='profile' element={<Profile/>}/>
    </Routes>
  )
}

export default App