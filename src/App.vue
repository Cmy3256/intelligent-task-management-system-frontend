<script setup lang="ts">
  //入口组件，后续逐步添加功能组件
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Intelligent Task Manager System Frontend</h1>
    </header>
    

    <!-- 主内容区域，后续添加看板组件等功能组件 -->

    <main class="app-main">
      <p>   智能任务管理系统前端界面</p>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #fcfcfc;
  padding: 1rem 2rem;
  box-shadow: 0 1px 3px rgba(50, 50, 50, 0.8);
}

.app-header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #000000;
}

.app-main {
  flex: 1;
  padding: 2rem;
  overflow-x: auto;
}
</style>