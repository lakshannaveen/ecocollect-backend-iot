const Bin = require('../models/Binmodel');

// Get all bins
const getAllBins = async (req, res) => {
  try {
    const bins = await Bin.find();
    res.status(200).json(bins);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bins', error });
  }
};

// Update a bin's collection status
const updateBinStatus = async (req, res) => {
  const { id } = req.params;
  const { collected } = req.body;

  try {
    const bin = await Bin.findByIdAndUpdate(
      id,
      { isCollected: collected },
      { new: true }
    );
    if (!bin) return res.status(404).json({ message: 'Bin not found' });
    res.status(200).json(bin);
  } catch (error) {
    res.status(500).json({ message: 'Error updating bin status', error });
  }
};
// Backend logic (binController.js)

const updateBinerror = async (req, res) => {
    const { id } = req.params;
    const { collected } = req.body;
  
    try {
      const bin = await Bin.findByIdAndUpdate(
        id,
        { isCollected: collected },
        { new: true }
      );
      if (!bin) return res.status(404).json({ message: 'Bin not found' });
  
      // If the bin is no longer collected, reset the warning message and icon
      bin.isBinFull = bin.fullnessPercentage > 90 && !collected;
  
      res.status(200).json(bin); // Send updated bin data
    } catch (error) {
      res.status(500).json({ message: 'Error updating bin status', error });
    }
  };
  
// Add this new function to your existing binController.js
const createOrUpdateBinData = async (req, res) => {
  try {
    const { 
      binId,
      binLocation,
      fullnessPercentage,
      temperature,
      humidity,
      weight
    } = req.body;

    // Auto-calculate isBinFull based on fullnessPercentage
    const isBinFull = fullnessPercentage > 90;

    // Find and update or create new bin
    const bin = await Bin.findOneAndUpdate(
      { binId }, // Find by binId
      {
        binLocation,
        fullnessPercentage,
        isBinFull,
        isCollected: false, // Default to false when updating from sensor
        temperature,
        humidity,
        weight,
        lastUpdated: new Date() // Track when data was received
      },
      { 
        upsert: true, // Create if doesn't exist
        new: true, // Return the updated document
        setDefaultsOnInsert: true 
      }
    );

    res.status(200).json(bin);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error processing bin data', 
      error: error.message 
    });
  }
};

// Update your exports to include the new function
module.exports = { 
  getAllBins, 
  updateBinStatus, 
  updateBinerror,
  createOrUpdateBinData // Add this
};