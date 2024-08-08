const express = require("express");
const { createMenuItem, getAllMenuItems, updateMenuItem, deleteMenuItem } = require("../Controllers/Menu");

const router = express.Router();

router.post("/menu_items", createMenuItem);
router.get("/menu_items", getAllMenuItems);
router.patch("/menu_items/:id", updateMenuItem);
router.delete("/menu_items/:id", deleteMenuItem);


exports.router = router;
