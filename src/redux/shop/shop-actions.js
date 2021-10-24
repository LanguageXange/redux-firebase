import ShopActionTypes from "./shop-types";

const updateCollection = (collectionMaps) => ({
  type: ShopActionTypes.UPDATE_COLLECTION,
  payload: collectionMaps,
});

export default updateCollection;
