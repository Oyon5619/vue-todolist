<script lang="ts" setup>
import { LogoGithub } from "@vicons/ionicons5";
import { NFlex, NIcon } from "naive-ui";

const handleClick = () => {
  window.open("https://github.com/Oyon5619");
};
</script>

<template>
  <NFlex justify="center" class="mt-10 cursor-pointer" @click="handleClick">
    <n-icon size="25" :component="LogoGithub" />
    <p class="underline">作者链接</p>
  </NFlex>
</template>
