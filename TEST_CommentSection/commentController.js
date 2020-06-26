const path = require("path");

exports.getAllComments = async (req, res) => {
  try {
    // SEND RESPONSE
    res
      .status(200)
      .type("html")
      .sendFile(path.join(`${__dirname}/index.html`));
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
