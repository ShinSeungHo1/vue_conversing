<script setup>
import ContentBox from '@/components/common/ContentBox.vue';
import ListMain from '@/components/Lecture/List/ListMain/ListMain.vue';
import ListSearch from '@/components/Lecture/List/ListSearch/ListSearch.vue';
</script>

<template>
  <ContentBox>강의목록</ContentBox>
  <ListSearch />
  <ListMain />
</template>
