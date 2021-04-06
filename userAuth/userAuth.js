const jwt = require("jsonwebtoken");
const config = require("../config/config");
const userAuth = async (req, res, next) => {
  try {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "bearer"
    ) {
      let token = req.headers.authorization.split(" ")[1];
      const payload = verifyJWT(token);
      req.id = payload.id;
      req.email = payload.email;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const generateJWT = (email) => {
  // let options = { expiresIn: "1d", algorithm: "RS256" };

  const token = jwt.sign({ id: email, email }, config.jwtSecret, {
    expiresIn: "1d",
  });
  return token;
};
const verifyJWT = (token) => {
  return jwt.verify(token, config.jwtSecret, (err, decode) => {
    if (err) {
      if (err.name == "TokenExpiredError") {
        let error = new Error("Token Expired");
        throw error;
      }
      if (err.name == "JsonWebTokenError") {
        let error = new Error("Token Malformed");
        throw error;
      }

      if (err.name == "NotBeforeError") {
        let error = new Error("Token Inactive");
        throw error;
      }
    }
    console.log(decode);
    return decode;
  });
};
module.exports = { userAuth, generateJWT, verifyJWT };
