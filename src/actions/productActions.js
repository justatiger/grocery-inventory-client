import axios from "axios";
import {
  PRODUCT_CREATE,
  PRODUCT_UPDATE,
  PRODUCT_DELETE,
  PRODUCT_DELETE_ALL,
  PRODUCT_FETCH_ALL,
} from "../constants/productConstants"; // Fixed variables that can be edited from constants folder.

// Needed to proxy the correct link, otherwise unauthorised.
const API = axios.create({
  baseURL: "https://tiger-grocery-inventory.herokuapp.com/",
});

// Actions are called by the
export const createProduct = (form) => async (dispatch, getState) => {
  try {
    // get the userInfo inside web browser local storage.
    const {
      userLogin: { userInfo },
    } = getState();
    // add the TOKEN
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await API.post("/products", form, config); // Pass in config to ensure only logged in user  can perform actions

    dispatch({ type: PRODUCT_CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllProducts = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await API.get("/products", config); // Pass in config to ensure only logged in user  can perform actions

    dispatch({ type: PRODUCT_FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await API.delete(`/products/${id}`, config); // Pass in config to ensure only logged in user  can perform actions

    dispatch({ type: PRODUCT_DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProducts = (idArr) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await API.post(`/products/delete`, idArr, config); // Pass in config to ensure only logged in user  can perform actions

    dispatch({ type: PRODUCT_DELETE_ALL, payload: idArr });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = (id, form) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await API.patch(`/products/${id}`, form, config); // Pass in config to ensure only logged in user  can perform actions

    dispatch({ type: PRODUCT_UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
