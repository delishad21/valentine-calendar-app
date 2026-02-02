<template>
  <Transition name="celebration">
    <div v-if="visible" class="celebration-overlay">
      <!-- Confetti -->
      <div class="confetti-container">
        <div
          v-for="i in 50"
          :key="i"
          class="confetti"
          :style="confettiStyle(i)"
        ></div>
      </div>

      <div class="celebration-content">
        <div class="celebration-toys">
          <img src="/toys/toyA_happy.png" alt="Toy A" class="celebration-toy" />
          <div class="celebration-heart">💖</div>
          <img src="/toys/toyB_happy.png" alt="Toy B" class="celebration-toy" />
        </div>
        <h1 class="celebration-message">{{ message }}</h1>
        <p class="celebration-subtitle">{{ subtitle }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { appText } from '../config/appConfig'

defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: appText.celebration.message
  },
  subtitle: {
    type: String,
    default: appText.celebration.subtitle
  }
})

function confettiStyle(index) {
  const colors = ['#FF1493', '#FF69B4', '#FFB6C1', '#DDA0DD', '#BA55D3']
  const randomColor = colors[index % colors.length]
  const randomLeft = Math.random() * 100
  const randomDelay = Math.random() * 2
  const randomDuration = 2 + Math.random() * 2

  return {
    left: `${randomLeft}%`,
    backgroundColor: randomColor,
    animationDelay: `${randomDelay}s`,
    animationDuration: `${randomDuration}s`
  }
}
</script>

<style scoped>
.celebration-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}

.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  top: -10px;
  opacity: 0;
  animation: confetti-fall 3s linear forwards;
}

@keyframes confetti-fall {
  0% {
    top: -10px;
    opacity: 1;
    transform: rotate(0deg);
  }
  100% {
    top: 100vh;
    opacity: 0;
    transform: rotate(720deg);
  }
}

.celebration-content {
  text-align: center;
  z-index: 1;
  animation: celebration-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes celebration-bounce {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.celebration-toys {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
}

.celebration-toy {
  width: 100px;
  height: 100px;
  object-fit: contain;
  animation: toy-bounce 1s ease-in-out infinite;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.celebration-toy:first-child {
  animation-delay: 0s;
}

.celebration-toy:last-child {
  animation-delay: 0.2s;
}

@keyframes toy-bounce {
  0%, 100% {
    transform: translateY(0) rotate(-5deg);
  }
  50% {
    transform: translateY(-15px) rotate(5deg);
  }
}

.celebration-heart {
  font-size: 80px;
  animation: heart-pulse 1s ease-in-out infinite;
}

@keyframes heart-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.celebration-message {
  font-size: 48px;
  font-weight: 700;
  color: #FF1493;
  margin: 0 0 16px 0;
}

.celebration-subtitle {
  font-size: 24px;
  color: #6b7280;
  margin: 0;
}

.celebration-enter-active,
.celebration-leave-active {
  transition: opacity 0.4s ease;
}

.celebration-enter-from,
.celebration-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .celebration-toys {
    gap: 20px;
  }

  .celebration-toy {
    width: 70px;
    height: 70px;
  }

  .celebration-heart {
    font-size: 60px;
  }

  .celebration-message {
    font-size: 36px;
  }

  .celebration-subtitle {
    font-size: 18px;
  }
}
</style>
