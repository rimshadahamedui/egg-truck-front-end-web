import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCartFromServer: (state, { payload }) => {
      state.cart = payload;
    },
    addToCart: (state, { payload }) => {
      state.cart = [...state.cart, payload];
    },
    updateQuantity: (state, { payload }) => {
      const updated = state?.cart?.map((product) =>
        product._id === payload._id
          ? { ...product, quantity: payload.quantity }
          : product
      );
      state.cart = updated;
    },
    removeFromCart: (state, { payload }) => {
      state.cart = state?.cart.filter((product) => product._id !== payload._id);
    },
    clearCart: () => initialState,
  },
});

export const {
  loadCartFromServer,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;
