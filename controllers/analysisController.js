const Bin = require("../models/Binmodel"); // Ensure correct model path

// Get daily average temperature and weight per bin
exports.getDailyAverages = async (req, res) => {
  try {
    const data = await Bin.aggregate([
      {
        $project: {
          binId: 1, // Include binId in the projection
          temperature: 1,
          weight: 1,
        },
      },
      {
        $group: {
          _id: "$binId", // Group by binId only
          avgTemperature: { $avg: "$temperature" },
          avgWeight: { $avg: "$weight" },
        },
      },
      {
        $sort: { "_id": 1 }, // Sort by binId
      },
    ]);

    // Format the response to include binId and averages
    const formattedData = data.map((item) => ({
      binId: item._id,
      avgTemperature: Number(item.avgTemperature.toFixed(2)),
      avgWeight: Number(item.avgWeight.toFixed(2)),
    }));

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching daily averages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
