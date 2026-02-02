// State machine configuration
// Maps each app state to its visual configuration

export const stateConfig = {
  intro: {
    showCalendar: false,
    showToys: true,
    toysPosition: 'center',
    toysExpression: 'happy',
    toysTogether: true,
    eventsVisible: [],
    eventsFaded: [],
    debugLevel: 0,
  },

  calendar_normal: {
    showCalendar: true,
    showToys: true,
    toysPosition: 'sides', // Toys split to left and right
    toysExpression: 'happy',
    toysTogether: false,
    eventsVisible: 'all',
    eventsFaded: [],
    debugLevel: 0,
    calendarFadeIn: true,
  },

  ask: {
    showCalendar: true,
    showToys: true,
    toysPosition: 'sides',
    toysExpression: 'happy',
    toysTogether: false,
    eventsVisible: 'all',
    eventsFaded: [],
    debugLevel: 0,
  },

  no_1_wed_removed: {
    showCalendar: true,
    showToys: true,
    toysPosition: 'sides',
    toysExpression: 'confused',
    toysTogether: false,
    eventsVisible: 'except-special', // Special event removed
    eventsFaded: [],
    debugLevel: 1,
  },

  no_2_weekend_fade: {
    showCalendar: true,
    showToys: true,
    toysPosition: 'sides',
    toysExpression: 'worried',
    toysTogether: false,
    eventsVisible: 'limited', // Only 2-3 events remain
    eventsFaded: [], // Some events faded
    debugLevel: 2,
  },

  no_3_empty: {
    showCalendar: true,
    showToys: true,
    toysPosition: 'sides',
    toysExpression: 'sad',
    toysTogether: false,
    eventsVisible: 'minimal', // Almost all gone
    eventsFaded: [],
    debugLevel: 3,
    calendarDesaturated: true,
  },

  calendar_broken: {
    showCalendar: false, // Hide calendar completely when broken
    showToys: false, // Toys disappear with calendar
    toysPosition: 'sides',
    toysExpression: 'sad',
    toysTogether: false,
    eventsVisible: 'minimal',
    eventsFaded: [],
    debugLevel: 0,
    calendarDesaturated: true,
  },

  rewind: {
    showCalendar: false, // Don't show calendar - let reassembling flag control it
    showToys: true,
    toysPosition: 'sides',
    toysExpression: 'happy',
    toysTogether: false,
    eventsVisible: 'all',
    eventsFaded: [],
    debugLevel: 0,
  },

  final_ask: {
    showCalendar: true,
    showToys: true,
    toysPosition: 'sides',
    toysExpression: 'happy',
    toysTogether: true,
    eventsVisible: 'all',
    eventsFaded: [],
    debugLevel: 0,
    enhanced: true,
  },

  celebration: {
    showCalendar: true,
    showToys: true,
    toysPosition: 'special-event',
    toysExpression: 'happy',
    toysTogether: true,
    eventsVisible: 'all',
    eventsFaded: [],
    debugLevel: 0,
    showConfetti: true,
  }
}

// Helper to get visible events based on state
export function getVisibleEvents(state, allEvents) {
  const config = stateConfig[state]

  if (!config) return allEvents

  const visibility = config.eventsVisible

  if (visibility === 'all') {
    return allEvents.map(e => ({ ...e, visible: true, faded: false }))
  }

  if (visibility === 'except-special') {
    return allEvents.map(e => ({
      ...e,
      visible: !e.special,
      faded: false
    }))
  }

  if (visibility === 'limited') {
    // Keep first 3 non-special events, gradually remove them
    let kept = 0
    return allEvents.map(e => {
      if (e.special) return { ...e, visible: false, faded: false }
      kept++
      if (kept <= 3) {
        return { ...e, visible: true, faded: false }
      }
      return { ...e, visible: false, faded: false }
    })
  }

  if (visibility === 'minimal') {
    // Keep only 1 event, faded
    let kept = 0
    return allEvents.map(e => {
      kept++
      return { ...e, visible: kept === 1, faded: kept === 1 }
    })
  }

  return allEvents.map(e => ({ ...e, visible: true, faded: false }))
}
