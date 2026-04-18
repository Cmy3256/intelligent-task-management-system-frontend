<script setup lang="ts">
import { useTaskStore } from '../stores/taskStore';

const taskStore = useTaskStore();

// 一键清除过滤条件
const clearFilters = () => {
  taskStore.searchQuery = '';
  taskStore.filterPriority = 'all';
};
</script>

<template>
  <div class="filter-bar">
    <!-- 左侧搜索区域 -->
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input 
        v-model="taskStore.searchQuery" 
        type="text" 
        placeholder="Search tasks by title or details..." 
        class="search-input"
      />
    </div>
     <!-- 右侧筛选区 -->
    <div class="filter-box">
      <select v-model="taskStore.filterPriority" class="filter-select">
        <option value="all">All Priorities</option>
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      <!-- 开启了筛选条件才显示清空键 -->
      <button 
        v-if="taskStore.isFiltering" 
        @click="clearFilters" 
        class="clear-btn"
      >
        Clear
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 筛选栏样式 */
.filter-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  background-color: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), inset 1px 1px 0px rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.4);
}
/* 搜索区域样式 */
.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem;
  padding: 0 0.75rem;
  transition: all 0.2s;
}
/* 搜索边框高亮 */
.search-box:focus-within { 
  background-color: rgba(255, 255, 255, 0.9);
  border-color: #3b82f6; 
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}
/*图标*/
.search-icon { font-size: 1rem; color: #9ca3af; margin-right: 0.5rem; }
/* 输入框样式 */
.search-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.75rem 0;
  outline: none;
  font-size: 0.95rem;
}
/* 筛选区样式 */
.filter-box { display: flex; gap: 0.5rem; }
.filter-select {
  padding: 0.75rem 1rem;
  background-color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem;
  outline: none;
  font-size: 0.95rem;
  transition: all 0.2s;
}
.filter-select:focus {
  background-color: rgba(255, 255, 255, 0.9);
  border-color: #3b82f6;
}
/* 清空键样式 */
.clear-btn {
  background-color: #fee2e2;
  color: #ef4444;
  border: none;
  padding: 0 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}
.clear-btn:hover { background-color: #fecaca; }

@media (max-width: 640px) {
  .filter-bar { flex-direction: column; }
}
</style>