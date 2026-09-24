const User = require("../models/User");
const Service = require("../models/Service");
const Booking = require("../models/Booking");
const Provider = require("../models/Provider");
const Review = require("../models/Review");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalServices = await Service.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalProviders = await Provider.countDocuments();
    const totalReviews = await Review.countDocuments();

    res.status(200).json({
      totalUsers,
      totalServices,
      totalBookings,
      totalProviders,
      totalReviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};