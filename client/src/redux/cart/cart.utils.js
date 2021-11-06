// clear entire item from cart
export const removeItemFromCart = (items, idToRemove) => {
  return items.filter((item) => item.id !== idToRemove);
};

export const increaseItem = (items, idToIncrease) => {
  return items.map((item) =>
    item.id === idToIncrease ? { ...item, quantity: item.quantity + 1 } : item
  );
};

export const addItemToCart = (items, itemToAdd) => {
  const existingItem = items.find((item) => item.id === itemToAdd.id);
  if (existingItem) {
    return increaseItem(items, existingItem.id);
  }
  return [...items, { ...itemToAdd, quantity: 1 }];
};

export const decreaseItem = (items, idToDecrease) => {
  const existingItem = items.find((item) => item.id === idToDecrease);
  if (existingItem.quantity <= 1) {
    return removeItemFromCart(items, idToDecrease);
  } else {
    return items.map((item) =>
      item.id === idToDecrease ? { ...item, quantity: item.quantity - 1 } : item
    );
  }
};
