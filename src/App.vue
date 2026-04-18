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
  background-image: linear-gradient(45deg, #0000006b 0%, #00000035 50%, #d4d3d3e7 100%); 
}

/* 顶部样式 */
.app-header {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  text-align: center; 
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
</style>