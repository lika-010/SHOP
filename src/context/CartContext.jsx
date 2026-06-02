const updateQty = (id, action) => {
  setCart(
    cart.map((item) =>
      item.id === id
        ? {
            ...item,
            qty:
              action === "increase"
                ? item.qty + 1
                : Math.max(1, item.qty - 1),
          }
        : item
    )
  );
};
const cartTotal = cart.reduce(
  (total, item) => total + item.salePrice * item.qty,
  0
);
value={
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  updateQty,
  cartTotal,
}