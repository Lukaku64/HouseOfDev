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
import IsLogged from "./components/IsLogged";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={
            <IsLogged>
              <Login />
            </IsLogged>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <IsLogged>
              <Register />
            </IsLogged>
          }
        ></Route>

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
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route
          path="/createpost"
          element={
            <ProtectedRoute onlyAdmin>
              <FormAdmin />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/viewAllUsers"
          element={
            <ProtectedRoute onlyAdmin>
              <ViewAllUsers />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/viewAllDates"
          element={
            <ProtectedRoute onlyAdminOrAgent>
              <ViewAllDates />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
