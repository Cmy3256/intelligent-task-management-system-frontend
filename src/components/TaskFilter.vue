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
  background: white;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  border: 1px solid #e5e7eb;
}
/* 搜索区域样式 */
.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0 0.75rem;
  transition: border-color 0.2s;
}
/* 搜索边框高亮 */
.search-box:focus-within { border-color: #3b82f6; }
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
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;
  background: white;
  font-size: 0.95rem;
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