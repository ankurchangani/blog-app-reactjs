import { Routes, Route, } from 'react-router-dom';
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import AddPost from './components/AddPost/Addpost';
import AllPost from './components/AllPostView/AllPost';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ViewPost from './components/ViewPost/ViewPost';
import EditPost from './components/EditPost/EditPost';
import Footer from './components/Footer/Footer'
import Hoc from './components/Hoc/Hoc';
function App() {
  const ProtectedAddData = Hoc(AddPost);
  const ProtectedAllPost = Hoc(AllPost);
  const ProtectedViewData = Hoc(ViewPost);
  const ProtectedUpdateData = Hoc(EditPost);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addpost" element={<ProtectedAddData />} />
        <Route path="/allpost" element={<ProtectedAllPost />} />
        <Route path="/viewpost/:id" element={<ProtectedViewData />} />
        <Route path="editpost" element={<ProtectedUpdateData />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
