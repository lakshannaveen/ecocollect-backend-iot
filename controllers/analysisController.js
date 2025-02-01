const Bin = require("../models/Binmodel"); // Adjust path if necessary

// Get weekly average temperature and weight
exports.getWeeklyAverages = async (req, res) => {
  try {
    const data = await Bin.aggregate([
      {
        $project: {
          dayOfWeek: { $dayOfWeek: "$createdAt" }, // 1 = Sunday, ..., 7 = Saturday
          temperature: 1,
          weight: 1,
        },
      },
      {
        $group: {
          _id: "$dayOfWeek",
          avgTemperature: { $avg: "$temperature" },
          avgWeight: { $avg: "$weight" },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by day of the week
      },
    ]);

    // Convert numeric day to readable names
    const dayMapping = {
      1: "Sunday",
      2: "Monday",
      3: "Tuesday",
      4: "Wednesday",
      5: "Thursday",
      6: "Friday",
      7: "Saturday",
    };

    const formattedData = data.map((item) => ({
      day: dayMapping[item._id],
      avgTemperature: item.avgTemperature.toFixed(2),
      avgWeight: item.avgWeight.toFixed(2),
    }));

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching weekly averages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
