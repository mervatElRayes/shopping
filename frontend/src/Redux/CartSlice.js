import { createSlice } from "@reduxjs/toolkit";
// use "useSelector" To get the array
const initialState = {
  selectedProducts: localStorage.getItem("selectedProducts")
    ? JSON.parse(localStorage.getItem("selectedProducts"))
    : [],
  selectedProductsID: localStorage.getItem("selectedProducts")
    ? JSON.parse(localStorage.getItem("selectedProductsID"))
    : [],
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,

  // "action.payload" ===>  Product from APIمعناها القيمة التى بداخل الاقواس
  reducers: {
    // "action.payload" ===>  Product from APIمعناها القيمة التى بداخل الاقواس
    addToCart: (state, action) => {
      // state.value += action.payload
      const productWithQuantity = { ...action.payload, quantity: 1 };
      state.selectedProducts.push(productWithQuantity);
      state.selectedProductsID.push(action.payload.id);
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
      localStorage.setItem(
        "selectedProductsID",
        JSON.stringify(state.selectedProductsID)
      );
    },
    // "action.payload" ===>  Product from User  'that user selecte it'  القيمة التى بداخل الاقواس
    increaseQuantity: (state, action) => {
      // state.value += action.payload
      const increasedProduct = state.selectedProducts.find((item) => {
        return item.id === action.payload.id;
      });
      increasedProduct.quantity += 1;
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },

    decreaseQuantity: (state, action) => {
      // state.value += action.payload
      const decreaseQuantity = state.selectedProducts.find((item) => {
        return item.id === action.payload.id;
      });
      decreaseQuantity.quantity -= 1;
      if (decreaseQuantity.quantity === 0) {
        // delete the selected  product
        const newArr = state.selectedProducts.filter((item) => {
          return item.id !== action.payload.id;
        });

        const newArr2 = state.selectedProductsID.filter((item) => {
          return item !== action.payload.id;
        });
        state.selectedProducts = newArr;
        state.selectedProductsID = newArr2;
        localStorage.setItem(
          "selectedProductsID",
          JSON.stringify(state.selectedProductsID)
        );
      }
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },

    deleteProduct: (state, action) => {
      // delete the selected  product
      const newArr = state.selectedProducts.filter((item) => {
        return item.id !== action.payload.id;
      });

      const newArr2 = state.selectedProductsID.filter((item) => {
        return item !== action.payload.id;
      });
      state.selectedProducts = newArr;
      state.selectedProductsID = newArr2;

      localStorage.setItem(
        "selectedProductsID",
        JSON.stringify(state.selectedProductsID)
      );
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },
  },
});

// دائما هتنساهاااااااااااااااااااااااااااااااا
export const { addToCart, increaseQuantity, decreaseQuantity, deleteProduct } =
  counterSlice.actions;

export default counterSlice.reducer;
