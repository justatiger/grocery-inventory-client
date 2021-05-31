import axios from "axios";
import {
  PRODUCT_CREATE,
  PRODUCT_UPDATE,
  PRODUCT_DELETE,
  PRODUCT_DELETE_ALL,
  PRODUCT_FETCH_ALL,
} from "../constants/productConstants";

const API = axios.create({
  baseURL: "https://tiger-grocery-inventory.herokuapp.com/",
});

export const createProduct = (form) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // const { data } = await axios.post("/products", form);
    const { data } = await API.post("/products", form, config);

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

    // const { data } = await axios.get("/products");
    const { data } = await API.get("/products", config);

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

    // await axios.delete(`/products/${id}`);
    await API.delete(`/products/${id}`, config);

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

    // await axios.post(`/products/delete`, idArr);
    await API.post(`/products/delete`, idArr, config);

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

    // const { data } = await axios.patch(`/products/${id}`, form);
    const { data } = await API.patch(`/products/${id}`, form, config);

    dispatch({ type: PRODUCT_UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
