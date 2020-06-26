const path = require("path");
const con = require("./DBConnection");

exports.getQuery = async (req, res) => {
  try {
    //EXECUTE QUERY
    var conn = con.getConnection();
    conn.query("SELECT * FROM comments.comments", function (
      error,
      results,
      fields
    ) {
      if (error) throw error;
      var comments = JSON.stringify(results);
      res.end(comments);
    });
    conn.end();
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

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
