import axios from "axios";
import { AUTH, LOGOUT } from "../constants/userConstants";

// Needed to proxy the correct link, otherwise unauthorised.
const API = axios.create({
  baseURL: "https://tiger-grocery-inventory.herokuapp.com/",
});

// Sign in action
export const signin = (form) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await API.post("/auth/login", form, config);

    dispatch({
      type: AUTH,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// Sign up action
export const signup = (form) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await API.post("/auth", form, config);

    dispatch({
      type: AUTH,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// Log out action
export const logout = (form) => async (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem("userInfo");
  document.location.href = "/";
};
