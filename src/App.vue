<template>
  <div id="app">
    <!-- Intro Screen -->
    <IntroScreen
      v-if="appState === 'intro'"
      @continue="handleIntroComplete"
    />

    <!-- Main App Shell (Calendar + Overlays) -->
    <div
      v-else
      class="app-shell"
      :class="{ 'state-celebration': appState === 'celebration' }"
    >
      <div class="content-container">
        <div class="main-layout">
          <!-- Calendar -->
          <div class="calendar-wrapper" :style="{ opacity: calendarVisible ? 1 : 0, transition: 'opacity 0.3s' }">
            <CalendarGrid
              v-if="showCalendar"
              :month="calendarConfig.month"
              :year="calendarConfig.year"
              :events="currentEvents"
              :desaturated="currentStateConfig.calendarDesaturated"
              :shake="shakeCalendar"
              :falling="calendarFalling"
              :reassembling="calendarReassembling"
              :fade-in="appState === 'calendar_normal'"
              :toy-a-image="currentStateConfig.toysPosition === 'sides' ? toyAssets.toyA[currentStateConfig.toysExpression] : ''"
              :toy-b-image="currentStateConfig.toysPosition === 'sides' ? toyAssets.toyB[currentStateConfig.toysExpression] : ''"
              :show-toys-in-header="currentStateConfig.toysPosition === 'sides'"
              @cell-refs-ready="handleCellRefsReady"
            />

            <!-- Debug Overlay - shows ON TOP of calendar during No presses -->
            <DebugOverlay
              v-if="showDebugMessages"
              :visible="true"
              :level="debugLevel"
              :messages="debugMessages"
              :show-actions="false"
              :continue-text="debugContinueText"
              @back="handleRewind"
              @continue="handleDebugContinue"
            />
          </div>

          <!-- Question Modal Area - to the right -->
          <div class="modal-area">
            <!-- Ask Modal - appears on ask and after each no -->
            <AskModal
              v-if="showAskModal"
              :visible="true"
              :message="currentAskMessage"
              :question="currentAskQuestion"
              :yes-text="currentYesText"
              :no-text="currentNoText"
              :enhanced="appState === 'final_ask'"
              @yes="handleYes"
              @no="handleNo"
            />

            <!-- Rewind Modal - appears after calendar breaks -->
            <AskModal
              v-if="showRewindModal"
              :visible="true"
              message="Everything fell apart..."
              question="Do you want to rewind time?"
              yes-text="Yes, please! 🕐"
              :hide-no="true"
              @yes="handleRewindConfirm"
            />
          </div>
        </div>

        <!-- Toys Overlay - only for center position -->
        <ToysOverlay
          v-if="currentStateConfig.toysPosition === 'center'"
          :position="currentStateConfig.toysPosition"
          :expression="currentStateConfig.toysExpression"
          :together="currentStateConfig.toysTogether"
          :visible="currentStateConfig.showToys"
          :falling="calendarFalling"
          :reassembling="calendarReassembling"
          :cell-refs="cellRefs"
          :special-event-day="calendarConfig.specialEventDay"
        />
      </div>

      <!-- Celebration -->
      <CelebrationOverlay
        :visible="appState === 'celebration'"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import IntroScreen from './components/IntroScreen.vue'
import CalendarGrid from './components/CalendarGrid.vue'
import ToysOverlay from './components/ToysOverlay.vue'
import AskModal from './components/AskModal.vue'
import DebugOverlay from './components/DebugOverlay.vue'
import CelebrationOverlay from './components/CelebrationOverlay.vue'
import { calendarConfig, appText, toyAssets } from './config/appConfig'
import { stateConfig, getVisibleEvents } from './config/stateConfig'

// State management
const appState = ref('intro')
const cellRefs = ref({})
const previousState = ref(null)
const shakeCalendar = ref(false)
const noCount = ref(0)
const showingDebug = ref(false)
const calendarFalling = ref(false)
const calendarReassembling = ref(false)
const showRewindModal = ref(false)
const breakingEvents = ref(new Set())

// State configuration
const currentStateConfig = computed(() => stateConfig[appState.value] || {})

// Calendar configuration
const showCalendar = computed(() => {
  // Always show calendar except on intro - even when broken (to maintain DOM state)
  return appState.value !== 'intro'
})

const calendarVisible = computed(() => {
  // Hide visually when showing rewind modal (but keep in DOM)
  if (showRewindModal.value) return false
  // Otherwise always visible
  return true
})

const currentEvents = computed(() => {
  const events = getVisibleEvents(appState.value, calendarConfig.events)
  // Add breaking flag to events that are being removed
  return events.map(event => ({
    ...event,
    breaking: breakingEvents.value.has(event.day + '-' + event.label)
  }))
})

// Debug configuration
const debugLevel = computed(() => currentStateConfig.value.debugLevel || 0)

const debugMessages = computed(() => {
  if (appState.value === 'no_1_wed_removed') {
    return appText.debugMessages.no1
  }
  if (appState.value === 'no_2_weekend_fade') {
    return appText.debugMessages.no2
  }
  if (appState.value === 'no_3_empty') {
    return appText.debugMessages.no3
  }
  return []
})

const showDebugActions = computed(() => {
  return ['no_1_wed_removed', 'no_2_weekend_fade', 'no_3_empty'].includes(appState.value)
})

const showAskModal = computed(() => {
  return ['ask', 'no_1_wed_removed', 'no_2_weekend_fade', 'no_3_empty', 'final_ask'].includes(appState.value) && !showingDebug.value
})

const showDebugMessages = computed(() => {
  return showingDebug.value && debugLevel.value > 0
})

const currentAskMessage = computed(() => {
  if (appState.value === 'final_ask') return appText.finalAsk.message
  if (noCount.value === 1) return "Are you sure about that?"
  if (noCount.value === 2) return "Things are breaking... Please?"
  if (noCount.value === 3) return "Last chance..."
  return ''
})

const currentAskQuestion = computed(() => {
  if (appState.value === 'final_ask') return appText.finalAsk.question
  if (noCount.value === 1) return "Will you be my Valentine?"
  if (noCount.value === 2) return "Pretty please?"
  if (noCount.value === 3) return "Won't you reconsider?"
  return appText.ask.question
})

const currentYesText = computed(() => {
  if (appState.value === 'final_ask') return appText.finalAsk.yesButton
  if (noCount.value >= 2) return "Yes! 💖"
  return appText.ask.yesButton
})

const currentNoText = computed(() => {
  if (appState.value === 'final_ask') return appText.finalAsk.noButton
  if (noCount.value === 3) return "NO!"
  if (noCount.value >= 1) return "Still no"
  return appText.ask.noButton
})

const debugContinueText = computed(() => {
  if (appState.value === 'no_3_empty') return 'Okay...'
  return 'Continue'
})

// State transitions
function handleIntroComplete() {
  appState.value = 'calendar_normal'
  setTimeout(() => {
    appState.value = 'ask'
  }, 1000)
}

function handleYes() {
  appState.value = 'celebration'
}

function handleNo() {
  previousState.value = appState.value
  noCount.value++

  // Hide modal immediately
  showingDebug.value = true

  // Trigger shake animation
  shakeCalendar.value = true
  setTimeout(() => {
    shakeCalendar.value = false
  }, 600)

  // Mark current visible events as breaking
  const markEventsBreaking = () => {
    const currentVisibleEvents = getVisibleEvents(appState.value, calendarConfig.events)
    const nextState = appState.value === 'ask' ? 'no_1_wed_removed' :
                     appState.value === 'no_1_wed_removed' ? 'no_2_weekend_fade' :
                     appState.value === 'no_2_weekend_fade' ? 'no_3_empty' : null

    if (nextState) {
      const nextVisibleEvents = getVisibleEvents(nextState, calendarConfig.events)
      const nextEventKeys = new Set(nextVisibleEvents.filter(e => e.visible).map(e => e.day + '-' + e.label))

      // Only mark events that are visible now but won't be visible in next state
      currentVisibleEvents.forEach(event => {
        if (event.visible && !nextEventKeys.has(event.day + '-' + event.label)) {
          breakingEvents.value.add(event.day + '-' + event.label)
        }
      })
    }
  }

  // Clear breaking events after animation
  const clearBreakingEvents = () => {
    setTimeout(() => {
      breakingEvents.value.clear()
    }, 2000) // Wait for breaking animation to complete
  }

  // First transition to the next state
  if (appState.value === 'ask') {
    markEventsBreaking()
    setTimeout(() => {
      appState.value = 'no_1_wed_removed'
      clearBreakingEvents()
      // Show debug messages for longer
      setTimeout(() => {
        showingDebug.value = false
      }, 5000)
    }, 2000) // Wait for event breaking animation (1.8s) + buffer
  } else if (appState.value === 'no_1_wed_removed') {
    markEventsBreaking()
    setTimeout(() => {
      appState.value = 'no_2_weekend_fade'
      clearBreakingEvents()
      setTimeout(() => {
        showingDebug.value = false
      }, 5000)
    }, 2000) // Wait for event breaking animation (1.8s) + buffer
  } else if (appState.value === 'no_2_weekend_fade') {
    markEventsBreaking()
    setTimeout(() => {
      appState.value = 'no_3_empty'
      clearBreakingEvents()
      setTimeout(() => {
        showingDebug.value = false
      }, 5000)
    }, 2000) // Wait for event breaking animation (1.8s) + buffer
  } else if (appState.value === 'no_3_empty') {
    // Trigger calendar fall apart
    setTimeout(() => {
      calendarFalling.value = true
      setTimeout(() => {
        appState.value = 'calendar_broken'
        showRewindModal.value = true
      }, 2300) // Wait for full calendar fall animation (2s) + buffer
    }, 500)
  } else if (appState.value === 'final_ask') {
    // If they say no to final ask, fall apart again
    setTimeout(() => {
      calendarFalling.value = true
      setTimeout(() => {
        appState.value = 'calendar_broken'
        showRewindModal.value = true
      }, 2300) // Wait for full calendar fall animation (2s) + buffer
    }, 500)
  }
}

function handleDebugContinue() {
  // Debug overlay "Continue" is removed - user must click in modal
}

function handleRewind() {
  // Trigger rewind animation
  appState.value = 'rewind'

  // After rewind animation, go to final_ask
  setTimeout(() => {
    appState.value = 'final_ask'
  }, 800)
}

function handleRewindConfirm() {
  // Hide modal
  showRewindModal.value = false

  // Small delay to let modal disappear
  setTimeout(() => {
    // Trigger reassembly WITHOUT changing state - keep calendar_broken state
    calendarFalling.value = false
    calendarReassembling.value = true
    // Don't change state yet - this prevents calendar from updating with new events
  }, 300)

  // After reassembly animation completes, reset to the beginning (ask state)
  setTimeout(() => {
    calendarReassembling.value = false
    // Reset to beginning of state machine
    noCount.value = 0
    appState.value = 'ask'
    showingDebug.value = false
    breakingEvents.value.clear()
  }, 2600)
}
// Watch for rewind state to trigger animations
watch(appState, (newState, oldState) => {
  if (newState === 'rewind') {
    // Rewind animation logic is handled by components
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  width: 100%;
  min-height: 100vh;
}

.app-shell {
  position: relative;
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #fef3f8 0%, #f8f4fe 100%);
  transition: all 0.6s ease;
}

.app-shell.state-celebration {
  background: linear-gradient(135deg, #ffe4ef 0%, #f0e4fe 100%);
}

.content-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.main-layout {
  display: flex;
  flex-direction: row;
  gap: 40px;
  align-items: flex-start;
  width: 100%;
}

.calendar-wrapper {
  position: relative;
  flex: 1;
}

.modal-area {
  width: 400px;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  align-self: center;
}

@media (max-width: 768px) {
  .app-shell {
    padding: 20px 10px;
  }

  .main-layout {
    flex-direction: column;
  }

  .modal-area {
    width: 100%;
  }
}
</style>
