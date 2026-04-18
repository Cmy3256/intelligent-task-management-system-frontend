<script setup lang="ts">
import TaskForm from './components/TaskForm.vue';
import TaskBoard from './components/TaskBoard.vue';

</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Intelligent Task Management System</h1>
    </header>
    <!-- 主体内容区域 -->
    <main class="app-main">
      <div class="max-w-7xl">
        <TaskForm />
        
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
}
/* 顶部样式 */
.app-header {
  background-color: #ffffff;
  padding: 1rem 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
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