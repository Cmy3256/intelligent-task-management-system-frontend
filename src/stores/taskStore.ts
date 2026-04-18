import { defineStore } from 'pinia';
import type { Task, TaskStatus, TaskPriority } from '../types';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    
    tasks: JSON.parse(localStorage.getItem('task_manager_data') || '[]') as Task[],
  }),
  //初始化时，尝试从本地缓存读取数据；如果没有，则设为空数组
  
  getters: {
    pendingTasks: (state) => state.tasks.filter(t => t.status === 'pending'),
    inProgressTasks: (state) => state.tasks.filter(t => t.status === 'in_progress'),
    completedTasks: (state) => state.tasks.filter(t => t.status === 'completed'),
  },
  

  actions: {
    
    saveToLocalStorage() {
      localStorage.setItem('task_manager_data', JSON.stringify(this.tasks));
    },
    //每次修改数据后，同步保存到浏览器的 localStorage

    addTask(title: string, description: string = '', priority: TaskPriority = 'medium', tags: string[] = []) {
      const newTask: Task = {
        id: crypto.randomUUID(), // 使用浏览器原生 API 生成唯一 ID
        title,
        description,
        status: 'pending', //新任务默认处于待处理状态
        priority,
        created_at: Date.now(),
        updated_at: Date.now(),
        tags
      };
      this.tasks.push(newTask);
      this.saveToLocalStorage();
    },

    updateTaskGroup(status: TaskStatus, newTasks: Task[]) {
      //  过滤掉当前状态的所有旧任务，把其他状态的任务安全地保留下来
      const otherTasks = this.tasks.filter(t => t.status !== status);
      
      // 遍历新传进来的列表，强制修正状态
      const updatedTasks = newTasks.map(t => {
        if (t.status !== status) {
          return { ...t, status, updated_at: Date.now() };
        }
        return t;
      });

      // 将其他任务和更新后的当前列任务合并，完成替换
      this.tasks = [...otherTasks, ...updatedTasks];
      this.saveToLocalStorage();
    },

    updateTaskStatus(taskId: string, newStatus: TaskStatus) {
      const task = this.tasks.find(t => t.id === taskId);
      if (task) {
        task.status = newStatus;
        task.updated_at = Date.now();
        this.saveToLocalStorage();
      }
    },
    //更新任务状态

    deleteTask(taskId: string) {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
      this.saveToLocalStorage();
    }
    //删除任务
  }
});
