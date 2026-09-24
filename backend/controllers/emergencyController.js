const EmergencyRequest = require("../models/EmergencyRequest");

// CREATE EMERGENCY REQUEST
const createEmergencyRequest = async (req, res) => {
  try {
    const { emergencyType, contactNumber, location, description } =
      req.body;

    if (
      !emergencyType ||
      !contactNumber ||
      !location ||
      !description
    ) {
      return res.status(400).json({
        message: "All emergency request fields are required",
      });
    }

    const emergencyRequest = await EmergencyRequest.create({
      emergencyType,
      contactNumber,
      location,
      description,
    });

    res.status(201).json({
      message: "Emergency request created successfully",
      emergencyRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL EMERGENCY REQUESTS
const getEmergencyRequests = async (req, res) => {
  try {
    const requests = await EmergencyRequest.find().sort({
      createdAt: -1,
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createEmergencyRequest,
  getEmergencyRequests,
};