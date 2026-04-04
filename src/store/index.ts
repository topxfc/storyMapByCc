import { createStore } from 'vuex'
import type { RootState, AchievementCategory } from '../types'
import { achievements } from '../data/achievements'

export default createStore<RootState>({
  state: {
    achievements,
    selectedId: null,
    compareIds: [],
    activeCategory: 'all',
    searchKeyword: '',
    mapZoom: 4,
    isTimelineMode: false,
    isSidebarOpen: false,
    isCompareMode: false,
    isLoading: false
  },
  getters: {
    filteredAchievements(state) {
      let list = state.achievements
      if (state.activeCategory !== 'all') {
        list = list.filter(a => a.category === state.activeCategory)
      }
      if (state.searchKeyword.trim()) {
        const kw = state.searchKeyword.toLowerCase()
        list = list.filter(a =>
          a.title.toLowerCase().includes(kw) ||
          a.subtitle.toLowerCase().includes(kw) ||
          a.tags.some(t => t.toLowerCase().includes(kw)) ||
          a.heroStat.includes(kw)
        )
      }
      return list
    },
    selectedAchievement(state) {
      if (!state.selectedId) return null
      return state.achievements.find(a => a.id === state.selectedId) ?? null
    },
    compareAchievements(state) {
      return state.compareIds.map(id => state.achievements.find(a => a.id === id)).filter(Boolean)
    }
  },
  mutations: {
    SET_SELECTED(state, id: string | null) {
      state.selectedId = id
      state.isSidebarOpen = !!id
    },
    SET_CATEGORY(state, cat: AchievementCategory | 'all') {
      state.activeCategory = cat
    },
    SET_SEARCH(state, kw: string) {
      state.searchKeyword = kw
    },
    SET_TIMELINE_MODE(state, val: boolean) {
      state.isTimelineMode = val
    },
    SET_SIDEBAR_OPEN(state, val: boolean) {
      state.isSidebarOpen = val
    },
    SET_COMPARE_MODE(state, val: boolean) {
      state.isCompareMode = val
      if (!val) state.compareIds = []
    },
    TOGGLE_COMPARE_ID(state, id: string) {
      const idx = state.compareIds.indexOf(id)
      if (idx === -1) {
        if (state.compareIds.length < 3) state.compareIds.push(id)
      } else {
        state.compareIds.splice(idx, 1)
      }
    },
    SET_MAP_ZOOM(state, zoom: number) {
      state.mapZoom = zoom
    },
    SET_LOADING(state, val: boolean) {
      state.isLoading = val
    }
  },
  actions: {
    selectAchievement({ commit }, id: string | null) {
      commit('SET_SELECTED', id)
    },
    filterByCategory({ commit }, cat: AchievementCategory | 'all') {
      commit('SET_CATEGORY', cat)
    },
    search({ commit }, kw: string) {
      commit('SET_SEARCH', kw)
    },
    toggleTimelineMode({ commit, state }) {
      commit('SET_TIMELINE_MODE', !state.isTimelineMode)
    },
    closeSidebar({ commit }) {
      commit('SET_SELECTED', null)
    },
    toggleCompareMode({ commit, state }) {
      commit('SET_COMPARE_MODE', !state.isCompareMode)
    },
    toggleCompareId({ commit }, id: string) {
      commit('TOGGLE_COMPARE_ID', id)
    }
  }
})
