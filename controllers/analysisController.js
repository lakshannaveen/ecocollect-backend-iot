const Bin = require("../models/Binmodel");

// Get daily average temperature, humidity and weight per bin
exports.getDailyAverages = async (req, res) => {
  try {
    const data = await Bin.aggregate([
      {
        $project: {
          binId: 1,
          temperature: 1,
          humidity: 1, // Added humidity
          weight: 1,
        },
      },
      {
        $group: {
          _id: "$binId",
          avgTemperature: { $avg: "$temperature" },
          avgHumidity: { $avg: "$humidity" }, // Added humidity average
          avgWeight: { $avg: "$weight" },
        },
      },
      {
        $sort: { "_id": 1 },
      },
    ]);

    const formattedData = data.map((item) => ({
      binId: item._id,
      avgTemperature: Number(item.avgTemperature.toFixed(2)),
      avgHumidity: Number(item.avgHumidity.toFixed(2)), // Added humidity
      avgWeight: Number(item.avgWeight.toFixed(2)),
    }));

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching daily averages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get weekly average temperature, humidity and weight per bin
exports.getWeeklyAverages = async (req, res) => {
  try {
    const data = await Bin.aggregate([
      {
        $project: {
          binId: 1,
          temperature: 1,
          humidity: 1, // Added humidity
          weight: 1,
          week: { $isoWeek: "$date" },
        },
      },
      {
        $group: {
          _id: { binId: "$binId", week: "$week" },
          avgTemperature: { $avg: "$temperature" },
          avgHumidity: { $avg: "$humidity" }, // Added humidity average
          avgWeight: { $avg: "$weight" },
        },
      },
      {
        $sort: { "_id.binId": 1, "_id.week": 1 },
      },
    ]);

    const formattedData = data.map((item) => ({
      binId: item._id.binId,
      week: item._id.week,
      avgTemperature: Number(item.avgTemperature.toFixed(2)),
      avgHumidity: Number(item.avgHumidity.toFixed(2)), // Added humidity
      avgWeight: Number(item.avgWeight.toFixed(2)),
    }));

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching weekly averages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};