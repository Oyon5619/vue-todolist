<script lang="ts" setup>
import type { TodoItem } from "@/types/todoItem";
import { NSpace, NInput, NButton, NCheckbox, NBlockquote } from "naive-ui";
import { ref } from "vue";

const { todo } = defineProps<{ todo: TodoItem }>();
const emit = defineEmits([
  "edit",
  "save",
  "delete",
  "selectToggle",
  "finishToggle",
]);

const currentChecked = ref(todo.checked);
const currentContent = ref(todo.content);

const onSaveOrEdit = () => {
  console.log(todo.isEditing);
  if (todo.isEditing) {
    emit("save", todo.id, currentContent.value);
    return;
  }

  emit("edit", todo.id);
};

const onSelectToggle = (value: boolean) => {
  emit("selectToggle", todo.id, value);
};

const onFinishToggle = () => {
  if (todo.isEditing) {
    currentContent.value = todo.content;
  }

  emit("finishToggle", todo.id, !todo.isFinish);
};

const onDelete = () => {
  emit("delete", todo.id);
};
</script>

<template>
  <n-space :class="`w-fit mb-2 ${todo.isFinish ? 'line-through' : ''}`">
    <n-checkbox
      v-model:checked="currentChecked"
      @update:checked="onSelectToggle"
    />
    <n-blockquote v-if="!todo.isEditing" class="displayItem">{{
      todo.content || "空白待办"
    }}</n-blockquote>
    <n-input
      v-else
      class="displayItem"
      placeholder="请输入待办..."
      v-model:value="currentContent"
    />
    <n-button v-if="!todo.isFinish" @click="onSaveOrEdit">{{
      todo.isEditing ? "保存" : "编辑"
    }}</n-button>
    <n-button
      :type="todo.isFinish ? 'warning' : 'info'"
      :disabled="todo.isEditing || !currentContent"
      @click="onFinishToggle"
      >{{ todo.isFinish ? "取消完成" : "标记完成" }}</n-button
    >
    <n-button type="error" @click="onDelete">删除</n-button>
  </n-space>
</template>

<style scoped>
.displayItem {
  width: 18rem;
}
</style>
