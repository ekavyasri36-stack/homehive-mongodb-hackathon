const express = require("express");

const {
  getDashboardStats,
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/stats",
  protect,
  authorizeRoles("admin"),
  getDashboardStats
);

module.exports = router;