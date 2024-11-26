const router = require("express").Router(); // Module pour créer un nouveau route
const UserController = require("../controllers");

router.post("/", UserController.create);
router.get("/user/:id", UserController.getOne);
router.get("/", UserController.getAll);
router.delete("/user/:id", UserController.deleteOne);

module.exports = router;