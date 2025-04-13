const express = require('express');
const router = express.Router();

const Shoe = require('../models/ShoeModel');
const Clothing = require('../models/ClothingModel');
const Accessory = require('../models/AccessoriesModel');

router.get('/', async (req, res) => {
    const { q } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!q) {
        return res.status(400).json({ message: 'Thiếu từ khóa tìm kiếm' });
    }

    try {
        const [shoes, clothings, accessories] = await Promise.all([
            Shoe.find({ $text: { $search: q } }),
            Clothing.find({ $text: { $search: q } }),
            Accessory.find({ $text: { $search: q } }),
        ]);

        // Gộp tất cả lại
        const allResults = [
            ...shoes.map(item => ({ ...item.toObject(), category: 'shoe' })),
            ...clothings.map(item => ({ ...item.toObject(), category: 'clothing' })),
            ...accessories.map(item => ({ ...item.toObject(), category: 'accessories' })),
        ];

        // Tổng số
        const total = allResults.length;

        // Phân trang thủ công
        const paginatedResults = allResults.slice(skip, skip + limit);

        res.json({
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            results: paginatedResults,
        });

    } catch (error) {
        console.error('Lỗi khi tìm kiếm:', error);
        res.status(500).json({ message: 'Lỗi server khi tìm kiếm' });
    }
});

module.exports = router;
