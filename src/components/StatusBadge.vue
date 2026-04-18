<script setup lang="ts">
import { computed } from 'vue';

//定义组件接收的参数
const props = defineProps<{
  type: 'status' | 'priority';
  value: string;
}>();

// 根据类型和值，动态计算对应的 CSS 类名，赋予不同颜色
const badgeClass = computed(() => {
  if (props.type === 'status') {
    const statusMap: Record<string, string> = {
      'pending': 'bg-gray-100 text-gray-800 border-gray-200',
      'in_progress': 'bg-blue-100 text-blue-800 border-blue-200',
      'completed': 'bg-green-100 text-green-800 border-green-200',
    };
    return statusMap[props.value] || 'bg-gray-100 text-gray-800';
  } else {
    const priorityMap: Record<string, string> = {
      'low': 'bg-green-50 text-green-700',
      'medium': 'bg-yellow-50 text-yellow-700',
      'high': 'bg-red-50 text-red-700',
    };
    return priorityMap[props.value] || 'bg-gray-50 text-gray-700';
  }
});

// 格式化文本显示
const displayText = computed(() => {
  if (!props.value) return '';
  if (props.value === 'in_progress') return 'In Progress';
  return props.value.charAt(0).toUpperCase() + props.value.slice(1);
});
</script>
/

<template>
  <span class="badge" :class="badgeClass">
    {{ displayText }}
  </span>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
  border: 1px solid transparent;
}

/* 状态颜色定义 */
.bg-gray-100 { background-color: #f3f4f6; }
.text-gray-800 { color: #1f2937; }
.border-gray-200 { border-color: #e5e7eb; }

.bg-blue-100 { background-color: #dbeafe; }
.text-blue-800 { color: #1e40af; }
.border-blue-200 { border-color: #bfdbfe; }

.bg-green-100 { background-color: #dcfce3; }
.text-green-800 { color: #166534; }
.border-green-200 { border-color: #bbf7d0; }

/* 优先级颜色定义 */
.bg-green-50 { background-color: #f0fdf4; }
.text-green-700 { color: #15803d; }

.bg-yellow-50 { background-color: #fefce8; }
.text-yellow-700 { color: #a16207; }

.bg-red-50 { background-color: #fef2f2; }
.text-red-700 { color: #b91c1c; }
</style>