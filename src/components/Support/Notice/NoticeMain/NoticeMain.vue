<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
// 반응형 데이터
const noticeList = ref([]);

//페이징 데이터
const currentPage = ref(1);
const pageSize = ref(5);

// 검색했을 때 데이터 받기
const searchDatas = ref({
  title: '',
  startDate: '',
  endDate: '',
});

const fetchNoticeList = () => {
  const params = {
    title: searchDatas.value.title || '',
    startDate: searchDatas.value.startDate || '',
    endDate: searchDatas.value.endDate || '',
    currentPage: currentPage.value.toString(),
    pageSize: pageSize.value.toString(),
  };

  const urlParams = new URLSearchParams(params);
  axios
    .post(`/api/support/noticeListBody.do`, urlParams)
    .then((res) => {
      noticeList.value = res.data.list || [];
    })
    .catch((err) => {
      console.error(err);
      noticeList.value = [];
    });
};

onMounted(() => {
  fetchNoticeList();
});
</script>

<template>
  <div></div>
  <div class="notice-main-container">
    <table class="notice-table">
      <thead class="notice-table-header">
        <tr>
          <th>공지번호</th>
          <th>공지 제목</th>
          <th>공지 날짜</th>
          <th>작성자</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="noticeList.length === 0">
          <td colspan="4" class="notice-empty-row">일치하는 검색 결과가 없습니다</td>
        </tr>
        <tr v-for="notice in noticeList" v-else :key="notice.noticeId" class="notice-table-row">
          <td>{{ notice.noticeId }}</td>
          <td>{{ notice.noticeTitle }}</td>
          <td>{{ notice.regDate }}</td>
          <td>{{ notice.loginId }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
@import './styled.css';
</style>
