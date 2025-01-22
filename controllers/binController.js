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

module.exports = { getAllBins, updateBinStatus };
