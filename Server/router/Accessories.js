const router = require("express").Router();
const AccessoriesController = require('../controller/Accessories');

router.get('/getAll', AccessoriesController.getAllData)

router.get("/filter", AccessoriesController.filterAccessories);

router.get('/filter-price', AccessoriesController.filterAccByPrice);

router.get('/:id', AccessoriesController.getAccessDetail)

router.post('/add-new', AccessoriesController.addNewAccessories)

router.put('/update/:id', AccessoriesController.updateAccessories)

router.delete('/:id', AccessoriesController.handleDelete)

module.exports = router