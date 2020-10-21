const errorHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res).catch((err) => {
      console.log(err.message);
      // res.status(400).json({ success: false, error: err.message });
      throw new Error(err.message);
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = errorHandler;
