const router = require("express").Router();
const ShoeController = require('../controller/Shoe');

router.get('/getAll', ShoeController.getAllData);

router.get("/filter", ShoeController.filterShoes);

router.get('/filter-price', ShoeController.filterShoesByPrice);

router.get('/filter/size', ShoeController.filterShoesBySize);

router.get('/:id', ShoeController.getShoeDetail);

router.post('/add-new', ShoeController.addNewShoe)

router.put('/update/:id', ShoeController.updateShoe)

router.delete('/:id', ShoeController.handleDelete)


module.exports = router