import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const url = "https://course-api.com/react-useReducer-cart-project";

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  try {
    const response = await axios(url);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue("Something went wrong");
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
      cartItem.amount -= 1;
    },
    calculateTotals: (state) => {
      const cartItems = state.cartItems;
      let total = 0, amount = 0;
      
      cartItems.forEach(cartItem => {
        total += (cartItem.amount * cartItem.price);
        amount += cartItem.amount;
      });

      state.total = total;
      state.amount = amount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.isLoading = false;
      })
      .addCase(getCartItems.rejected, (state) => {
        console.log(action.payload);
        state.isLoading = false;
      });
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
