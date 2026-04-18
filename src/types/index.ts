//用联合类型定义任务状态和优先级
export type TaskStatus = 'pending' | 'in_progress' | 'completed' ;
export type TaskPriority = 'low' | 'medium' | 'high';
// 定义任务接口
export interface Task {
  id: string;               // id
  title: string;            // 标题 
  description?: string;     // 任务描述
  status: TaskStatus;       // 任务状态
  priority: TaskPriority;   // 任务优先级
  created_at: number;       // 创建时间 
  updated_at: number;       // 更新时间
  tags?: string[];          // tags
}

