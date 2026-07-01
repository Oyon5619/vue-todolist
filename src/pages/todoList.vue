<script lang="ts" setup>
import type { TodoItem } from "@/types/todoItem";
import { computed, ref } from "vue";
import { v4 } from "uuid";
import { NInput, NButton, NSpace, NFlex } from "naive-ui";
import logoImg from "@/assets/vue.svg";
import Todo from "@/components/todo.vue";

const todos = ref<TodoItem[]>([]);
const keyword = ref("");

const selectedIds = computed(() => {
  return todos.value.filter(({ checked }) => checked).map(({ id }) => id);
});

const statistic = computed(() => {
  const finishedCount = todos.value.filter(({ isFinish }) => isFinish).length;
  const unfinishedCount = todos.value.length - finishedCount;

  return { finishedCount, unfinishedCount };
});

const displayTodos = computed(() => {
  const result = todos.value;

  if (!keyword.value?.trim()) {
    return result;
  }

  return result.filter(({ content }) => content?.includes(keyword.value));
});

const handleAdd = () => {
  const newTodo: TodoItem = { id: v4(), isEditing: true };
  todos.value.unshift(newTodo);
};

const modifyTodos = (todoId: string, newValues: Partial<TodoItem>) => {
  return todos.value.map((item) => {
    if (todoId !== item.id) {
      return item;
    }

    return { ...item, ...newValues };
  });
};

const handleEdit = (todoId: string) => {
  todos.value = modifyTodos(todoId, { isEditing: true });
};

const handleSave = (todoId: string, content: string) => {
  todos.value = modifyTodos(todoId, { isEditing: false, content });
};

const handleSelectToggle = (todoId: string, checked: boolean) => {
  todos.value = modifyTodos(todoId, { checked });
};

const handleFinishToggole = (todoId: string, isFinish: boolean) => {
  todos.value = modifyTodos(todoId, { isFinish, isEditing: false });
};

const handleDelete = (targetId: string) => {
  todos.value = todos.value.filter(({ id }) => id !== targetId);
};

const handleBatchDelete = () => {
  todos.value = todos.value.filter(({ id }) => !selectedIds.value.includes(id));
};

const handleDeleteAll = () => {
  todos.value = [];
};
</script>

<template>
  <div
    class="border-2 border-cyan-100 w-2xl shadow-lg rounded-md m-auto mt-6 p-4"
  >
    <div class="flex justify-center">
      <img :src="logoImg" class="mr-2" />
      <div class="text-[2rem]">待办表</div>
    </div>
    <div class="text-[0.65rem] text-cyan-400 text-center mb-4">
      基于vue + navie ui制作.
    </div>
    <n-space vertical>
      <n-flex justify="center">
        <n-input
          v-model:value="keyword"
          placeholder="输入历史待办..."
          style="width: 18rem"
        />
        <n-button>清空</n-button>
      </n-flex>
      <n-flex justify="center">
        <n-button type="primary" @click="handleAdd">新增</n-button>
        <n-button
          type="error"
          :disabled="!displayTodos.length"
          @click="handleDeleteAll"
          >删除所有</n-button
        >
        <n-button
          type="error"
          :disabled="!selectedIds.length"
          @click="handleBatchDelete"
          >删除选中</n-button
        >
        <n-button type="warning">删除已完成</n-button>
      </n-flex>
      <n-flex justify="center">
        <div>已完成：{{ statistic.finishedCount }}</div>
        <div>未完成：{{ statistic.unfinishedCount }}</div>
      </n-flex>
    </n-space>

    <div class="mt-4 min-h-30 max-h-68 overflow-y-auto">
      <n-flex justify="center">
        <div v-if="todos.length === 0" class="m-auto">当前无待办</div>
        <div v-else class="flex flex-col">
          <Todo
            v-for="item in displayTodos"
            :key="item.id"
            :todo="item"
            @delete="handleDelete"
            @save="handleSave"
            @edit="handleEdit"
            @select-toggle="handleSelectToggle"
            @finish-toggle="handleFinishToggole"
          />
        </div>
      </n-flex>
    </div>
  </div>
</template>
