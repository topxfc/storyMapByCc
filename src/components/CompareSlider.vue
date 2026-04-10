<template>
  <div
    class="compare-slider"
    :class="{ dark: isDark }"
    ref="sliderEl"
    @mousedown="startDrag"
    @touchstart.passive="startDrag"
  >
    <!-- 左侧（Before） -->
    <div class="slider-side left" :style="`width:${position}%`">
      <div class="side-content" :style="`width:${containerWidth}px`">
        <slot name="left">
          <div class="slider-placeholder">
            <div class="placeholder-value" :style="`color:${leftColor}`">{{ leftValue }}</div>
            <div class="placeholder-label">{{ leftLabel }}</div>
            <div class="placeholder-desc" v-if="leftDesc">{{ leftDesc }}</div>
          </div>
        </slot>
      </div>
      <div class="side-tag left-tag">{{ leftTag || 'Before' }}</div>
    </div>

    <!-- 右侧（After） -->
    <div class="slider-side right">
      <div class="side-content">
        <slot name="right">
          <div class="slider-placeholder">
            <div class="placeholder-value" :style="`color:${rightColor}`">{{ rightValue }}</div>
            <div class="placeholder-label">{{ rightLabel }}</div>
            <div class="placeholder-desc" v-if="rightDesc">{{ rightDesc }}</div>
          </div>
        </slot>
      </div>
      <div class="side-tag right-tag">{{ rightTag || 'After' }}</div>
    </div>

    <!-- 拖动手柄 -->
    <div class="slider-handle" :style="`left:${position}%`">
      <div class="handle-line"></div>
      <div class="handle-knob">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M8 6l-4 6 4 6"/>
          <path d="M16 6l4 6-4 6"/>
        </svg>
      </div>
      <div class="handle-line"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  leftValue?: string
  leftLabel?: string
  leftDesc?: string
  leftTag?: string
  leftColor?: string
  rightValue?: string
  rightLabel?: string
  rightDesc?: string
  rightTag?: string
  rightColor?: string
  isDark?: boolean
  initialPosition?: number
}>()

const sliderEl = ref<HTMLElement>()
const position = ref(props.initialPosition || 50)
const containerWidth = ref(600)
let dragging = false

function startDrag(e: MouseEvent | TouchEvent) {
  e.preventDefault()
  dragging = true
  updatePosition(e)
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', onDrag)
  document.addEventListener('touchend', stopDrag)
}

function onDrag(e: MouseEvent | TouchEvent) {
  if (!dragging) return
  updatePosition(e)
}

function stopDrag() {
  dragging = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
}

function updatePosition(e: MouseEvent | TouchEvent) {
  if (!sliderEl.value) return
  const rect = sliderEl.value.getBoundingClientRect()
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const pct = ((clientX - rect.left) / rect.width) * 100
  position.value = Math.max(5, Math.min(95, pct))
}

function updateWidth() {
  if (sliderEl.value) {
    containerWidth.value = sliderEl.value.clientWidth
  }
}

onMounted(() => {
  updateWidth()
  window.addEventListener('resize', updateWidth)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
  stopDrag()
})
</script>

<style scoped>
.compare-slider {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  cursor: ew-resize;
  user-select: none;
  background: #F0ECE4;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  border: 1px solid rgba(0,0,0,0.06);
}
.compare-slider.dark {
  background: #0D1B2E;
  border-color: rgba(255,255,255,0.06);
}

.slider-side {
  position: absolute;
  top: 0;
  bottom: 0;
  overflow: hidden;
}
.slider-side.left {
  left: 0;
  z-index: 2;
  border-right: none;
}
.slider-side.right {
  left: 0;
  right: 0;
  z-index: 1;
}

.side-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.side-tag {
  position: absolute;
  top: 16px;
  padding: 4px 16px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  border-radius: 20px;
  z-index: 3;
}
.left-tag {
  left: 16px;
  background: rgba(0,0,0,0.6);
  color: white;
}
.right-tag {
  right: 16px;
  background: rgba(255,255,255,0.9);
  color: var(--text-primary);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.dark .left-tag {
  background: rgba(0,212,255,0.2);
  color: var(--tech-cyan);
}
.dark .right-tag {
  background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.8);
}

.slider-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
}
.placeholder-value {
  font-size: 72px;
  font-weight: 900;
  font-family: var(--font-num);
  line-height: 1;
  margin-bottom: 8px;
}
.placeholder-label {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}
.placeholder-desc {
  font-size: 14px;
  color: var(--text-muted);
  max-width: 240px;
  line-height: 1.6;
}
.dark .placeholder-label { color: rgba(255,255,255,0.8); }
.dark .placeholder-desc { color: rgba(255,255,255,0.4); }

/* 滑块 Handle */
.slider-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateX(-50%);
  pointer-events: none;
}
.handle-line {
  flex: 1;
  width: 2px;
  background: white;
  box-shadow: 0 0 8px rgba(0,0,0,0.3);
}
.dark .handle-line {
  background: var(--tech-cyan);
  box-shadow: 0 0 12px rgba(0,212,255,0.3);
}
.handle-knob {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  pointer-events: auto;
  cursor: ew-resize;
  transition: transform 0.15s;
}
.handle-knob:hover { transform: scale(1.1); }
.dark .handle-knob {
  background: var(--tech-cyan);
  color: var(--deep-black);
  box-shadow: 0 0 20px rgba(0,212,255,0.4);
}

@media (max-width: 767px) {
  .compare-slider { height: 300px; }
  .placeholder-value { font-size: 48px; }
  .placeholder-label { font-size: 15px; }
}
</style>
