<script setup>
import { ref } from 'vue';
import NoticeModal from '../NoticeModal/NoticeModal.vue';

// 검색 기능
const title = ref('');
const startDate = ref();
const endDate = ref();

const emit = defineEmits('search');

const handlerSearch = () => {
  const searchData = {
    title: title.value || '',
    startDate: startDate.value || '',
    endDate: endDate.value || '',
  };

  emit('search', searchData);
};

//등록 모달 띄우기
const flag = ref(false);
</script>

<template>
  <div class="notice-container">
    <div class="input-box">
      제목: <input v-model.lazy="title" />
      <input v-model="startDate" type="date" />
      <input v-model="endDate" type="date" />
      <button @click="handlerSearch">검색</button>
      <button @click="flag = !flag">등록</button>
    </div>
  </div>

  <NoticeModal v-if="flag" />
</template>

<!-- style scoped는 해당 컴포넌트에서만 스타일을 적용시키는 방법이다.
    그러나, scoped는 컴파일 시점에 고유한 속성을 컴포넌트 요소에 추가하는데,
    외부 css 파일은 이 고유 속성을 알지 못하므로 스타일이 적용안된다.

    scoped을 사용하지 않고, css파일을 import 하거나, <style scoped> 안에 css를 구성해야한다.
-->
<style>
@import './styled.css';
</style>
