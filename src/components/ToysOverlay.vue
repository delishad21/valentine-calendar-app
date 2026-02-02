<template>
  <Transition name="toys-fade" mode="out-in">
    <div
      v-if="visible || falling || reassembling"
      class="toys-overlay"
      :class="[
        positionClass,
        { 'is-falling': falling, 'is-reassembling': reassembling }
      ]"
      :style="toysStyle"
    >
      <!-- Toy A -->
      <Transition name="toy-move" mode="out-in">
        <img
          :key="toyAImage"
          :src="toyAImage"
          alt="Toy A"
          class="toy toy-a"
          :class="{ 'toy-separated': !together, 'toy-sad': expression === 'sad' }"
          :style="toyAStyle"
        />
      </Transition>

      <!-- Toy B -->
      <Transition name="toy-move" mode="out-in">
        <img
          :key="toyBImage"
          :src="toyBImage"
          alt="Toy B"
          class="toy toy-b"
          :class="{ 'toy-separated': !together, 'toy-sad': expression === 'sad' }"
          :style="toyBStyle"
        />
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { toyAssets } from '../config/appConfig'

const props = defineProps({
  position: {
    type: String,
    default: 'header' // 'header', 'special-event', 'split', 'split-low', 'reuniting'
  },
  expression: {
    type: String,
    default: 'happy' // 'happy', 'confused', 'worried', 'sad'
  },
  together: {
    type: Boolean,
    default: true
  },
  cellRefs: {
    type: Object,
    default: () => ({})
  },
  specialEventDay: {
    type: Number,
    default: 14
  },
  visible: {
    type: Boolean,
    default: true
  },
  falling: {
    type: Boolean,
    default: false
  },
  reassembling: {
    type: Boolean,
    default: false
  }
})

const toyPosition = ref({ x: 0, y: 0 })

const toyAImage = computed(() => toyAssets.toyA[props.expression] || toyAssets.toyA.happy)
const toyBImage = computed(() => toyAssets.toyB[props.expression] || toyAssets.toyB.happy)

const positionClass = computed(() => ({
  'position-header': props.position === 'header',
  'position-event': props.position === 'special-event',
  'position-split': props.position === 'split' || props.position === 'split-low',
  'position-split-low': props.position === 'split-low',
  'toys-together': props.together,
  'toys-separated': !props.together
}))

const toysStyle = computed(() => {
  return {}
})

const toyAStyle = computed(() => {
  const position = props.position

  if (position === 'center') {
    // Initial position - center of screen, together
    return {
      position: 'fixed',
      left: 'calc(50% - 60px)',
      top: '50%',
      transform: 'translate(-50%, -50%) rotate(-5deg)'
    }
  }

  if (position === 'sides') {
    // Split to left of calendar header - beside the month title
    return {
      position: 'fixed',
      left: 'calc(50% - 560px)',
      top: '110px',
      transform: 'none'
    }
  }

  // Default fallback
  return {
    position: 'fixed',
    left: '100px',
    top: '200px',
    transform: 'translateX(-50%)'
  }
})

const toyBStyle = computed(() => {
  const position = props.position

  if (position === 'center') {
    // Initial position - center of screen, together
    return {
      position: 'fixed',
      left: 'calc(50% + 60px)',
      top: '50%',
      transform: 'translate(-50%, -50%) rotate(5deg)'
    }
  }

  if (position === 'sides') {
    // Split to right of calendar header - beside the month title
    return {
      position: 'fixed',
      left: 'calc(50% + 140px)',
      top: '110px',
      transform: 'none'
    }
  }

  // Default fallback
  return {
    position: 'fixed',
    right: '100px',
    top: '200px',
    transform: 'translateX(-50%)'
  }
})

// Watch for cell refs changes
watch(() => props.cellRefs, () => {
  // Trigger re-computation of positions
}, { deep: true })
</script>

<style scoped>
.toys-overlay {
  pointer-events: none;
  z-index: 50;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.toys-overlay.is-falling {
  animation: toys-fall 2s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;
}

.toys-overlay.is-reassembling {
  animation: toys-reassemble 1.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes toys-fall {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(300px) scale(0.5) rotate(20deg);
  }
}

@keyframes toys-reassemble {
  0% {
    opacity: 0;
    transform: translateY(300px) scale(0.5) rotate(20deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1) rotate(0deg);
  }
}

.toy {
  width: 100px;
  height: 100px;
  object-fit: contain;
  transition: all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  will-change: transform, left, top;
  position: fixed;
}

.toy-sad {
  opacity: 0.7;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1)) grayscale(0.3);
}

.toys-fade-leave-active {
  transition: all 0.6s ease-out;
}

.toys-fade-leave-to {
  opacity: 0;
  transform: translateY(50px) scale(0.8);
}

/* Animations */
.toys-fade-enter-active,
.toys-fade-leave-active {
  transition: opacity 0.4s ease;
}

.toys-fade-enter-from,
.toys-fade-leave-to {
  opacity: 0;
}

.toy-move-enter-active,
.toy-move-leave-active {
  transition: all 0.4s ease;
}

.toy-move-enter-from,
.toy-move-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

@media (max-width: 768px) {
  .toy {
    width: 70px;
    height: 70px;
  }

  .position-header .toy {
    width: 50px;
    height: 50px;
  }

  .position-event .toy {
    width: 80px;
    height: 80px;
  }
}
</style>
