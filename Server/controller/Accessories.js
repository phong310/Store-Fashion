const AccessoriesModel = require('../models/AccessoriesModel');

const AccessoriesController = {
    // GET ALL
    getAllData: async (req, res) => {
        try {
            let { page, limit } = req.query

            if (!page || !limit) {
                const allAccess = await AccessoriesModel.find()
                return res.status(200).json({
                    totalAccess: allAccess.length,
                    accessories: allAccess,
                })
            }

            page = parseInt(page);
            limit = parseInt(limit);
            const totalAccess = await AccessoriesModel.countDocuments();
            const totalPages = Math.ceil(totalAccess / limit);

            const data = await AccessoriesModel.find()
                .skip((page - 1) * limit)
                .limit(limit);

            res.status(200).json({
                currentPage: page,
                totalPages,
                totalAccess,
                limit,
                accessories: data,
            })


        } catch (e) {
            res.status(500).json({ err: e })
        }
    },

    // Get by id
    getAccessDetail: async (req, res) => {
        try {
            const AccessId = req.params.id;
            const AccessDetail = await AccessoriesModel.findById(AccessId);
            if (!AccessDetail) {
                return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
            }
            res.status(200).json(AccessDetail);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
            res.status(500).json({ error: 'Lỗi server' });
        }
    },

    // Add new
    addNewAccessories: async (req, res) => {
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

            const dataAccessories = new AccessoriesModel(newData);
            await dataAccessories.save();
            res.status(200).json(dataAccessories);
        } catch (e) {
            console.log("LỖi: ", e);
            res.status(500).json({ err: e });
        }
    },

    // update
    updateAccessories: async (req, res) => {
        try {
            const AccessId = req.params.id;
            const updateNewAcc = {
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
                status: req.body.status
            }
            const query = { _id: AccessId };
            const options = { new: true };
            const result = await AccessoriesModel.findOneAndUpdate(query, updateNewAcc, options);
            res.status(200).json(result);

        } catch (e) {
            res.status(500).json({ Err: e })
        }
    },

    // Delete
    handleDelete: async (req, res) => {
        try {
            const AccessId = req.params.id;
            const itemDelete = await AccessoriesModel.findByIdAndDelete(AccessId);
            res.status(200).json(itemDelete);

        } catch (e) {
            res.status(500).json({ Err: e })
        }
    }
}

module.exports = AccessoriesController