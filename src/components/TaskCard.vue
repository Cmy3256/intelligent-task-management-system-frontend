<script setup lang="ts">
import type { Task, TaskStatus, TaskPriority } from '../types';
import StatusBadge from './StatusBadge.vue';
import { useTaskStore } from '../stores/taskStore';
import { ref } from 'vue';

//接收看板组件传过来的具体的 task 数据
const props = defineProps<{
  task: Task;
}>();

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

// 编辑
const isEditing = ref(false);
const editTitle = ref('');
const editDescription = ref('');
const editPriority = ref<TaskPriority>('medium');

const startEdit = () => {
  editTitle.value = props.task.title;
  editDescription.value = props.task.description || '';
  editPriority.value = props.task.priority;
  isEditing.value = true;
};

const saveEdit = () => {
  if (!editTitle.value.trim()) return;
  taskStore.updateTaskDetails(props.task.id, editTitle.value, editDescription.value, editPriority.value);
  isEditing.value = false;
};

const toggleComplete = () => {
  const newStatus = props.task.status === 'completed' ? 'pending' : 'completed';
  taskStore.updateTaskStatus(props.task.id, newStatus);
};

</script>

<template>
  <div class="task-card">
    <div v-if="!isEditing">
    
      <div class="card-header">
        <StatusBadge type="priority" :value="task.priority" />
        <div>
         <button @click="startEdit" class="edit-btn" title="Edit">✏️</button>
         <button class="delete-btn" @click="handleDelete" title="Delete Task">×</button>
       </div>
      </div>
        <!--任务展示-->
       <h3 class="task-title" :class="{ 'line-through': task.status === 'completed' }">
        <input 
          type="checkbox" 
          :checked="task.status === 'completed'" 
          @change="toggleComplete" 
          class="check-box"
        />
        {{ task.title }}
      </h3>

      <p v-if="task.description" class="task-desc">{{ task.description }}</p>
      <!--创建时间，状态-->
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
   <!-- 进入编辑 -->
  <div v-else class="edit-mode">
      <input v-model="editTitle" type="text" class="edit-input" />
      <textarea v-model="editDescription" class="edit-input" rows="2"></textarea>
      <div class="edit-actions">
        <select v-model="editPriority" class="edit-input select-small">
          <option value="low">Low</option>
          <option value="medium">Med</option>
          <option value="high">High</option>
        </select>
        <div>
          <button @click="isEditing = false" class="btn cancel-btn">Cancel</button>
          <button @click="saveEdit" class="btn save-btn">Save</button>
        </div>
      </div>
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

/* 编辑下样式 */
.edit-btn { background: none; border: none; cursor: pointer; opacity: 0.6; margin-right: 8px; }
.edit-btn:hover { opacity: 1; }
.check-box { margin-right: 8px; transform: scale(1.2); cursor: pointer; }
.line-through { text-decoration: line-through; color: #9ca3af; }

.edit-mode { display: flex; flex-direction: column; gap: 8px; }
.edit-input { width: 100%; padding: 6px; border: 1px solid #d1d5db; border-radius: 4px; font-family: inherit; }
.edit-actions { display: flex; justify-content: space-between; }
.select-small { width: auto; padding: 4px; }
.btn { padding: 4px 10px; border: none; border-radius: 4px; cursor: pointer; }
.save-btn { background: #2563eb; color: white; margin-left: 8px; }
.cancel-btn { background: #e5e7eb; }

</style>