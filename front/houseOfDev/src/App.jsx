import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import FormAdmin from "./pages/FormAdmin";
import ViewUser from "./pages/ViewUser";
import ViewProperty from "./pages/ViewProperty";
import OnBoarding from "./pages/OnBoarding";
import OnSale from "./pages/OnSale";
import Rent from "./pages/Rent";
import ViewAppointment from "./pages/ViewAppointment";
import ViewAllDates from "./pages/ViewAllDates";
import Favorites from "./pages/Favorites";
import ViewAllUsers from "./pages/ViewAllUsers";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/createpost" element={<FormAdmin />}></Route>
        <Route path="/viewUser" element={<ViewUser />}></Route>
        <Route
          path="/viewProperty/:idProperty"
          element={<ViewProperty />}
        ></Route>
        <Route path="/search" element={<OnBoarding />}></Route>
        <Route path="/onSale" element={<OnSale />}></Route>
        <Route path="/rent" element={<Rent />}></Route>
        <Route
          path="/viewAppointment/:id"
          element={<ViewAppointment />}
        ></Route>
        <Route path="/viewAllDates" element={<ViewAllDates />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="/viewAllUsers" element={<ViewAllUsers />}></Route>
      </Routes>
    </>
  );
}

export default App;
