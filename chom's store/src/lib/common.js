export const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => {
        return total + item.subtotal;
    }, 0);
};