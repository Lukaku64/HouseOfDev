import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import FormAdmin from "./pages/FormAdmin";
import ViewUser from "./pages/ViewUser";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/createpost" element={<FormAdmin />}></Route>
        <Route path="/viewUser" element={<ViewUser />}></Route>
      </Routes>
    </>
  );
}

export default App;
