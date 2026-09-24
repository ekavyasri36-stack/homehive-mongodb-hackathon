const validateService = (req, res, next) => {
  const { name, category, description, price } = req.body;

  if (
    !name ||
    !category ||
    !description ||
    !price
  ) {
    return res.status(400).json({
      message: "All Fields Are Required",
    });
  }

  next();
};

module.exports = validateService;