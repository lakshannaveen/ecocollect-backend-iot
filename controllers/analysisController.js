const Bin = require("../models/Binmodel"); // Ensure correct model path

// Get daily average temperature and weight
// Get daily average temperature and weight per bin
exports.getDailyAverages = async (req, res) => {
  try {
    const data = await Bin.aggregate([
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Extract date
          binId: 1, // Include binId in the projection
          temperature: 1,
          weight: 1,
        },
      },
      {
        $group: {
          _id: { date: "$date", binId: "$binId" }, // Group by both date and binId
          avgTemperature: { $avg: "$temperature" },
          avgWeight: { $avg: "$weight" },
        },
      },
      {
        $sort: { "_id.date": 1 }, // Sort by date
      },
    ]);

    // Format the response to include binId, date, and averages
    const formattedData = data.map((item) => ({
      day: item._id.date,
      binId: item._id.binId,
      avgTemperature: Number(item.avgTemperature.toFixed(2)),
      avgWeight: Number(item.avgWeight.toFixed(2)),
    }));

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching daily averages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

