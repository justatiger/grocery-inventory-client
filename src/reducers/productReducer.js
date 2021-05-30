import {
  PRODUCT_CREATE,
  PRODUCT_UPDATE,
  PRODUCT_DELETE,
  PRODUCT_DELETE_ALL,
  PRODUCT_FETCH_ALL,
} from "../constants/productConstants";

export const productReducer = (products = [], action) => {
  switch (action.type) {
    case PRODUCT_FETCH_ALL:
      return action.payload;
    case PRODUCT_CREATE:
      return [...products, action.payload];
    case PRODUCT_DELETE:
      return products.filter((p) => p._id !== action.payload);
    case PRODUCT_DELETE_ALL:
      return products.filter(function (p) {
        return action.payload.indexOf(p._id) === -1;
      });
    case PRODUCT_UPDATE:
      return products.map((p) =>
        p._id === action.payload._id ? action.payload : p
      );
    default:
      return products;
  }
};
