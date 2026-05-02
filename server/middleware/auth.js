import jwt from 'jsonwebtoken';

// headers --> Object containing all HTTP headers sent by client

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.json({ success: false, message: 'Invalid token' });
  }
};

export default auth;