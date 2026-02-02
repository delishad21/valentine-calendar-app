<template>
  <Transition name="debug">
    <div v-if="visible" class="debug-overlay" :class="levelClass">
      <div class="debug-header">
        <span class="debug-icon">⚠️</span>
        <span class="debug-title">System Debug</span>
      </div>

      <div class="debug-messages">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          class="debug-message"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <span class="debug-prefix">&gt;</span>
          <span class="debug-text">{{ msg }}</span>
        </div>
      </div>

      <!-- Actions removed - use modal buttons instead -->
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  level: {
    type: Number,
    default: 1 // 1 = warning, 2 = error, 3 = critical
  },
  messages: {
    type: Array,
    default: () => []
  },
  showActions: {
    type: Boolean,
    default: true
  },
  continueText: {
    type: String,
    default: 'Continue'
  }
})

defineEmits(['back', 'continue'])

const levelClass = computed(() => ({
  'level-warning': props.level === 1,
  'level-error': props.level === 2,
  'level-critical': props.level === 3
}))
</script>

<style scoped>
.debug-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 1200px;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 40px;
  font-family: 'Courier New', monospace;
  color: #00ff00;
  z-index: 100;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  pointer-events: none;
}

.level-warning {
  border-color: rgba(255, 193, 7, 0.3);
  color: #ffc107;
}

.level-error {
  border-color: rgba(255, 87, 34, 0.3);
  color: #ff5722;
}

.level-critical {
  border-color: rgba(244, 67, 54, 0.5);
  color: #f44336;
  animation: critical-pulse 2s ease-in-out infinite;
}

@keyframes critical-pulse {
  0%, 100% {
    box-shadow: 0 8px 32px rgba(244, 67, 54, 0.3);
  }
  50% {
    box-shadow: 0 8px 32px rgba(244, 67, 54, 0.6);
  }
}

.debug-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.debug-icon {
  font-size: 24px;
}

.debug-title {
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.debug-messages {
  margin-bottom: 16px;
}

.debug-message {
  display: flex;
  gap: 12px;
  margin: 10px 0;
  font-size: 18px;
  line-height: 1.6;
  opacity: 0;
  animation: debug-line-appear 0.3s ease forwards;
}

.debug-text {
  flex: 1;
  overflow: hidden;
  animation: typing 1.5s steps(50) forwards;
}

@keyframes typing {
  from {
    max-width: 0;
  }
  to {
    max-width: 100%;
  }
}

@keyframes debug-line-appear {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.debug-prefix {
  color: inherit;
  opacity: 0.7;
  flex-shrink: 0;
}

.debug-actions {
  display: flex;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.debug-btn {
  flex: 1;
  padding: 8px 16px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid currentColor;
  background: transparent;
  color: inherit;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.debug-btn:hover {
  background: currentColor;
  color: black;
}

.debug-btn-back {
  opacity: 0.8;
}

/* Debug transition */
.debug-enter-active,
.debug-leave-active {
  transition: all 0.3s ease;
}

.debug-enter-from,
.debug-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .debug-overlay {
    margin: 16px auto;
    width: 95%;
    padding: 16px;
  }

  .debug-message {
    font-size: 11px;
  }

  .debug-btn {
    padding: 6px 12px;
    font-size: 11px;
  }
}
</style>
