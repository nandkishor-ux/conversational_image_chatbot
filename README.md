# 💬 Conversational Image Recognition Chatbot

 A full-stack multimodal AI chatbot that lets users ask natural language questions about images — built from concept to working prototype in under 36 hours.

[![HTML](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-E34F26?logo=html5)]()
[![AI](https://img.shields.io/badge/AI-Multimodal-blueviolet)]()
[![Response Time](https://img.shields.io/badge/Avg%20Response-<3s-brightgreen)]()
[![Tested On](https://img.shields.io/badge/Tested%20On-COCO%202017%20(50%2B%20images)-blue)]()

---

## 📌 Project Overview

This project is a **multimodal conversational AI platform** designed with a futuristic, terminal-style interface. Users can upload or reference images and ask complex natural language questions — the AI engine responds with detailed insights about the visual content in real time.

Built as a complete prototype in **under 36 hours**, it handles object identification, color analysis, counting, and open-ended visual queries.

---

## ✨ Features

- 🖼️ **Image Understanding** — ask questions about any uploaded image
- 💬 **Conversational Interface** — multi-turn dialogue with context retention
- ⚡ **Fast Responses** — average response time under 3 seconds
- 🎨 **Terminal-style UI** — futuristic, dark-themed frontend
- 📡 **Async API calls** — non-blocking, seamless real-time chat experience
- ✅ **Validated on COCO 2017** — tested on 50+ diverse images

---

## 🔬 What I Did

- Designed a **dynamic frontend** using HTML, CSS, and JavaScript with asynchronous API calls
- Integrated a **multimodal AI engine** capable of processing image + text inputs simultaneously
- Validated performance across 50+ diverse images from the **COCO 2017 dataset**, covering:
  - Object identification
  - Color attribute queries
  - Object counting
  - Scene description
- Achieved consistent **<3 second average response time** across all test cases

---

## 🖥️ UI Preview

> Terminal-style dark interface with live chat and image panel

```
┌─────────────────────────────────────────────────────┐
│  🤖 VISION AI — Conversational Image Assistant      │
├─────────────────────────────────────────────────────┤
│  [Image Panel]         │  [Chat Window]             │
│                        │  You: How many people?     │
│  [Upload Image]        │  AI: I can see 3 people... │
│                        │  You: What are they doing? │
│                        │  AI: They appear to be...  │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Repository Structure

```
conversational_image_chatbot/
│
├── index.html          # Main UI layout
├── style.css           # Terminal-style dark theme
├── script.js           # Async API calls + chat logic
└── README.md
```

---

## ⚙️ Tech Stack

| Category | Tools |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| AI Engine | Multimodal Vision API |
| Async | Fetch API (async/await) |
| Testing | COCO 2017 Dataset (50+ images) |

---

## 🚀 How to Run

```bash
# 1. Clone the repository
git clone https://github.com/nandkishor-ux/conversational_image_chatbot.git
cd conversational_image_chatbot

# 2. Add your AI API key to script.js
# (Replace 'YOUR_API_KEY' with your actual key)

# 3. Open in browser
open index.html
# or simply double-click index.html
```

---

## 📊 Performance Validation

| Test Category | Images Tested | Result |
|---|---|---|
| Object Identification | 20+ | ✅ Accurate |
| Color Attribute Queries | 15+ | ✅ Accurate |
| Object Counting | 15+ | ✅ Accurate |
| **Avg Response Time** | All | **< 3 seconds** |

---

## 👤 Author

**Nand Kishor Kumar**
- GitHub: [@nandkishor-ux](https://github.com/nandkishor-ux)
- Email: nandkishor0720@gmail.com
