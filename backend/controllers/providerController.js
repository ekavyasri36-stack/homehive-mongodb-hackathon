const Provider = require("../models/Provider");

// CREATE PROVIDER
const createProvider = async (req, res) => {
  try {
    const provider = await Provider.create(req.body);

    res.status(201).json({
      message: "Provider Created Successfully",
      provider,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProviders = async (req, res) => {
  try {
    const { availability, service } = req.query;

    let query = {};

    if (availability) {
      query.availability = availability;
    }

    if (service) {
      query.services = service;
    }

    const providers = await Provider.find(query)
      .populate("user", "name email");

    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProvider,
  getProviders,
};