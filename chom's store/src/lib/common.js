export const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => {
        return total + item.subtotal;
    }, 0);
};

export const convertPrice = (text) => {
    return Number(text.replace(/\./g, "").replace("đ", ""));
};

export const formatCurrencyVND = (amount) => {
    if (isNaN(amount)) return '0 ₫';
    return amount.toLocaleString('vi-VN') + ' ₫';
}