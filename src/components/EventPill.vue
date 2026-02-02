<template>
  <div class="event-pill-wrapper" :class="{ 'breaking': breaking }">
    <div class="event-pill left-half" :class="{ faded: faded }" :style="pillStyle">
      <span class="icon">{{ event.icon }}</span>
      <span class="label">{{ breaking ? event.label.substring(0, Math.ceil(event.label.length / 2)) : event.label }}</span>
    </div>
    <div class="event-pill right-half" :class="{ faded: faded }" :style="pillStyle">
      <span class="label">{{ event.label.substring(Math.ceil(event.label.length / 2)) }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  faded: {
    type: Boolean,
    default: false
  },
  breaking: {
    type: Boolean,
    default: false
  }
})

const pillStyle = computed(() => ({
  backgroundColor: props.event.color || '#FFB6C1',
  borderColor: props.event.special ? '#FF1493' : 'transparent',
  borderWidth: props.event.special ? '2px' : '0'
}))
</script>

<style scoped>
.event-pill-wrapper {
  position: relative;
  margin: 4px 0;
}

.event-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
  border-style: solid;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: normal;
  word-wrap: break-word;
  min-height: 28px;
}

.event-pill-wrapper:not(.breaking) .event-pill {
  display: inline-flex;
}

.event-pill-wrapper:not(.breaking) .right-half {
  display: none;
}

.event-pill-wrapper.breaking {
  position: relative;
  height: 35px;
}

.event-pill-wrapper.breaking .event-pill {
  position: absolute;
  top: 0;
}

.event-pill-wrapper.breaking .left-half {
  left: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  animation: break-fall-left 1.8s cubic-bezier(0.6, 0, 0.8, 1) forwards;
}

.event-pill-wrapper.breaking .right-half {
  right: 0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  animation: break-fall-right 1.8s cubic-bezier(0.6, 0, 0.8, 1) forwards;
}

@keyframes break-fall-left {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  20% {
    transform: translate(-10px, 0) rotate(-5deg);
  }
  100% {
    transform: translate(-200px, 600px) rotate(-180deg);
    opacity: 0;
    filter: blur(2px);
  }
}

@keyframes break-fall-right {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  20% {
    transform: translate(10px, 0) rotate(5deg);
  }
  100% {
    transform: translate(200px, 600px) rotate(180deg);
    opacity: 0;
    filter: blur(2px);
  }
}

.event-pill.faded {
  opacity: 0.3;
  filter: grayscale(0.6);
  transform: scale(0.95);
}

.icon {
  font-size: 14px;
  flex-shrink: 0;
}

.label {
  flex: 1;
  min-width: 0;
  word-break: break-word;
}

@media (max-width: 768px) {
  .event-pill {
    font-size: 11px;
    padding: 4px 8px;
    gap: 4px;
  }

  .icon {
    font-size: 12px;
  }
}
</style>
