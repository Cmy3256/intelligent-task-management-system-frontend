<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TaskForm from './components/TaskForm.vue';
import TaskFilter from './components/TaskFilter.vue';
import TaskBoard from './components/TaskBoard.vue';

// 夜间模式
const isDarkMode = ref(false);
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  }
};
// 页面加载时读取缓存配置跟随系统默认
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    isDarkMode.value = true;
    document.body.classList.add('dark-theme');
  }
});
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Intelligent Task Management System</h1>
      <button @click="toggleTheme" class="theme-toggle" :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
        {{ isDarkMode ? '🌙' : '☀️' }}
      </button><!-- 夜间模式图标 -->
    </header>
    <!-- 主体内容区域 -->
    <main class="app-main">
      <div class="max-w-7xl">
        <TaskForm />

        <TaskFilter />

        <TaskBoard />
      </div>
    </main>
  </div>
</template>

<style scoped>

/* 最外层容器 */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  background-color: #fffeff;
  background-image: linear-gradient(45deg, #a5cbde7d 0%, #58326f61 50%, #353b7fc1 100%); 
}

/* 顶部样式 */
.app-header {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  text-align: center; 
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/*标题样式*/
.app-header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #2c3e50;
  font-weight: 700;
}
/* 主体内容 */
.app-main {
  flex: 1;
  padding: 2rem;
}
/* 限制最大宽度，居中*/
.max-w-7xl {
  max-width: 80rem;
  margin: 0 auto;
}

/*夜间模式图标*/
.theme-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.theme-toggle:hover {
  background-color: rgba(0, 0, 0, 0.05);
  transform: scale(1.1);
}
</style>

<style>
/* 全局夜间模式覆盖 */
body.dark-theme {
  background-color: #0f172a;
  color: #e2e8f0;
  transition: background-color 0.3s ease;
}

/* 替换背景 */
body.dark-theme .app-container {
  background-image: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%) !important;
}

/*  容器变暗 */
body.dark-theme .app-header,
body.dark-theme .task-form,
body.dark-theme .filter-bar,
body.dark-theme .board-column,
body.dark-theme .task-card,
body.dark-theme .select-dropdown {
  background-color: rgba(15, 23, 42, 0.6) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  box-shadow: 0 8px 12px -2px rgba(0,0,0,0.4), inset 1px 1px 0px rgba(255, 255, 255, 0.05) !important;
}

/* 字体颜色加白  */
body.dark-theme .app-header h1,
body.dark-theme .column-title,
body.dark-theme .task-title,
body.dark-theme .select-trigger {
  color: #f8fafc !important;
}
body.dark-theme .task-desc { color: #94a3b8 !important; }

/* 输入框和下拉框  */
body.dark-theme .form-input,
body.dark-theme .form-select,
body.dark-theme .search-box,
body.dark-theme .filter-select,
body.dark-theme .edit-input {
  background-color: rgba(0, 0, 0, 0.4) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: #f8fafc !important;
}
body.dark-theme input::placeholder, 
body.dark-theme textarea::placeholder { color: #64748b; }

/* select选项的背景色 */
body.dark-theme option {
  background-color: rgba(0, 0, 0, 0.8);
  color: #f8fafc;
}

body.dark-theme .task-count { background-color: rgba(255,255,255,0.1); color: #cbd5e1; }
body.dark-theme .bg-red-badge { background-color: rgba(244, 67, 54, 0.2); color: #f44336; }
body.dark-theme .bg-blue-badge { background-color: rgba(59, 130, 246, 0.2); color: #93c5fd; }
body.dark-theme .bg-green-badge { background-color: rgba(34, 197, 94, 0.2); color: #86efac; }
body.dark-theme .empty-state { color: #64748b; border-color: rgba(255,255,255,0.1); }
body.dark-theme .task-card.is-completed { opacity: 0.4; }
</style>