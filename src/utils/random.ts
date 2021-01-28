const { nanoid } = require("nanoid");

const randomId = () => {
  return nanoid();
};

module.exports = {
  randomId,
};
