const Bin = require('../models/Binmodel'); // Ensure this path is correct based on your project structure

// Controller to get all the bins from the database
exports.getBins = async (req, res) => {
  try {
    const bins = await Bin.find(); // Fetch bins from the database
    res.json(bins); // Send bins data as a JSON response
  } catch (error) {
    console.error("Error fetching bins:", error);
    res.status(500).json({ message: "Server error" }); // Return an error if there's an issue
  }
};
