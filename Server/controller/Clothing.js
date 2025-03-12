const ClothingModel = require('../models/ClothingModel');

const ClothingController = {
    // Get all
    getAllClothing: async (req, res) => {
        try {
            const Data = await ClothingModel.find();
            res.status(200).json(Data)
        } catch (e) {
            res.status(500).json({ err: e })
        }
    },

    // Get by id
    getClothingDetail: async (req, res) => {
        try {
            const CloId = req.params.id;
            const clothingDetail = await ClothingModel.findById(CloId);
            if (!clothingDetail) {
                return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
            }
            res.status(200).json(clothingDetail);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
            res.status(500).json({ error: 'Lỗi server' });
        }
    },

    // Add 
    addNewClothing: async (req, res) => {
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
                type:req.body.type
            }

            const dataShoeCollection = new ClothingModel(newData);
            await dataShoeCollection.save();
            res.status(200).json(dataShoeCollection);
        } catch (e) {
            console.log("LỖi: ", e);
            res.status(500).json({ err: e });
        }
    },

    // Update
    updateCLothing: async (req, res) => {
        try {
            const CloId = req.params.id;
            const updateNewClo = {
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
                type:req.body.type,
                status: req.body.status
            }
            const query = { _id: CloId };
            const options = { new: true };
            const result = await ClothingModel.findOneAndUpdate(query, updateNewClo, options);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({ Err: e })
        }
    },

    // Delete
    handleDelete: async (req, res) => {
        try {
            const CloId = req.params.id;
            const itemDelete = await ClothingModel.findByIdAndDelete(CloId);
            res.status(200).json(itemDelete);

        } catch (e) {
            res.status(500).json({ Err: e })
        }
    }

}

module.exports = ClothingController