<template>
  <div class="nav-dots">
    <div
      v-for="(section, i) in sections"
      :key="i"
      class="dot-wrap"
      @click="$emit('goto', i)"
    >
      <div class="dot" :class="{ active: current === i }"></div>
      <span class="dot-tip">{{ section }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  sections: string[]
  current: number
}>()
defineEmits<{ (e: 'goto', index: number): void }>()
</script>

<style scoped>
.nav-dots {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 900;
}

.dot-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d1d5db;
  transition: all 0.25s;
  flex-shrink: 0;
}

.dot-wrap:hover .dot,
.dot.active {
  background: #2563eb;
  transform: scale(1.4);
}

.dot-tip {
  position: absolute;
  right: 18px;
  background: #1a1a2e;
  color: #fff;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
}

.dot-wrap:hover .dot-tip { opacity: 1; }

@media (max-width: 767px) {
  .nav-dots { display: none; }
}
</style>
