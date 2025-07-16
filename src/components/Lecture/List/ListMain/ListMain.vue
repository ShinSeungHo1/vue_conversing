<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import PageNavigation from '@/components/common/PageNavigation.vue';
import axios from 'axios';
import { useModalState } from '@/stores/modalState';
import ListModal from '../ListModal/ListModal.vue';

const route = useRoute();
const lectureList = ref([]);
const lectureCount = ref(0);
const lectureId = ref(0);

const modalState = useModalState();

const lectureSearch = (cPage = 1) => {
  const params = {
    currentPage: cPage,
    pageSize: 5,
    ...route.query,
  };

  const urlParam = new URLSearchParams(params);

  axios.post('/api/lecture/lectureListBody.do', urlParam).then((res) => {
    console.log(res);
    lectureList.value = res.data.list;
    lectureCount.value = res.data.count;
  });
};

const lectureDetail = (lecId) => {
  lectureId.value = lecId;
  modalState.$patch({ isOpen: true });
};

watch(
  () => route.query,
  () => {
    lectureSearch();
  },
);

onMounted(() => {
  lectureSearch();
});
</script>

<template>
  <div></div>
  <div class="lecture-main-container">
    <table class="lecture-table">
      <thead class="lecture-table-header">
        <tr>
          <th>강의명</th>
          <th>강사</th>
          <th>강의 시작일</th>
          <th>강의 종료일</th>
          <th>정원</th>
          <th>신청인원</th>
          <th>강의실</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="lectureCount > 0">
          <tr v-for="lecture in lectureList" :key="lecture.lecId" class="lecture-table-row">
            <td
              class="lecture-cell cursor-pointer hover:underline"
              @click="lectureDetail(lecture.lecId)"
            >
              {{ lecture.lecName }}
            </td>
            <td class="lecture-cell">{{ lecture.lecInstructorName }}</td>
            <td class="lecture-cell">{{ lecture.lecStartDate?.substring(0, 10) }}</td>
            <td class="lecture-cell">{{ lecture.lecEndDate?.substring(0, 10) }}</td>
            <td class="lecture-cell">{{ lecture.lecPersonnel }}</td>
            <td class="lecture-cell">{{ lecture.courseCntPersonnel }}</td>
            <td class="lecture-cell">{{ lecture.lecRoomName }}</td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="4" class="lecture-empty-row">일치하는 검색 결과가 없습니다</td>
          </tr>
        </template>
      </tbody>
    </table>
    <PageNavigation
      :total-items="lectureCount"
      :items-per-page="5"
      :on-page-change="lectureSearch"
    />
  </div>
  <ListModal
    v-if="modalState.isOpen"
    :lecture-id="lectureId"
    @un-mounted-modal="lectureId = $event"
  />
</template>

<style scoped>
@import './styled.css';
</style>
