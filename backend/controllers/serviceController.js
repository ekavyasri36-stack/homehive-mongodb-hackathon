const Service = require("../models/Service");

// CREATE SERVICE
const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json({
      message: "Service Created Successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getServices = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const services = await Service.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE SERVICE
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service Not Found",
      });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE SERVICE
const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!service) {
      return res.status(404).json({
        message: "Service Not Found",
      });
    }

    res.status(200).json({
      message: "Service Updated Successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE SERVICE
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(
      req.params.id
    );

    if (!service) {
      return res.status(404).json({
        message: "Service Not Found",
      });
    }

    res.status(200).json({
      message: "Service Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};