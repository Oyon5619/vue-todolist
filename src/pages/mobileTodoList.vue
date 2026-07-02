<script lang="ts" setup>
import logoImg from "@/assets/vue.svg";
import AuthorLink from "@/components/authorLink.vue";
import Todo from "@/components/todo.vue";
import { NInput, NFlex, NButton, NSpace } from "naive-ui";
import { useTodoListHook } from "@/hooks/useTodoListHook";

const {
  keyword,
  todos,
  displayTodos,
  selectedIds,
  finishedIds,
  statistic,
  handleAdd,
  handleEdit,
  handleSave,
  handleDelete,
  handleSelectToggle,
  handleFinishToggole,
  handleDeleteAll,
  handleBatchDelete,
  handleDeleteFinished,
} = useTodoListHook();
</script>

<template>
  <div class="p-2">
    <div class="flex justify-center">
      <img :src="logoImg" class="mr-2" />
      <div class="text-[2rem]">待办表Mobile</div>
    </div>
    <div class="text-[0.65rem] text-cyan-400 text-center mb-4">
      基于vue + vant ui + tailwindcss制作.
    </div>
    <n-space vertical>
      <n-input placeholder="请输入关键词..." v-model:value="keyword" round />
      <n-flex justify="center">
        <n-button type="primary" @click="handleAdd" round>新增</n-button>
        <n-button
          type="error"
          :disabled="!displayTodos.length"
          @click="handleDeleteAll"
          round
          >删除所有</n-button
        >
        <n-button
          type="error"
          :disabled="!selectedIds.length"
          @click="handleBatchDelete"
          round
          >删除选中</n-button
        >
        <n-button
          type="warning"
          :disabled="!finishedIds.length"
          @click="handleDeleteFinished"
          round
          >删除已完成</n-button
        >
      </n-flex>
      <n-flex justify="center">
        <div>已完成：{{ statistic.finishedCount }}</div>
        <div>未完成：{{ statistic.unfinishedCount }}</div>
      </n-flex>
    </n-space>
    <n-flex justify="center" class="mt-3">
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
          is-mobile
        />
      </div>
    </n-flex>
    <AuthorLink />
  </div>
</template>

<style scoped></style>
