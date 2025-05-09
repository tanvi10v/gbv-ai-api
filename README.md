# GBV-AI-API

This repository hosts an **AI-based API** designed to support the detection, analysis, or classification of Gender-Based Violence (GBV)-related content. It could be used in applications such as chatbots, reporting systems, or educational games to identify sensitive or relevant language patterns.

---

## 🧠 Features

- **Text Classification**: Uses Natural NLP Toolkit to detect GBV-related language.
- **API Endpoints**: RESTful endpoints for easy integration into web/mobile apps.
- **Scalable Architecture**: Designed for deployment on cloud platforms.
- **Privacy-First Design**: Ensures user anonymity and data protection.
- **Customizable Models**: Ability to retrain or fine-tune models based on regional dialects or cultural contexts.

---

## 🛠️ Technologies Used

- Node.js
- Vercel
- Natural NLP Toolkit

---

## 📥 How to Use

1. Clone the repository:
   ```bash
   git clone https://github.com/tanvi10v/gbv-ai-api.git 

2. Run in Terminal:
   ```bash
   npm install 

3. Run in Terminal to train the model:
   ```bash
   npm run train

4. Run in Terminal:
   ```bash
   npm run dev

5. Code will be up and running:
   ```bash
    > gbv-ai-api@1.0.0 dev
    > vercel dev
    Vercel CLI 41.7.2
    > NOTE: Requested port 3000 is already in use
    > Ready! Available at http://localhost:3001

4. Sample API Curl:
   ```bash
   curl 'https://gbv-ai-api.vercel.app/api/classify' \
    -H 'accept: */*' \
    -H 'accept-language: en-US,en;q=0.9,hi;q=0.8' \
    -H 'content-type: application/json' \
    -H 'origin: https://gbv-seven.vercel.app' \
    -H 'priority: u=1, i' \
    -H 'referer: https://gbv-seven.vercel.app/' \
    -H 'sec-ch-ua: "Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"' \
    -H 'sec-ch-ua-mobile: ?0' \
    -H 'sec-ch-ua-platform: "macOS"' \
    -H 'sec-fetch-dest: empty' \
    -H 'sec-fetch-mode: cors' \
    -H 'sec-fetch-site: cross-site' \
    -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36' \
    --data-raw '{"count":5,"categories":["digital abuse","workplace harassment","intimate partner violence","bystander intervention"]}'
