const express = require("express");
const validateService = require("../middleware/validationMiddleware");

const {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const router = express.Router();

router.post(
  "/",
  validateService,
  createService
);

router.get("/", getServices);

router.get("/:id", getServiceById);

router.put("/:id", updateService);

router.delete("/:id", deleteService);

module.exports = router;