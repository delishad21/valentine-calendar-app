// ============================================
// CALENDAR CONFIGURATION
// ============================================
// Edit this file to customize your calendar entries!

export const calendarConfig = {
  month: 1, // February
  year: 2026,

  events: [
    // Week 1
    { day: 4, label: "loklok", icon: "🍢", color: "#FF69B4" }, // Wednesday
    { day: 7, label: "Stay", icon: "🛋️", color: "#DDA0DD" }, // Saturday
    { day: 8, label: "Terraria", icon: "🎮", color: "#FFB6C1" }, // Sunday

    // Week 2
    { day: 11, label: "steak", icon: "🥩", color: "#FF69B4" }, // Wednesday
    { day: 14, label: "Us 💗", icon: "💗", color: "#FF1493", special: true }, // Saturday Valentine's Day - special!
    { day: 15, label: "Chill", icon: "😌", color: "#FFB6C1" }, // Sunday

    // Week 3
    { day: 18, label: "bingchilling", icon: "🍨", color: "#FF69B4" }, // Wednesday
    { day: 21, label: "Walk", icon: "🚶", color: "#DDA0DD" }, // Saturday
    { day: 22, label: "luohanguo", icon: "🍇", color: "#FFB6C1" }, // Sunday

    // Week 4
    { day: 25, label: "pasta", icon: "🍝", color: "#FF69B4" }, // Wednesday
    { day: 28, label: "ween birthday", icon: "☁️", color: "#DDA0DD" }, // Saturday
  ],

  specialEventDay: 14,
}


// ============================================
// TOY ASSET CONFIGURATION
// ============================================
// Place your toy images in /public/toys/ folder
// Name them exactly as specified below

export const toyAssets = {
  toyA: {
    happy: "/toys/toyA_happy.png",
    confused: "/toys/toyA_confused.png",
    worried: "/toys/toyA_worried.png",
    sad: "/toys/toyA_sad.png",
  },
  toyB: {
    happy: "/toys/toyB_happy.png",
    confused: "/toys/toyB_confused.png",
    worried: "/toys/toyB_worried.png",
    sad: "/toys/toyB_sad.png",
  }
}

// ============================================
// APP TEXT CONFIGURATION
// ============================================
// Customize the text that appears throughout the app

export const appText = {
  intro: {
    title: "A Special Question...",
    subtitle: "Something important is waiting for you",
    buttonText: "Continue",
  },

  ask: {
    question: "Will you be my Valentine?",
    yesButton: "Yes 💖",
    noButton: "No",
  },

  finalAsk: {
    message: "Everything works better like this.",
    question: "Will you be my Valentine?",
    yesButton: "Yes 💖",
    noButton: "No (take me back)",
  },

  celebration: {
    message: "Yay 💘",
    subtitle: "I love you very much!",
  },

  debugMessages: {
    no1: [
      "WARNING: Event 'Special Day' not found",
      "Attempting recovery...",
      "Recovery attempt failed",
    ],
    no2: [
      "ERROR: recurring events removed",
      "Calendar integrity compromised",
      "Rollback available",
    ],
    no3: [
      "INFO: emotional consistency check failed",
      "SoftToySync=false",
      "Rollback recommended",
    ],
  }
}
