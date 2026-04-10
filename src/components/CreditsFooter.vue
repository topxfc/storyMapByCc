<template>
  <footer class="credits-footer" id="credits">
    <div class="credits-inner">
      <div class="credits-brand">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#CC0000" stroke-width="2"/>
          <path d="M12 6v6l4 2" stroke="#CC0000" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span>十五五 · 中国成就故事地图</span>
      </div>

      <div class="credits-text">
        <p>
          本交互式故事地图作品以"十五五"规划期间（2026—2030年）中国16个重大发展成就为主题，
          通过地理空间叙事方式，展现中国在科技、国防、民生、经济等领域的历史性跨越。
        </p>
      </div>

      <div class="credits-info">
        <div class="info-col">
          <h4>技术栈</h4>
          <ul>
            <li>Vue 3 + TypeScript</li>
            <li>Leaflet 地图引擎</li>
            <li>ECharts 数据可视化</li>
            <li>GSAP 动画引擎</li>
            <li>Vite 构建工具</li>
          </ul>
        </div>
        <div class="info-col">
          <h4>数据来源</h4>
          <ul>
            <li>国家统计局</li>
            <li>中国政府网</li>
            <li>新华社</li>
            <li>人民日报</li>
            <li>百度百科</li>
          </ul>
        </div>
        <div class="info-col">
          <h4>设计参考</h4>
          <ul>
            <li>GeoScene StoryMaps</li>
            <li>旷世城垣 金陵记忆</li>
          </ul>
        </div>
      </div>

      <div class="credits-divider"></div>

      <div class="credits-bottom">
        <span class="copyright">© 2026 十五五中国成就故事地图</span>
        <span class="note">仅供学术研究与教学使用 · 数据截至2025年12月</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.credits-footer {
  background: #0A0E1A;
  padding: 60px 0 40px;
  color: rgba(255,255,255,0.5);
}
.credits-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 48px;
}
.credits-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.credits-brand span {
  font-size: 18px;
  font-weight: 700;
  color: rgba(255,255,255,0.8);
  letter-spacing: 1px;
}
.credits-text {
  margin-bottom: 32px;
}
.credits-text p {
  font-size: 14px;
  line-height: 1.8;
  color: rgba(255,255,255,0.4);
  max-width: 600px;
}
.credits-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 32px;
}
.info-col h4 {
  font-size: 13px;
  font-weight: 700;
  color: rgba(255,255,255,0.6);
  margin-bottom: 12px;
  letter-spacing: 1px;
}
.info-col ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.info-col li {
  font-size: 13px;
  color: rgba(255,255,255,0.35);
}
.credits-divider {
  height: 1px;
  background: rgba(255,255,255,0.06);
  margin-bottom: 20px;
}
.credits-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.copyright {
  font-size: 12px;
  color: rgba(255,255,255,0.3);
}
.note {
  font-size: 11px;
  color: rgba(255,255,255,0.2);
}

@media (max-width: 767px) {
  .credits-info { grid-template-columns: 1fr; gap: 20px; }
  .credits-bottom { flex-direction: column; gap: 8px; text-align: center; }
  .credits-inner { padding: 0 16px; }
}
</style>
