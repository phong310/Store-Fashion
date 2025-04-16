const ShoeModel = require('../models/ShoeModel')

const ShoeController = {
    // GET ALL
    getAllData: async (req, res) => {
        try {
            let { page, limit } = req.query;

            // Nếu không truyền page hoặc limit thì lấy toàn bộ sản phẩm
            if (!page || !limit) {
                const allShoes = await ShoeModel.find(); // Lấy tất cả sản phẩm
                return res.status(200).json({
                    totalShoes: allShoes.length,
                    shoes: allShoes, // Danh sách sản phẩm đầy đủ
                });
            }

            // Nếu có page & limit thì thực hiện phân trang
            page = parseInt(page);
            limit = parseInt(limit);

            const totalShoes = await ShoeModel.countDocuments(); // Tổng số sản phẩm
            const totalPages = Math.ceil(totalShoes / limit); // Số trang

            const Data = await ShoeModel.find()
                .skip((page - 1) * limit)
                .limit(limit);

            res.status(200).json({
                currentPage: page,
                totalPages,
                totalShoes,
                limit,
                shoes: Data, // Danh sách sản phẩm phân trang
            });
        } catch (e) {
            res.status(500).json({ err: e });
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
    },

    // LỌC
    filterShoes: async (req, res) => {
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

            const shoes = await ShoeModel.find().sort(sortQuery);

            res.status(200).json({
                totalShoes: shoes.length,
                shoes,
            });
        } catch (e) {
            console.error("Lỗi khi lọc sản phẩm:", e);
            res.status(500).json({ err: e });
        }
    },

    // LỌC THEO GIÁ
    filterShoesByPrice: async (req, res) => {
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

            const shoes = await ShoeModel.find(priceFilter);

            res.status(200).json({
                totalShoes: shoes.length,
                shoes,
            });
        } catch (e) {
            console.error("Lỗi khi lọc sản phẩm theo giá:", e);
            res.status(500).json({ err: e });
        }
    },

    // LỌC THEO SIZE
    filterShoesBySize: async (req, res) => {
        try {
            const { size } = req.query;

            if (!size) {
                return res.status(400).json({ message: "Vui lòng truyền tham số size" });
            }

            const shoes = await ShoeModel.find({ size: { $in: [Number(size)] } });

            res.status(200).json({
                totalShoes: shoes.length,
                shoes,
            });
        } catch (e) {
            console.error("Lỗi khi lọc sản phẩm theo size:", e);
            res.status(500).json({ err: e });
        }
    }


}

module.exports = ShoeController;