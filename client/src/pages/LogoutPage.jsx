import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";

const LogoutPage = () => {

  const dispatch = useDispatch();
const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  dispatch({ type: "LOGOUT_SUCCESS" });
  navigate("/");
};
  
  return (
    <DefaultLayout>
      <h1>LogoutPage</h1>

<button onClick={handleLogout}>Logout</button>

    </DefaultLayout>
  );
};

export default LogoutPage;
