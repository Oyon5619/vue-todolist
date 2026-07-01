<script setup lang="ts">
import AuthorLink from "./components/authorLink.vue";
import TodoList from "./pages/todoList.vue";
</script>

<template>
  <div class="overflow-hidden w-full h-full">
    <TodoList />
    <AuthorLink />
  </div>
</template>
