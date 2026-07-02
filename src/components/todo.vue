<script lang="ts" setup>
import type { TodoItem } from "@/types/todoItem";
import {
  NSpace,
  NInput,
  NButton,
  NCheckbox,
  NBlockquote,
  NIcon,
  NDropdown,
  type DropdownOption,
} from "naive-ui";
import { EllipsisHorizontalCircleOutline } from "@vicons/ionicons5";
import { computed, ref } from "vue";

const { todo, isMobile } = defineProps<{
  todo: TodoItem;
  isMobile?: boolean;
}>();
const emit = defineEmits([
  "edit",
  "save",
  "delete",
  "selectToggle",
  "finishToggle",
]);

const currentChecked = ref(todo.checked);
const currentContent = ref(todo.content);

const dropdownOptions = computed(() => {
  const { isEditing, isFinish } = todo;
  let result: DropdownOption[] = [{ label: "删除", key: "delete" }];

  if (!isFinish) {
    result.push(
      isEditing
        ? { label: "保存", key: "save" }
        : { label: "编辑", key: "edit" },
    );
  }

  result.push(
    isFinish
      ? { label: "取消完成", key: "unfinish" }
      : {
          label: "标记完成",
          key: "finish",
          disabled: isEditing || !currentContent,
        },
  );

  return result;
});

const onSaveOrEdit = () => {
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

const handleDropdownSelect = (key: string) => {
  if (key === "delete") {
    onDelete();
    return;
  }

  if (key === "edit" || key === "save") {
    onSaveOrEdit();
    return;
  }

  onFinishToggle();
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
    <n-dropdown
      v-if="isMobile"
      trigger="click"
      :options="dropdownOptions"
      @select="handleDropdownSelect"
    >
      <n-icon size="30" :component="EllipsisHorizontalCircleOutline" />
    </n-dropdown>

    <n-space v-else>
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
  </n-space>
</template>

<style scoped>
.displayItem {
  width: 18rem;
}
</style>
