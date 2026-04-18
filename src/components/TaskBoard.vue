<script setup lang="ts">
import { useTaskStore } from '../stores/taskStore';
import TaskCard from './TaskCard.vue';

const taskStore = useTaskStore();
</script>

<template>
  <div class="board-container">
    <div class="board-column">
      <div class="column-header">
        <h2 class="column-title">Pending</h2>
        <span class="task-count">{{ taskStore.pendingTasks.length }}</span>
      </div>
      <!-- 任务列表 -->
      <div class="task-list">
        <TaskCard 
          v-for="task in taskStore.pendingTasks" 
          :key="task.id" 
          :task="task" 
        />
        <!-- 无任务时显示 -->
        <div v-if="taskStore.pendingTasks.length === 0" class="empty-state">
          No tasks here yet.
        </div>
      </div>
    </div>

    <div class="board-column bg-blue-light">
      <div class="column-header">
        <h2 class="column-title text-blue">In Progress</h2>
        <span class="task-count bg-blue-badge">{{ taskStore.inProgressTasks.length }}</span>
      </div>
      <!-- 调用getters筛选好的待处理任务数组 -->
      <div class="task-list">
        <TaskCard 
          v-for="task in taskStore.inProgressTasks" 
          :key="task.id" 
          :task="task" 
        />
        <!-- 绑定id和传递单个任务 -->
        <div v-if="taskStore.inProgressTasks.length === 0" class="empty-state">
          Drop tasks here to start.
        </div>
      </div>
    </div>

    <div class="board-column bg-green-light">
      <div class="column-header">
        <h2 class="column-title text-green">Completed</h2>
        <span class="task-count bg-green-badge">{{ taskStore.completedTasks.length }}</span>
      </div>
      <!-- 现实当前任务总数 -->
      <div class="task-list">
        <TaskCard 
          v-for="task in taskStore.completedTasks" 
          :key="task.id" 
          :task="task" 
        />
        <div v-if="taskStore.completedTasks.length === 0" class="empty-state">
          Good job! Check off some tasks.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 手机端单列，PC端三列，整体布局 */
.board-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

@media (min-width: 768px) {
  .board-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

/*看板列基础样式*/
.board-column {
  background-color: #f9fafb; 
  border-radius: 0.75rem;
  padding: 1rem;
  min-height: 60vh;
  border: 1px solid #e5e7eb;
}

/* 区分列的主题颜色 */
.bg-blue-light { background-color: #eff6ff; border-color: #dbeafe; }
.bg-green-light { background-color: #f0fdf4; border-color: #dcfce3; }
/*字体的主题色*/
.text-blue { color: #1d4ed8; }
.text-green { color: #15803d; }

/*头部栏布局*/
.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid transparent;
}

.column-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  color: #374151;
}


/*任务数量显示*/
.task-count {
  background-color: #e5e7eb;
  color: #4b5563;
  padding: 0.1rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
}
.bg-blue-badge { background-color: #bfdbfe; color: #1e40af; }
.bg-green-badge { background-color: #bbf7d0; color: #166534; }

/* 无任务时显示 */
.empty-state {
  text-align: center;
  color: #9ca3af;
  font-size: 0.9rem;
  padding: 2rem 0;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
}
</style>