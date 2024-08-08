const express = require("express");
const { createResturant, getAllResturants, updateResturantById, deleteResturantById } = require("../Controllers/Resturants");

const router = express.Router();

router.post("/resuturant", createResturant);
router.get("/resuturant", getAllResturants);
router.patch("/resuturant/:id", updateResturantById);
router.delete("/resuturant/:id", deleteResturantById);






exports.router = router;
