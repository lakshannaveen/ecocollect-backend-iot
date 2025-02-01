const Bin = require("../models/Binmodel"); // Ensure correct model path

// Get daily average temperature and weight
exports.getDailyAverages = async (req, res) => {
  try {
    const data = await Bin.aggregate([
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Extract only the date (without time)
          temperature: 1,
          weight: 1,
        },
      },
      {
        $group: {
          _id: "$date", // Group by date
          avgTemperature: { $avg: "$temperature" },
          avgWeight: { $avg: "$weight" },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date
      },
    ]);

    const formattedData = data.map((item) => ({
      day: item._id, // The date
      avgTemperature: Number(item.avgTemperature.toFixed(2)),
      avgWeight: Number(item.avgWeight.toFixed(2)),
    }));

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching daily averages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
