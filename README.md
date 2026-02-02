# Valentine's Day Question App

A web app that asks "Will you be my Valentine?".

Selecting "no" causes calendar events to disappear and stickers to change expressions. Shows debug overlay with warnings. Selecting "yes" shows a celebration screen.


## Features

- **Full month calendar** with customizable events
- **Cute stickers** that react to user choices (4 expressions each)
- **Debug overlay** that appears when you say "no"
- **Rewind animation** to restore everything
- **Celebration screen** with confetti when they say "yes"
- **Fully responsive** design

https://github.com/user-attachments/assets/5f693662-ffe9-4310-aa33-5f33a4524c65

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
npm run preview
```

## Customization Guide

### Where to Edit Calendar Entries

**File:** [src/config/appConfig.js](src/config/appConfig.js)

Edit the `events` array to customize your calendar:

```javascript
events: [
  {
    day: 14, // Day of the month (1-31)
    label: "Us 💗", // Event label
    icon: "💗", // Icon/emoji
    color: "#FF1493", // Background color
    special: true, // Mark as special (where toys attach)
  },
  {
    day: 18,
    label: "Dinner Date",
    icon: "🍜",
    color: "#FFB6C1",
  },
  // Add more events...
];
```

**Default events included:**

- Coffee Date (Day 3)
- Movie Night (Day 5)
- Dinner Plans (Day 11)
- Us 💗 (Day 14) - **Special Event**
- Lunch Together (Day 18)
- Hangout (Day 21)
- Game Night (Day 25)
- Brunch Date (Day 28)

### Where to Upload Sticker Assets

**Folder:** [public/toys/](public/toys/)

Replace the placeholder SVG files with your custom stickers:

**Required files (8 total):**

```
public/toys/
├── toyA_happy.png
├── toyA_confused.png
├── toyA_worried.png
├── toyA_sad.png
├── toyB_happy.png
├── toyB_confused.png
├── toyB_worried.png
└── toyB_sad.png
```

**Image specs:**

- Format: PNG with transparent background
- Size: 1024×1024 px (recommended)
- Keep character within 90% of canvas

### Customizing Text & Messages

**File:** [src/config/appConfig.js](src/config/appConfig.js)

## Tech Stack

- **Vue 3** (Composition API)
- **Vite** (Build tool)
- **Pure CSS** (No external animation libraries needed)
