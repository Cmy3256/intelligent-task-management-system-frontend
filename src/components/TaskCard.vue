<script setup lang="ts">
import type { Task, TaskStatus } from '../types/index.ts';
import StatusBadge from './StatusBadge.vue';
import { useTaskStore } from '../stores/taskStore';

//接收看板组件传过来的具体的 task 数据
const props = defineProps<{
  task: Task;
}>();

//引入 Store
const taskStore = useTaskStore();

//格式化时间戳为易读日期
const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString();
};

//触发 Store 的删除操作
const handleDelete = () => {
  if (confirm('Are you sure you want to delete this task?')) {
    taskStore.deleteTask(props.task.id);
  }
};

//触发 Store 的更新状态操作
const handleStatusChange = (event: Event) => {
  const newStatus = (event.target as HTMLSelectElement).value as TaskStatus;
  taskStore.updateTaskStatus(props.task.id, newStatus);
};
</script>

<template>
  <div class="task-card">
    <div class="card-header">
      <StatusBadge type="priority" :value="task.priority" />
      <button class="delete-btn" @click="handleDelete" title="Delete Task">×</button>
    </div>
    
    <h3 class="task-title">{{ task.title }}</h3>
    <p v-if="task.description" class="task-desc">{{ task.description }}</p>
    
    <div class="card-footer">
      <span class="task-date">{{ formatDate(task.created_at) }}</span>
      
      <select 
        :value="task.status" 
        @change="handleStatusChange"
        class="status-select"
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  border: 1px solid #e5e7eb;
  margin-bottom: 0.75rem;
  transition: all 0.2s ease;
}

.task-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  transform: translateY(-2px); /* 鼠标悬浮时微微上浮 */
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.delete-btn {
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1;
  padding: 0 0.25rem;
}

.delete-btn:hover {
  color: #ef4444; /* 悬停变红提示危险操作 */
}

.task-title {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  color: #111827;
  font-weight: 600;
}

.task-desc {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  color: #6b7280;
  /* 描述如果太长，超过两行自动显示省略号 */
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  line-clamp:2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid #f3f4f6;
}

.task-date {
  font-size: 0.75rem;
  color: #9ca3af;
}

.status-select {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid #d1d5db;
  background-color: #f9fafb;
  cursor: pointer;
  outline: none;
  font-weight: 500;
  color: #374151;
}

.status-select:focus {
  border-color: #3b82f6;
}
</style>