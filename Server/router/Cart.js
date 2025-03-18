const router = require("express").Router();
const cartController = require("../controller/CartController");
const verifyToken = require("../middleware/verifyToken");

router.get("/getAllCart", verifyToken, cartController.getAllCart)

router.post("/addItemCart", cartController.addNewItemCart);

router.put("/increase", cartController.increaseQuantity)

router.put("/decrease", cartController.decreaseQuantity)

router.delete("/delete", cartController.deleteItemCart)

router.post('/clear-cart', cartController.clearCart);



module.exports = router