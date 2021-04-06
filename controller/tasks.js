const redis = require("redis");
const client = redis.createClient();
const tasks = {
  createTask: async (req, res, next) => {
    try {
      if (req.body.name) {
        const id = Math.floor(Math.random() * 9000 + 100000);
        client.set(
          req.id + id,
          JSON.stringify({ taskId: id, name: req.body.name, userId: req.id }),
          (err, resp) => {
            if (err) {
              const error = new Error("Error occured in Redis");
              next(error);
            } else {
              res.json({ task: { id: req.id + id, name: req.body.name } });
            }
          }
        );
      } else {
        const error = new Error("Invalid Parameters");
        next(error);
      }
    } catch (err) {
      next(err);
    }
  },
  listTask: (req, res, next) => {
    try {
      client.keys(req.id + "*", (err, response) => {
        if (err) {
          const error = new Error("Error occured in Redis");
          next(error);
        } else {
          let finalTasks = [];
          response.forEach((el, ind) => {
            client.get(el, (err, resultant) => {
              if (err) {
                const error = new Error("Error in Redis");
                next(error);
              }
              finalTasks.push(JSON.parse(resultant));
              if (ind === response.length - 1) {
                 res.json({ tasks: finalTasks });
              }
            });
          });
        }
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = tasks;
