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

exports.createComment = async (req, res) => {
  try {
    var content = "";
    req.on("data", function (data) {
      content += data;
      var obj = JSON.parse(content);
      console.log("The UserName is: " + obj.name);
      console.log("The Comment is: " + obj.message);

      var conn = con.getConnection();
      conn.query(
        "INSERT INTO comments.comments (comments.userName, comments.comment) VALUES (?,?)",
        [obj.name, obj.message],
        function (error, results, fields) {
          if (error) throw error;
          console.log("insert success!!!");
        }
      );
      conn.end();
      res.end("Success!");
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
