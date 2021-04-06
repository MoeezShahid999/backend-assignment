const jwt = require("jsonwebtoken");
const redis = require("redis");
const client = redis.createClient();
const config = require("../config/config");
const { generateJWT } = require("../userAuth/userAuth");
const user = {
  register: async (req, res, next) => {
    try {
      if (req.body.email && req.body.password) {
        client.get(req.body.email, (err, resp) => {
          if (resp) {
            const error = new Error("Email already exists");
            next(error);
          } else {
            const id = req.body.email;

            client.set(
              id,
              JSON.stringify({
                id,
                email: req.body.email,
                password: req.body.password,
              }),
              (err, response) => {
                if (err) {
                  const error = new Error("An error occured in Redis");
                  next(error);
                } else {
                  res.json({ user: { id, email: req.body.email } });
                }
              }
            );
            //   console.log(clientData);
            //   const token = await generateJWT();
          }
        });
      } else {
        const error = new Error("Invalid parameters");
        next(error);
      }
    } catch (err) {
      next(err);
    }
  },
  login: async (req, res, next) => {
    try {
      if (req.body.email && req.body.password) {
        client.get(req.body.email, async (err, resp) => {
          if (err) {
            const error = new Error("Error occured in Redis");
            next(error);
          } else {
            const data = JSON.parse(resp);
            if (data.password === req.body.password) {
              const token = await generateJWT(req.body.email);
              res.json({ jwt: token });
            } else {
              const error = new Error("Incorrect email or password");
            }
          }
        });
      } else {
        const error = new Error("Invalid parameters");
        next(err);
      }
    } catch (err) {
      next(err);
    }
  },
};

module.exports = user;
