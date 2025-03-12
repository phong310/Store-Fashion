const router = require('express').Router();
const ClothingController = require('../controller/Clothing');

router.get('/getAll', ClothingController.getAllClothing);

router.get('/:id', ClothingController.getClothingDetail);

router.post('/add-new', ClothingController.addNewClothing);

router.put('/update/:id', ClothingController.updateCLothing)

router.delete('/:id', ClothingController.handleDelete)


module.exports = router