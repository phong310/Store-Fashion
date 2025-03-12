const ShoeModel = require('../models/ShoeModel')

const ShoeController = {
    // GET ALL
    getAllData: async (req, res) => {
        try {
            const Data = await ShoeModel.find();
            res.status(200).json(Data)
        } catch (e) {
            res.status(500).json({ err: e })
        }
    },

    // Get by id
    getShoeDetail: async (req, res) => {
        try {
            const ShoeId = req.params.id;
            const ShoeDetail = await ShoeModel.findById(ShoeId);
            if (!ShoeDetail) {
                return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
            }
            res.status(200).json(ShoeDetail);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
            res.status(500).json({ error: 'Lỗi server' });
        }
    },

    // Add 
    addNewShoe: async (req, res) => {
        try {
            const newData = {
                id: req.body.id,
                code: req.body.code,
                name: req.body.name,
                price: req.body.price,
                quantity: req.body.quantity,
                size: req.body.size,
                img: req.body.img,
                trending: req.body.trending,
                best_seller: req.body.best_seller,
                rating: req.body.rating,
                date: req.body.date,
                status: req.body.status,
                type: req.body.type
            }

            const dataShoeCollection = new ShoeModel(newData);
            await dataShoeCollection.save();
            res.status(200).json(dataShoeCollection);
        } catch (e) {
            console.log("LỖi: ", e);
            res.status(500).json({ err: e });
        }
    },

    // Update
    updateShoe: async (req, res) => {
        try {
            const ShoeId = req.params.id;
            const updateNewShoe = {
                id: req.body.id,
                code: req.body.code,
                name: req.body.name,
                price: req.body.price,
                quantity: req.body.quantity,
                size: req.body.size,
                img: req.body.img,
                trending: req.body.trending,
                best_seller: req.body.best_seller,
                rating: req.body.rating,
                date: req.body.date,
                type: req.body.type,
                status: req.body.status,
            }
            const query = { _id: ShoeId };
            const options = { new: true };
            const result = await ShoeModel.findOneAndUpdate(query, updateNewShoe, options);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({ Err: e })
        }
    },

    // Delete
    handleDelete: async (req, res) => {
        try {
            const ShoeId = req.params.id;
            const itemDelete = await ShoeModel.findByIdAndDelete(ShoeId);
            res.status(200).json(itemDelete);

        } catch (e) {
            res.status(500).json({ Err: e })
        }
    }
}

module.exports = ShoeController;