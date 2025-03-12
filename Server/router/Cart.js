const router = require("express").Router();
const cartController = require("../controller/CartController");

router.get("/getAllCart", cartController.getAllCart)

router.post("/addItemCart", cartController.addNewItemCart);

router.put("/increase", cartController.increaseQuantity)

router.put("/decrease", cartController.decreaseQuantity)

router.delete("/delete", cartController.deleteItemCart)

router.post('/clear-cart', cartController.clearCart);



module.exports = router