const express = require("express");

const {
  createProvider,
  getProviders,
} = require("../controllers/providerController");

const router = express.Router();

router.post("/", createProvider);

router.get("/", getProviders);

module.exports = router;