const errorHandler = (err, req, res, next) => {
  res
    .status(err.code ? err.code : 400)
    .json({ success: false, error: err.message });
};

module.exports = errorHandler;
