const db = require("../database.js");

exports.updateIsDone = (req, res) => {
  db.run(
    "UPDATE Todos set isDone = ? WHERE id = ?",
    [req.body.isDone, req.params.id],
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "success",
        data: result,
        changes: this.changes,
      });
    }
  );
};

exports.deleteTodo = (req, res) => {
  db.run(
    "DELETE FROM Todos WHERE id = ?",
    req.params.id,
    function (err, result) {
      if (err) {
        res.status(400).json({ error: result.message });
        return;
      }
      res.json({ message: "deleted", changes: this.changes });
    }
  );
};
