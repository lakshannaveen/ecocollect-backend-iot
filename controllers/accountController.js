const dotenv = require('dotenv');
dotenv.config();


exports.loginAdmin = (req, res) => {

    const { username, password } = req.body;
  
    // Check if the credentials match
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Return a success message without any token
      return res.status(200).json({ message: 'Login successful' });
    }
  
    // If credentials don't match, return an error
    return res.status(401).json({ message: 'Invalid credentials' });
  };
