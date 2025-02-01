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

// Get weekly average temperature and weight per bin
exports.getWeeklyAverages = async (req, res) => {
  try {
    const data = await Bin.aggregate([
      {
        $project: {
          binId: 1,
          temperature: 1,
          weight: 1,
          week: { $isoWeek: "$date" },  // Use $isoWeek to extract the week number (from the date field)
        },
      },
      {
        $group: {
          _id: { binId: "$binId", week: "$week" }, // Group by binId and week
          avgTemperature: { $avg: "$temperature" },
          avgWeight: { $avg: "$weight" },
        },
      },
      {
        $sort: { "_id.binId": 1, "_id.week": 1 }, // Sort by binId and week
      },
    ]);

    // Format the response to include binId, week, and averages
    const formattedData = data.map((item) => ({
      binId: item._id.binId,
      week: item._id.week,
      avgTemperature: Number(item.avgTemperature.toFixed(2)),
      avgWeight: Number(item.avgWeight.toFixed(2)),
    }));

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching weekly averages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
