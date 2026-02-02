<template>
  <Transition name="modal">
    <div v-if="visible" class="modal-overlay" @click.self="onOverlayClick">
      <div class="modal-content" :class="{ enhanced: enhanced }">
        <div class="modal-body">
          <p v-if="message" class="modal-message">{{ message }}</p>
          <h2 class="modal-question">{{ question }}</h2>

          <div class="modal-buttons">
            <button
              class="btn btn-yes"
              @click="$emit('yes')"
            >
              {{ yesText }}
            </button>
            <button              v-if="!hideNo"              class="btn btn-no"
              @click="$emit('no')"
            >
              {{ noText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  },
  question: {
    type: String,
    required: true
  },
  yesText: {
    type: String,
    default: 'Yes 💖'
  },
  noText: {
    type: String,
    default: 'No'
  },
  enhanced: {
    type: Boolean,
    default: false
  },
  hideNo: {
    type: Boolean,
    default: false
  }
})

defineEmits(['yes', 'no', 'close'])

function onOverlayClick() {
  // Don't allow closing by clicking overlay for this app
}
</script>

<style scoped>
.modal-overlay {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-top: 20px;
  z-index: 50;
}

.modal-content {
  background: white;
  border-radius: 20px;
  padding: 30px;
  max-width: 900px;
  width: 100%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transform-origin: center;
  animation: modal-bounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 2px solid #FFB6C1;
}

.modal-content.enhanced {
  background: linear-gradient(135deg, #fff5f7 0%, #ffffff 100%);
  border: 2px solid #FFB6C1;
}

@keyframes modal-bounce {
  0% {
    transform: scale(0.7);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-body {
  text-align: center;
}

.modal-message {
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 16px 0;
  font-weight: 500;
}

.modal-question {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 32px 0;
  line-height: 1.3;
}

.modal-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.btn {
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.btn-yes {
  background: linear-gradient(135deg, #FF1493 0%, #FF69B4 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(255, 20, 147, 0.3);
}

.btn-yes:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 20, 147, 0.4);
}

.btn-yes:active {
  transform: translateY(0);
}

.btn-no {
  background: #f3f4f6;
  color: #6b7280;
}

.btn-no:hover {
  background: #e5e7eb;
  color: #374151;
}

/* Modal transition */
.modal-enter-active {
  transition: opacity 0.3s ease;
}

.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .modal-content {
    padding: 30px 20px;
  }

  .modal-question {
    font-size: 22px;
    margin-bottom: 24px;
  }

  .modal-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
