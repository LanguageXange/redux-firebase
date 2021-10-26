import { createSelector } from "reselect";
import memoize from "lodash.memoize";
const selectShop = (state) => state.myshop;

export const selectShopCollections = createSelector(
  selectShop,
  (s) => s.collections
);
export const selectCollectionsForPreview = createSelector(
  selectShopCollections,
  (collections) =>
    collections ? Object.keys(collections).map((item) => collections[item]) : []
);
export const selectShopItem = memoize((param) =>
  createSelector(selectShopCollections, (collections) =>
    collections ? collections[param] : null
  )
);

export const selectShopFetching = createSelector(
  selectShop,
  (s) => s.isFetching
);
