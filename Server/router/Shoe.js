const router = require("express").Router();
const ShoeController = require('../controller/Shoe');

router.get('/getAll', ShoeController.getAllData);

router.get('/:id', ShoeController.getShoeDetail);

router.post('/add-new', ShoeController.addNewShoe)

router.put('/update/:id', ShoeController.updateShoe)

router.delete('/:id', ShoeController.handleDelete)

module.exports = router