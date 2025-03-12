export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

export const stringToNumber = (data) => {
    return parseFloat(data.replace(/\./g, '').replace(/[^0-9.-]+/g, ''))
}