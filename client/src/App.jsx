import React from "react";
import { useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import RoutesComponenet from "./config/RoutesComponent";
import { API,setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";
import { useNavigate } from "react-router-dom";


if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

function App() {
    let navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);
    console.clear();
    console.log(state);
    useEffect(() => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
  
      // Redirect Auth
      if (!state.isLogin) {
        navigate("/");
      } else {
        if (state.user.role === "admin") {
          navigate("/adminpage");
        } else if (state.user.role === "user") {
          navigate("/");
        }
      }
    }, [state]);
  
    const checkUser = async () => {
      try {
        const response = await API.get("/check-auth");
  
        // If the token incorrect
        if (response.status === 404) {
          return dispatch({
            type: "AUTH_ERROR",
          });
        }
  
        // Get user data
        let payload = response.data.data.user;
        // Get token from local storage
        payload.token = localStorage.token;
  
        // Send data to useContext
        dispatch({
          type: "USER_SUCCESS",
          payload,
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      checkUser();
    }, []);

    return(
    <>
    <RoutesComponenet />
    </>
    )
}

export default App