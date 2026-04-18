<script setup lang="ts">
import { computed } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import TaskCard from './TaskCard.vue';
import { VueDraggable } from 'vue-draggable-plus';

const taskStore = useTaskStore();

// get读取分类数据，set将拖拽后的新数组整列写回
const pendingList = computed({
  get: () => taskStore.pendingTasks,
  set: (val) => taskStore.updateTaskGroup('pending', val)
});

const inProgressList = computed({
  get: () => taskStore.inProgressTasks,
  set: (val) => taskStore.updateTaskGroup('in_progress', val)
});

const completedList = computed({
  get: () => taskStore.completedTasks,
  set: (val) => taskStore.updateTaskGroup('completed', val)
});
</script>

<template>
    <div> 
        <div v-if="taskStore.isFiltering" class="filter-warning">
         ⚠️ Drag and drop is temporarily disabled while filtering or searching.
        </div>
    </div>

    <!--pending -->
  <div class="board-container">

    <div class="board-column">
      <div class="column-header">
        <h2 class="column-title">Pending</h2>
        <span class="task-count">{{ taskStore.pendingTasks.length }}</span>
      </div>
      <div class="list-container">
        <div v-if="pendingList.length === 0" class="empty-state">Drop here</div>
        <!--  拖拽，触发更新任务数据，后面两块相同  -->
        <VueDraggable
          v-model="pendingList"
          group="tasks"
          :disabled="taskStore.isFiltering"
          :animation="150"
          ghostClass="ghost-card"
          class="drag-area"
        >
          <TaskCard v-for="task in pendingList" :key="task.id" :task="task" />
        </VueDraggable>
      
      </div>
    </div>

    <!-- in progress -->
    <div class="board-column bg-blue-light">
      <div class="column-header">
        <h2 class="column-title text-blue">In Progress</h2>
        <span class="task-count bg-blue-badge">{{ taskStore.inProgressTasks.length }}</span>
      </div>

      <div class="list-container">
        <div v-if="inProgressList.length === 0" class="empty-state">Drop here</div>
        
        <VueDraggable
          v-model="inProgressList"
          group="tasks"
          :disabled="taskStore.isFiltering"
          :animation="150"
          ghostClass="ghost-card"
          class="drag-area"
        >
          <TaskCard v-for="task in inProgressList" :key="task.id" :task="task" />
        </VueDraggable>
      </div>
    </div>

    <!-- completed -->
    <div class="board-column bg-green-light">
      <div class="column-header">
        <h2 class="column-title text-green">Completed</h2>
        <span class="task-count bg-green-badge">{{ taskStore.completedTasks.length }}</span>
      </div>
    
      <div class="list-container">
        <div v-if="completedList.length === 0" class="empty-state">Drop here</div>
        
        <VueDraggable
          v-model="completedList"
          group="tasks"
          :disabled="taskStore.isFiltering"
          :animation="150"
          ghostClass="ghost-card"
          class="drag-area"
        >
          <TaskCard v-for="task in completedList" :key="task.id" :task="task" />
        </VueDraggable>
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
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  min-height: 60vh;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

/* 列的主题色 */
.bg-blue-light { 
  background-color: rgba(219, 234, 254, 0.3); 
  border-color: rgba(191, 219, 254, 0.5); 
}
.bg-green-light { 
  background-color: rgba(220, 252, 227, 0.3); 
  border-color: rgba(187, 247, 208, 0.5); 
}
/*字体的主题色*/
.text-blue { color: #1d4ed8; }
.text-green { color: #15803d; }

/*头部标题*/
.column-header {
  display: flex;
  justify-content: center; 
  align-items: center;
  gap: 0.75rem; 
  margin-bottom: 1rem;
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

/*列表容器*/
.list-container {
  position: relative; 
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 确保高度接收 */
.drag-area {
  flex: 1; 
  min-height: 150px; 
}

/* 拖走卡片时原地占位符样式 */
:deep(.ghost-card) {
  opacity: 0.4;
  background-color: #f3f4f6;
  border: 2px dashed #9ca3af;
  border-radius: 0.5rem;
}

/* 拖拽时卡片样式 */
:deep(.sortable-drag) {
  cursor: grabbing !important;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
}

/* 无任务时显示 */
.empty-state {
  position: absolute;
  inset: 0; 
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  pointer-events: none;
}

/*提示语样式*/
.filter-warning {
  background-color: #fffbeb;
  color: #b45309;
  padding: 0.75rem;
  border-radius: 0.5rem;
  text-align: center;
  font-weight: 600;
  border: 1px solid #fef3c7;
}
</style>