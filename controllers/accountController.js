const dotenv = require('dotenv');
dotenv.config();

//jwt verification 
const jwt = require('jsonwebtoken');

exports.loginAdmin = (req, res) => {
    const { username, password } = req.body;
  
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.cookie('token', token, { httpOnly: true }); // Set JWT as an HTTP-only cookie
      return res.status(200).json({ message: 'Login successful', token });
    }
  
    return res.status(401).json({ message: 'Invalid credentials' });
  };
  
//middeware
exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Unauthorized: Invalid token' });
      }
  
      req.user = decoded; // Save user info to request object
      next();
    });
  };