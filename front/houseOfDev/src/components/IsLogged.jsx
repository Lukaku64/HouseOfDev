import { getCookieValue } from "../utils/api";
import { useNavigate } from "react-router-dom";

function IsLogged({ children }) {
  const navigate = useNavigate();
  const token = getCookieValue("token");
  return token ? navigate("/") : children;
}

export default IsLogged;
