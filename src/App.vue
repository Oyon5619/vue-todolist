<script setup lang="ts">
import AuthorLink from "./components/authorLink.vue";
import MobileTodoList from "./pages/mobileTodoList.vue";
import TodoList from "./pages/todoList.vue";
import { isMobile as isMobileInner } from "./utils/pcMobile.ts";

const isMobile = isMobileInner();
</script>

<template>
  <div v-if="isMobile" class="w-full h-full">
    <MobileTodoList />
  </div>
  <div v-else class="overflow-hidden w-full h-full">
    <TodoList />
    <AuthorLink />
  </div>
</template>
