<template>
  <div
    class="day-cell"
    :class="{
      'is-today': isToday,
      'has-events': hasEvents,
      'is-weekend': isWeekend,
      'is-other-month': isOtherMonth,
      'falling': falling,
      'reassembling': reassembling
    }"
    :data-day="day"
    :style="falling ? fallStyle : (reassembling ? reassembleStyle : {})"
    ref="cellRef"
  >
    <div class="day-number">{{ dayNumber }}</div>

    <div class="events-container" v-if="hasEvents">
      <EventPill
        v-for="event in visibleEvents"
        :key="event.day + '-' + event.label"
        :event="event"
        :faded="event.faded"
        :breaking="event.breaking"
      />
    </div>

    <!-- Slot for toy overlay positioning -->
    <slot></slot>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import EventPill from './EventPill.vue'

const props = defineProps({
  day: {
    type: Number,
    required: true
  },
  dayNumber: {
    type: Number,
    required: true
  },
  events: {
    type: Array,
    default: () => []
  },
  isToday: {
    type: Boolean,
    default: false
  },
  isWeekend: {
    type: Boolean,
    default: false
  },
  isOtherMonth: {
    type: Boolean,
    default: false
  },
  falling: {
    type: Boolean,
    default: false
  },
  reassembling: {
    type: Boolean,
    default: false
  },
  index: {
    type: Number,
    default: 0
  }
})

const cellRef = ref(null)

const visibleEvents = computed(() =>
  props.events.filter(e => e.visible !== false)
)

const hasEvents = computed(() => visibleEvents.value.length > 0)

const fallStyle = computed(() => {
  const delay = props.index * 0.03
  const row = Math.floor(props.index / 7)
  const col = props.index % 7

  // More varied horizontal movement based on column
  const randomX = (col - 3.5) * 150 + (Math.random() - 0.5) * 200

  // Varied rotation based on position
  const randomRotate = (Math.random() - 0.5) * 720 + (col - 3.5) * 45

  // Varied vertical distance
  const randomY = 900 + Math.random() * 200

  return {
    animationDelay: `${delay}s`,
    '--random-x': `${randomX}px`,
    '--random-y': `${randomY}px`,
    '--random-rotate': `${randomRotate}deg`
  }
})

const reassembleStyle = computed(() => {
  const delay = props.index * 0.04
  const row = Math.floor(props.index / 7)
  const col = props.index % 7

  const randomX = (col - 3.5) * 150 + (Math.random() - 0.5) * 200
  const randomRotate = (Math.random() - 0.5) * 720 + (col - 3.5) * 45
  const randomY = 900 + Math.random() * 200

  return {
    animationDelay: `${delay}s`,
    '--random-x': `${randomX}px`,
    '--random-y': `${randomY}px`,
    '--random-rotate': `${randomRotate}deg`
  }
})
defineExpose({ cellRef })
</script>

<style scoped>
.day-cell {
  position: relative;
  min-height: 200px;
  padding: 18px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.day-cell.is-weekend {
  background: #fafafa;
}

.day-cell.is-other-month {
  opacity: 0.4;
  background: #f9fafb;
}

.day-cell.has-events {
  background: linear-gradient(135deg, #ffffff 0%, #fef3f8 100%);
}

.day-cell.is-today {
  border-color: #FF1493;
  border-width: 2px;
  box-shadow: 0 0 0 3px rgba(255, 20, 147, 0.1);
}

.day-cell.falling {
  animation: cell-fall 2s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;
  z-index: 100;
}

.day-cell.reassembling {
  animation: cell-reassemble 1.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  z-index: 100;
}

@keyframes cell-fall {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
    opacity: 1;
    filter: blur(0px);
  }
  20% {
    transform: translate(calc(var(--random-x, 0) * 0.1), -30px) rotate(calc(var(--random-rotate, 0deg) * 0.1)) scale(1.05);
    opacity: 1;
  }
  100% {
    transform: translate(var(--random-x, 0), var(--random-y, 800px)) rotate(var(--random-rotate, 0deg)) scale(0.5);
    opacity: 0;
    filter: blur(4px);
  }
}

@keyframes cell-reassemble {
  0% {
    transform: translate(var(--random-x, 0), var(--random-y, 800px)) rotate(var(--random-rotate, 0deg)) scale(0.5);
    opacity: 0;
    filter: blur(4px);
  }
  60% {
    opacity: 0.5;
  }
  80% {
    transform: translate(0, 0) rotate(0deg) scale(1.1);
    opacity: 1;
    filter: blur(0px);
  }
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
    opacity: 1;
    filter: blur(0px);
  }
}

.day-number {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 10px;
  text-align: right;
}

.events-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

/* Events container */
.events-container {
  position: relative;
  min-height: 40px;
}

@media (max-width: 768px) {
  .day-cell {
    min-height: 80px;
    padding: 6px;
  }

  .day-number {
    font-size: 12px;
    margin-bottom: 6px;
  }
}
</style>
