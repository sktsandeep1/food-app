const initalState = {
  loading: false,
  cartItems: [],
};

export const rootReducer = (state = initalState, action) => {
  switch (action.type) {
    case "SHOW_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "HIDE_LOADING":
      return {
        ...state,
        loading: false,
      };

    case "Add_TO_Cart":
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );


      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  // unitPrice pe koi touch nahi
                }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            { ...action.payload, quantity: 1, unitPrice: action.payload.price },
          ],
        };
      }

    case "UPDATE_CART":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
  item._id === action.payload._id
    ? {
        ...item,
        quantity: action.payload.quantity
      }
    : item
)
      };

    case "DELETE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    
    case "CLEAR_CART":
      return { cartItems: [] };
      
    default:
      return state;
  }
};
