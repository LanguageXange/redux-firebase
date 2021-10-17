export const addItemToCart = (items, itemToAdd) => {
  const existingItem = items.find((item) => item.id === itemToAdd.id);
  if (existingItem) {
    return items.map((item) =>
      item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  return [...items, { ...itemToAdd, quantity: 1 }];
};
