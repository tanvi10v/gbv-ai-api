import fs from 'fs';
import path from 'path';
import natural from 'natural';

const classifier = new natural.BayesClassifier();
const dataPath = path.join(process.cwd(), 'data', 'training_data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

data.forEach((item) => {
  classifier.addDocument(item.text, item.category);
});

classifier.train();

const modelPath = path.join(process.cwd(), 'model', 'classifier.json');
classifier.save(modelPath, (err) => {
  if (err) {
    console.error('Error saving classifier:', err);
  } else {
    console.log('Classifier saved successfully.');
  }
});
