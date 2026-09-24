const Review = require("../models/Review");

// CREATE REVIEW
const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json({
      message: "Review Added Successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL REVIEWS
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("customer", "name email")
      .populate("provider", "businessName rating");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createReview,
  getReviews,
};