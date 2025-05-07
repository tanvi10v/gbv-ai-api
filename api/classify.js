import fs from 'fs';
import path from 'path';
import natural from 'natural';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { count, category } = req.body;

  if (!count || typeof count !== 'number' || count <= 0) {
    return res.status(400).json({ error: 'count must be a positive number' });
  }

  if (!category || typeof category !== 'string') {
    return res.status(400).json({ error: 'category must be a string' });
  }

  const dataPath = path.join(process.cwd(), 'data', 'training_data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const filtered = data.filter((item) => item.category.toLowerCase() === category.toLowerCase());

  if (filtered.length === 0) {
    return res.status(404).json({ error: 'No scenarios found for the specified category.' });
  }

  const shuffled = filtered.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  const result = selected.map((item) => {
    let actionText = "What action would you take?";
    if (item.level === 1) actionText = "What will you do? (Pick One)";
    if (item.level === 2) actionText = "How will you respond?";

    return {
      level: item.level,
      scenarioText: item.text,
      actionText,
      supportiveText: item.supportiveText,
      unSupportiveText: item.unSupportiveText
    };
  });

  res.status(200).json(result);
}
