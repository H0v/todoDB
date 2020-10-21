const customError = require("./customError");

const idValidation = (req) => {
  if (req.params.id.length !== 24) {
    throw new customError(400, "Not valid todo id");
  }
};

const isTodo = (todo) => {
  if (!todo) {
    throw new customError(404, "Todo Not Found");
  }
};

module.exports = { idValidation, isTodo };
