import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight request
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { count, categories } = req.body;

    if (!count || typeof count !== "number" || count <= 0) {
      return res.status(400).json({ error: "count must be a positive number" });
    }

    if (!Array.isArray(categories) || categories.length === 0) {
      return res
        .status(400)
        .json({ error: "categories must be a non-empty array of strings" });
    }

    const dataPath = path.join(process.cwd(), "data", "training_data.json");

    console.log("Reading file from:", dataPath); // Debug log

    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    const filteredData = categories.flatMap((category) =>
      data.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      )
    );

    if (filteredData.length === 0) {
      return res
        .status(404)
        .json({ error: "No scenarios found for the specified categories." });
    }

    const shuffled = filteredData.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    const actionPrompts = [
      "What will you do? (Pick One)",
      "How will you respond?",
      "What action would you take?",
    ];

    const result = selected.map((item, index) => {
      const actionText =
        actionPrompts[Math.floor(Math.random() * actionPrompts.length)];

      return {
        level: index + 1,
        scenarioText: item.text,
        actionText,
        supportiveText: item.supportiveText,
        unSupportiveText: item.unSupportiveText,
      };
    });

    res.status(200).json(result);
  } catch (err) {
    console.error("Server error:", err); // Log full error
    return res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
}
