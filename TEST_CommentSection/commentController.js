const path = require("path");
const con = require("./DBConnection");

exports.getAllComments = async (req, res) => {
  try {
    // SEND RESPONSE
    res
      .status(200)
      .type("html")
      .sendFile(path.join(`${__dirname}/index.html`));

    //EXECUTE QUERY
    var conn = con.getConnection();
    conn.query("SELECT * FROM comments.comments", function (
      error,
      results,
      fields
    ) {
      if (error) throw error;
      results.forEach((comment) => {
        console.log(comment.userName);
      });
    });
    conn.end();
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
