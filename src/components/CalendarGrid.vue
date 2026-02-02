<template>
  <div class="calendar-grid" :class="{
    desaturated: desaturated,
    shake: shake,
    falling: falling,
    reassembling: reassembling,
    'fade-in': fadeIn
  }">
    <div class="calendar-header">
      <div class="toy-slot toy-slot-left">
        <img v-if="showToysInHeader && toyAImage" :src="toyAImage" alt="Toy A" class="header-toy" />
      </div>
      <h2 class="month-title">{{ monthName }} {{ year }}</h2>
      <div class="toy-slot toy-slot-right">
        <img v-if="showToysInHeader && toyBImage" :src="toyBImage" alt="Toy B" class="header-toy" />
      </div>
    </div>

    <!-- Day headers -->
    <div class="weekday-headers">
      <div
        v-for="day in weekdays"
        :key="day"
        class="weekday-header"
      >
        {{ day }}
      </div>
    </div>

    <!-- Calendar grid -->
    <div class="days-grid">
      <DayCell
        v-for="(cell, index) in calendarCells"
        :key="`day-${cell.day}`"
        :ref="el => setCellRef(cell.day, el)"
        :day="cell.day"
        :dayNumber="cell.dayNumber"
        :events="getEventsForDay(cell.day)"
        :isToday="cell.isToday"
        :isWeekend="cell.isWeekend"
        :isOtherMonth="cell.isOtherMonth"
        :falling="falling"
        :reassembling="reassembling"
        :index="index"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import DayCell from './DayCell.vue'

const props = defineProps({
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  events: {
    type: Array,
    default: () => []
  },
  desaturated: {
    type: Boolean,
    default: false
  },
  shake: {
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
  fadeIn: {
    type: Boolean,
    default: false
  },
  toyAImage: {
    type: String,
    default: ''
  },
  toyBImage: {
    type: String,
    default: ''
  },
  showToysInHeader: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['cell-refs-ready'])

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const cellRefs = ref({})

const monthName = computed(() => {
  const date = new Date(props.year, props.month, 1)
  return date.toLocaleDateString('en-US', { month: 'long' })
})

const calendarCells = computed(() => {
  const cells = []
  const firstDay = new Date(props.year, props.month, 1)
  const lastDay = new Date(props.year, props.month + 1, 0)
  const firstDayOfWeek = firstDay.getDay()
  const daysInMonth = lastDay.getDate()

  // Previous month days
  const prevMonthLastDay = new Date(props.year, props.month, 0).getDate()
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    cells.push({
      day: prevMonthLastDay - i,
      dayNumber: prevMonthLastDay - i,
      isOtherMonth: true,
      isWeekend: cells.length % 7 === 0 || cells.length % 7 === 6,
      isToday: false
    })
  }

  // Current month days
  const today = new Date()
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(props.year, props.month, day)
    const isToday =
      today.getDate() === day &&
      today.getMonth() === props.month &&
      today.getFullYear() === props.year

    cells.push({
      day,
      dayNumber: day,
      isOtherMonth: false,
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      isToday
    })
  }

  // Next month days to fill the grid
  const remainingCells = 7 - (cells.length % 7)
  if (remainingCells < 7) {
    for (let day = 1; day <= remainingCells; day++) {
      cells.push({
        day: day,
        dayNumber: day,
        isOtherMonth: true,
        isWeekend: cells.length % 7 === 0 || cells.length % 7 === 6,
        isToday: false
      })
    }
  }

  return cells
})

function getEventsForDay(day) {
  return props.events.filter(e => e.day === day && !e.isOtherMonth)
}

function setCellRef(day, el) {
  if (el && el.cellRef) {
    cellRefs.value[day] = el.cellRef
  }
}

onMounted(() => {
  // Emit cell refs after mount so parent can position toys
  setTimeout(() => {
    emit('cell-refs-ready', cellRefs.value)
  }, 100)
})

onUnmounted(() => {
  cellRefs.value = {}
})

defineExpose({ cellRefs })
</script>

<style scoped>
.calendar-grid {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 30px;
  transition: filter 0.4s ease;
}

.calendar-grid.desaturated {
  filter: saturate(0.3) brightness(0.95);
}

.calendar-grid.shake {
  animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both;
}

.calendar-grid.fade-in {
  animation: fadeIn 1.5s ease-in forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
    box-shadow: none;
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translate(-8px, 0) rotate(-1deg);
    box-shadow: 0 0 30px rgba(255, 20, 147, 0.5);
  }
  20%, 40%, 60%, 80% {
    transform: translate(8px, 0) rotate(1deg);
    box-shadow: 0 0 30px rgba(255, 20, 147, 0.5);
  }
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
  position: relative;
}

.toy-slot {
  width: 100px;
  height: 100px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-toy {
  width: 100px;
  height: 100px;
  object-fit: contain;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  transition: all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.month-title {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  text-align: center;
}

.weekday-headers {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 8px;
}

.weekday-header {
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  padding: 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

@media (max-width: 768px) {
  .calendar-grid {
    padding: 16px;
  }

  .month-title {
    font-size: 22px;
  }

  .weekday-header {
    font-size: 11px;
    padding: 6px 0;
  }

  .days-grid {
    gap: 6px;
  }
}
</style>
