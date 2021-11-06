import { createSelector } from "reselect";

const selectCart = (state) => state.mycart;

export const selectCartHidden = createSelector(
  selectCart,
  (cart) => cart.hidden
);
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.items
);

export const selectCartCounts = createSelector(selectCartItems, (items) =>
  items.reduce((a, c) => a + c.quantity, 0)
);

export const selectCartTotal = createSelector(selectCartItems, (items) =>
  items.reduce((a, c) => a + c.quantity * c.price, 0)
);
