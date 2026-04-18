<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import type { TaskPriority } from '../types';

const taskStore = useTaskStore();

// 绑定任务标题，描述，优先级，默认为中等优先级
const title = ref('');
const description = ref('');
const priority = ref<TaskPriority>('medium');

// 处理表单提交
const handleSubmit = () => {
  if (!title.value.trim()) {
    alert('Please enter a task title!');
    return;
  }
  // 添加任务
  taskStore.addTask(title.value, description.value, priority.value);
  title.value = '';
  description.value = '';
  priority.value = 'medium';
};
// 清空表单内容，重置优先级
</script>

<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <div class="form-row">
      <div class="input-group title-group">
        <input 
          v-model="title"
          type="text" 
          placeholder="What needs to be done?" 
          class="form-input font-semibold"
          required
        />
    
      </div>
        <!-- 优先级下拉选择框 -->
      <div class="input-group">
        <select v-model="priority" class="form-select">
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      <button type="submit" class="submit-btn">
        Add Task
      </button>
    </div>

    <div class="form-row mt-3">
      <input 
        v-model="description" 
        type="text" 
        placeholder="Add details (optional)" 
        class="form-input text-sm text-gray"
      />
    </div>
  </form>
</template>

<style scoped>
/*容器整体*/
.task-form {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
  border: 1px solid #e5e7eb;
  margin-bottom: 2rem; 
  /* 与下方看板保持间距 */
}

.form-row {
  display: flex;
  gap: 1rem;
  align-items: center;
}
/*表单行*/

.mt-3 {
  margin-top: 0.75rem;
}
/*上边距*/

.input-group {
  display: flex;
  flex-direction: column;
}
/*输入框组*/


.title-group {
  flex: 1; 
  /* 让标题输入框占据剩余的空间 */
}

.form-input, .form-select {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%;
}
/*输入和下拉框*/

.form-input:focus, .form-select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.font-semibold { font-weight: 600; }
.text-sm { font-size: 0.875rem; }
.text-gray { color: #4b5563; }

.submit-btn {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap; /* 防止按钮文字换行 */
}
/* 提交按钮和动画 */

.submit-btn:hover {
  background-color: #1d4ed8;
}
/*悬浮加深色*/

/* 移动端适配：小屏幕垂直排列 */
@media (max-width: 640px) {
  .form-row {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>