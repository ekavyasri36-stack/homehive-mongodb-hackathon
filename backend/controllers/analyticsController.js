const Booking = require("../models/Booking");

const getAnalytics = async (req, res) => {
  try {
    const bookingsByStatus = await Booking.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      bookingsByStatus
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAnalytics
};
