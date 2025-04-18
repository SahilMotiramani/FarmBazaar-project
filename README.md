# 🌾 FarmBazaar - Blockchain-Powered Contract Farming Marketplace

## 📌 Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [AI & Blockchain Integration](#ai--blockchain-integration)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Future Scope](#future-scope)
- [Team](#team)
- [License](#license)

---

## 🧠 About

**FarmBazaar** is a decentralized contract farming platform that bridges the gap between farmers and buyers by enabling **secure advance crop deals** before the harvest season using **blockchain smart contracts**. It empowers farmers with **AI-driven price prediction**, **yield estimation**, **multilingual chatbot assistance**, and **verified KYC assurance**.

---

## 🚀 Features

- 🔐 **Farmer KYC verification** for trusted listings
- 🪙 **Smart contracts** for secure crop pre-booking
- 💰 **Advance payment lock system** on blockchain
- 📈 **AI-based crop price prediction**
- 🌱 **AI yield/production estimator**
- 🌍 **Multilingual support** with chatbot (Hindi, Marathi, etc.)
- 📋 **Admin dashboard** for managing KYC and listings
- 📊 Real-time analytics and PDF-based contract summaries

---

## 🧱 Tech Stack

### 🎨 Frontend
- React.js
- Tailwind CSS
- i18next (Localization)

### ⚙️ Backend
- Node.js
- Express.js
- Firebase Auth (Authentication)
- MongoDB (Crop & User Data)
- IPFS (File storage)

### 🔗 Blockchain
- Solidity (Smart Contracts)
- Hardhat / Remix IDE
- Web3.js or Ethers.js
- Polygon (Testnet/Mainnet)

### 🧠 AI Models
- Python (Flask/FastAPI)
- Decision Tree Regressor (Price Prediction)
- Decision Tree Classifier (Price Category)
- Yield Estimator (Custom Model)

---

## 🤖 AI & Blockchain Integration

| Feature              | Tech/Model Used                     |
|----------------------|-------------------------------------|
| Crop Price Prediction| DecisionTreeRegressor + Flask API  |
| Price Category       | DecisionTreeClassifier              |
| Yield Estimation     | Heuristic/ML Model + FastAPI        |
| Contract Farming     | Solidity + Smart Contracts          |
| Payment Verification | Smart Contract on Polygon Testnet   |

---

## 🛠️ Getting Started

### 1. Clone the Repository

git clone https://github.com/SahilMotiramani/FarmBazaar-project.git
cd FarmBazaar-project

### 2. Install Frontend & Backend

# Frontend
cd client
npm install

# Backend
cd ../server
npm install

### 3. Run Locally

# Start Backend
npm run dev

# Start Frontend
cd ../client
npm start


### 4. Deploy Smart Contract

cd blockchain
npx hardhat run scripts/deploy.js --network polygon-mumbai




## 📦 Project Structure


FarmBazaar/
│
├── frontend/             # React Frontend
│   └── src/
│       ├── pages/
│       ├── components/
│       └── hooks/       
│
├── backend/             # Node.js Backend API
│   └── routes/
│   └── controllers/
|   └── routes/
│   └── server.js
│
├── ai/                 # Python Flask/FastAPI for AI
│   └── model.pkl
│   └── app.py
│
├── blockchain/         # Solidity Smart Contracts
│   └── contracts/
│   └── scripts/
│
├── public/
└── README.md

---

## 📸 Screenshots

> ![image](https://github.com/user-attachments/assets/c3213259-e935-4dd6-8b5b-578a0e776cbc)


---

## 🔮 Future Scope

- 🛰️ Real-time weather integration via APIs
- 📦 Supply chain & delivery tracking
- 🌐 Oracle integration for delivery verification
- 📱 Android/iOS app via React Native or Flutter
- 🪪 Digital Farmer Credit Score based on history

---

## 👨‍💻 Creator -Sahil Motiramani

- **Sahil Motiramani** – Full Stack Dev, Blockchain & AI


---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

> Made with ❤️ by Sahil Motiramani 

