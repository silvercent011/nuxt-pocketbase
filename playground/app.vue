<script setup lang="ts">
const posts = await usePB().collection("posts").getFullList({
  sort: "-created",
});
</script>

<template>
  <div>{{ posts }}</div>
</template>
