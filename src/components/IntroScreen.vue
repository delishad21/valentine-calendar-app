<template>
  <div class="intro-screen">
    <div class="intro-content">
      <!-- Toys at the top -->
      <div class="intro-toys">
        <img :src="toyAssets.toyA.happy" alt="Toy A" class="intro-toy" />
        <img :src="toyAssets.toyB.happy" alt="Toy B" class="intro-toy" />
      </div>

      <h1 class="intro-title">{{ title }}</h1>
      <p class="intro-subtitle">{{ subtitle }}</p>

      <button class="intro-button" @click="$emit('continue')">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { toyAssets, appText } from '../config/appConfig'

defineProps({
  title: {
    type: String,
    default: appText.intro.title
  },
  subtitle: {
    type: String,
    default: appText.intro.subtitle
  },
  buttonText: {
    type: String,
    default: appText.intro.buttonText
  }
})

defineEmits(['continue'])
</script>

<style scoped>
.intro-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fef3f8 0%, #f8f4fe 100%);
  padding: 20px;
}

.intro-content {
  text-align: center;
  max-width: 500px;
}

.intro-toys {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  animation: toys-float 3s ease-in-out infinite;
}

@keyframes toys-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.intro-toy {
  width: 80px;
  height: 80px;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.intro-toy:first-child {
  animation: toy-wiggle-left 2s ease-in-out infinite;
}

.intro-toy:last-child {
  animation: toy-wiggle-right 2s ease-in-out infinite;
}

@keyframes toy-wiggle-left {
  0%, 100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
}

@keyframes toy-wiggle-right {
  0%, 100% {
    transform: rotate(3deg);
  }
  50% {
    transform: rotate(-3deg);
  }
}

.intro-title {
  font-size: 36px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px 0;
  line-height: 1.2;
}

.intro-subtitle {
  font-size: 18px;
  color: #6b7280;
  margin: 0 0 40px 0;
  line-height: 1.5;
}

.intro-button {
  padding: 16px 48px;
  font-size: 18px;
  font-weight: 600;
  background: linear-gradient(135deg, #FF1493 0%, #FF69B4 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 20, 147, 0.3);
  transition: all 0.3s ease;
}

.intro-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 20, 147, 0.4);
}

.intro-button:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .intro-toy {
    width: 60px;
    height: 60px;
  }

  .intro-title {
    font-size: 28px;
  }

  .intro-subtitle {
    font-size: 16px;
  }

  .intro-button {
    padding: 14px 36px;
    font-size: 16px;
  }
}
</style>
