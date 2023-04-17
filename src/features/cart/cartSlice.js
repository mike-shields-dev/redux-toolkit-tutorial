import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  amount: 1,
  total: 0,
  isLoading: true,
};

const url = "https://course-api.com/react-useReducer-cart-project";

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;

      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, action) => {
      const id = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === id);
      cartItem.amount += 1;
    },
    decrease: (state, action) => {
      const id = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === id);
      cartItem.amount = Math.max(1, cartItem.amount - 1);
    },
    calculateTotals: (state) => {
      const cartItems = state.cartItems;
      const { total, amount } = cartItems.reduce(
        (reduced, item) => {
          reduced.amount += item.amount;
          reduced.total += item.amount * item.price;

          return reduced;
        },
        { amount: 0, total: 0 }
      );
      state.total = total;
      state.amount = amount;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getCartItems.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
