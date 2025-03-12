const cartModels = require("../models/CartModels")

const cartController = {

    getAllCart: async (req, res) => {
        try {
            const userId = req.query.userId
            const cart = await cartModels.find({ userId: userId });
            res.status(200).json(cart);
        } catch (e) {
            res.status(500).json({ Err: e });
        }
    },

    // thêm sp vào giỏ hàng
    addNewItemCart: async (req, res) => {
        const userId = req.body.userId;
        const product = req.body.product;
        const img = req.body.img;
        const quantity = req.body.quantity;
        const size = req.body.size;
        const notes = req.body.notes;
        const price = req.body.price;
        const subtotal = quantity * price;
        const description = req.body.description;

        try {
            // Tìm kiếm sản phẩm đã tồn tại trong giỏ hàng
            const existingProduct = await cartModels.findOne({
                userId: userId,
                product: product,
                size: size, // Kiểm tra theo size nếu cần
            });

            if (existingProduct) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng và subtotal
                existingProduct.quantity += quantity;
                existingProduct.subtotal += quantity * price;
                await existingProduct.save();
                res.status(200).json({
                    message: 'Cập nhật số lượng sản phẩm thành công',
                    cartItem: existingProduct
                });
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
                const newCartItem = new cartModels({
                    userId,
                    product,
                    img,
                    quantity,
                    notes,
                    size,
                    price,
                    subtotal,
                    description,
                });

                await newCartItem.save();
                res.status(200).json({
                    message: 'Thêm sản phẩm mới vào giỏ hàng thành công',
                    cartItem: newCartItem
                });
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
            res.status(500).json({ Err: error });
        }
    },


    // Tăng số lượng
    increaseQuantity: async (req, res) => {
        const userId = req.body.userId;
        const itemId = req.body.itemId;
        const quantity = req.body.quantity;

        try {
            const existingProduct = await cartModels.findOne({ userId: userId, _id: itemId });

            if (existingProduct) {
                existingProduct.quantity += quantity;
                existingProduct.subtotal += quantity * existingProduct.price;
                await existingProduct.save();
                res.status(200).json({ itemId: existingProduct._id }); // Trả về ID sản phẩm
            } else {
                res.status(404).json({ message: 'Product not found in cart' });
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            res.status(500).json({ Err: error });
        }
    },

    // Giảm số lượng
    decreaseQuantity: async (req, res) => {
        const userId = req.body.userId;
        const itemId = req.body.itemId;
        const quantity = req.body.quantity;

        let existingProduct = await cartModels.findOne({ userId: userId, _id: itemId });
        // console.log(existingProduct);
        if (existingProduct) {
            if (existingProduct.quantity < 2) {
                await cartModels.deleteOne({ _id: itemId, userId: userId });
                res.status(200).json({ message: 'Sản phẩm đã xóa khỏi giỏ hàng' });
            } else {
                try {
                    existingProduct.quantity -= quantity;
                    existingProduct.subtotal -= quantity * existingProduct.price;

                    await existingProduct.save();
                    res.status(200).json(existingProduct);
                } catch (error) {
                    console.error('Error updating quantity:', error);
                    res.status(500).json({ Err: error });
                }
            }
        } else {
            res.status(404).json({ message: 'Sản phẩm không tìm thấy trong Cart' });
        }
    },

    //
    // Xóa một sản phẩm khỏi giỏ hàng
    deleteItemCart: async (req, res) => {
        const itemId = req.body.itemId;
        const userId = req.body.userId;

        try {
            await cartModels.deleteOne({ _id: itemId, userId: userId });
            res.status(200).json({ message: 'Sản phẩm đã được xóa !' });
        } catch (error) {
            console.error('Error deleting item from cart:', error);
            res.status(500).json({ Err: error });
        }
    },

    // Xóa toàn bộ giỏ hàng của một người dùng
    clearCart: async (req, res) => {
        const userId = req.body.userId;

        try {
            await cartModels.deleteMany({ userId: userId });
            res.status(200).json({ message: 'Giỏ hàng đã được xóa hoàn toàn!' });
        } catch (error) {
            console.error('Lỗi khi xóa giỏ hàng:', error);
            res.status(500).json({ Err: error });
        }
    }

}

module.exports = cartController
