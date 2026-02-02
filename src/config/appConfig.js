// ============================================
// CALENDAR CONFIGURATION
// ============================================
// Edit this file to customize your calendar entries!

export const calendarConfig = {
  // Month to display (0 = January, 1 = February, etc.)
  month: 1, // February

  // Year to display
  year: 2026,

  // Events for the calendar (day is 1-based: 1 = 1st of the month)
  events: [
    // Week 1
    { day: 3, label: "Coffee Date", icon: "☕", color: "#FFB6C1" },
    { day: 5, label: "Movie Night", icon: "🎬", color: "#DDA0DD" },

    // Week 2
    { day: 11, label: "Dinner Plans", icon: "🍜", color: "#FF69B4" },
    { day: 14, label: "Us 💗", icon: "💗", color: "#FF1493", special: true }, // Valentine's Day - special!

    // Week 3
    { day: 18, label: "Lunch Together", icon: "🥗", color: "#FFB6C1" },
    { day: 21, label: "Hangout", icon: "🛋️", color: "#DDA0DD" },

    // Week 4
    { day: 25, label: "Game Night", icon: "🎮", color: "#BA55D3" },
    { day: 28, label: "Brunch Date", icon: "🥞", color: "#FFB6C1" },
  ],

  // The "special" event that toys will attach to initially
  // This should match the day of one of your events marked as special: true
  specialEventDay: 14, // Valentine's Day - where toys start
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
