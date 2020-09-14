import { products } from "../React-products";

const reducer = (state = products, action) => {
  if (action.type === "UPDATE_DATA") {
    return action.payload;
  }
  return state;
};

export default reducer;
