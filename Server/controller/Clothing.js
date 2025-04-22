const ClothingModel = require('../models/ClothingModel');

const ClothingController = {
    // Get all
    getAllClothing: async (req, res) => {
        try {
            let { page, limit } = req.query;

            if (!page || !limit) {
                const allClo = await ClothingModel.find();
                return res.status(200).json({
                    totalClo: allClo.length,
                    clothings: allClo,
                })
            }

            page = parseInt(page);
            limit = parseInt(limit);
            const totalClo = await ClothingModel.countDocuments();
            const totalPages = Math.ceil(totalClo / limit);

            const data = await ClothingModel.find()
                .skip((page - 1) * limit)
                .limit(limit);

            res.status(200).json({
                currentPage: page,
                totalPages,
                totalClo,
                limit,
                clothings: data,
            })

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
                type: req.body.type
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
                type: req.body.type,
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
    },

    // LỌC
    filterClothing: async (req, res) => {
        try {
            const { sortBy } = req.query;

            // Sắp xếp mặc định
            let sortQuery = {};

            switch (sortBy) {
                case 'name-asc':
                    sortQuery.name = 1;
                    break;
                case 'name-desc':
                    sortQuery.name = -1;
                    break;
                case 'price-asc':
                    sortQuery.price = 1;
                    break;
                case 'price-desc':
                    sortQuery.price = -1;
                    break;
                case 'newest':
                    sortQuery.createdAt = -1;
                    break;
                case 'oldest':
                    sortQuery.createdAt = 1;
                    break;
                default:
                    break;
            }

            const clothings = await ClothingModel.find().sort(sortQuery);

            res.status(200).json({
                totalClo: clothings.length,
                clothings,
            });
        } catch (e) {
            console.error("Lỗi khi lọc sản phẩm:", e);
            res.status(500).json({ err: e });
        }
    },

    // LỌC THEO GIÁ
    filterClothingByPrice: async (req, res) => {
        try {
            const { minPrice, maxPrice } = req.query;

            // Tạo query điều kiện lọc
            let priceFilter = {};

            if (minPrice && maxPrice) {
                priceFilter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
            } else if (minPrice) {
                priceFilter.price = { $gte: Number(minPrice) };
            } else if (maxPrice) {
                priceFilter.price = { $lte: Number(maxPrice) };
            }

            const clothings = await ClothingModel.find(priceFilter);

            res.status(200).json({
                totalClo: clothings.length,
                clothings,
            });
        } catch (e) {
            console.error("Lỗi khi lọc sản phẩm theo giá:", e);
            res.status(500).json({ err: e });
        }
    },

    // LỌC THEO SIZE
    filterClothingBySize: async (req, res) => {
        try {
            const { size } = req.query;

            if (!size) {
                return res.status(400).json({ message: "Vui lòng truyền tham số size" });
            }

            const clothings = await ClothingModel.find({ size: { $in: [size] } });

            res.status(200).json({
                totalClo: clothings.length,
                clothings,
            });
        } catch (e) {
            console.error("Lỗi khi lọc sản phẩm theo size:", e);
            res.status(500).json({ err: e });
        }
    }


}

module.exports = ClothingController