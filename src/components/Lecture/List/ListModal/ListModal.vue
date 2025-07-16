<script setup>
import { useModalState } from '@/stores/modalState';
import axios from 'axios';
import { onMounted, onUnmounted, ref } from 'vue';

const modalState = useModalState();
const lectureData = ref({});
const lecSectionCnt = ref(0);
const weekLecList = ref([]);
const lecWeekGoal = ref('');
const lecWeekContent = ref('');
const lecWeekPlanId = ref('');
const lecWeek = ref(0);

const emits = defineEmits(['unMountedModal']);

const { lectureId: lecId } = defineProps({
  lectureId: { type: Number, default: 0 },
});

const handlerWeekPlan = (lecSectionCnt, weekLecList) => {
  for (let i = 1; i <= lecSectionCnt; i++) {
    let weekData = null;
    for (let j = 0; j < weekLecList.length; j++) {
      if (parseInt(weekLecList[j].lecWeekRound, 10) === i) {
        weekData = weekLecList[j];
        break;
      }
    }
    lecWeek.value = weekData ? i : '';
    weekData.push('lecWeek', lecWeek.value);
    lecWeekGoal.value = weekData ? weekData.lecWeekGoal : '';
    lecWeekContent.value = weekData ? weekData.lecWeekContent : '';
    lecWeekPlanId.value = weekData ? weekData.lecWeekPlanId : '';
  }
};

const lectureDetail = () => {
  const param = new URLSearchParams();
  param.append('lecId', lecId);

  axios.post('/api/lecture/lectureDetail.do', param).then((res) => {
    console.log(res.data);
    lectureData.value = res.data.lectureDetailValue;
    lecSectionCnt.value = res.data.lectureDetailValue.lecSectionCnt;
    weekLecList.value = res.data.lectureDetailValue.lecWeekPlanList || [];

    handlerWeekPlan(lecSectionCnt, weekLecList);
  });
};

onMounted(() => {
  lecId && lectureDetail();
});

onUnmounted(() => {
  emits('unMountedModal', 0);
});
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <!-- 헤더 -->
      <div class="modal-header">
        <h2>강의 상세 및 게시서</h2>
        <button class="close-btn" @click="modalState.$patch({ isOpen: false })">×</button>
      </div>

      <!-- 강의 상세 정보 -->
      <div class="content-section">
        <div class="section-header">강의상세</div>
        <div class="info-grid">
          <div class="info-row">
            <div class="info-label">강의</div>
            <div class="info-value">{{ lectureData.lecName }}</div>
            <div class="info-label">강의실</div>
            <div class="info-value room">{{ lectureData.lecRoomName }}</div>
          </div>
          <div class="info-row">
            <div class="info-label">강사</div>
            <div class="info-value">{{ lectureData.lecInstructorName }}</div>
            <div class="info-label">연락처</div>
            <div class="info-value">{{ lectureData.insHp }}</div>
          </div>
          <div class="info-row">
            <div class="info-label">이메일</div>
            <div class="info-value">{{ lectureData.insEmail }}</div>
            <div class="info-label">강의 시작일</div>
            <div class="info-value">{{ lectureData.lecStartDate?.substring(0, 10) }}</div>
          </div>
          <div class="info-row">
            <div class="info-label">강의종료일</div>
            <div class="info-value">{{ lectureData.lecEndDate?.substring(0, 10) }}</div>
            <div class="info-label">정원</div>
            <div class="info-value">{{ lectureData.lecPersonnel }}</div>
          </div>
          <div class="info-row">
            <div class="info-label">강의 일수 (주차)</div>
            <div class="info-value">{{ lectureData.lecDaysCnt }}</div>
            <div class="info-label"></div>
            <div class="info-value"></div>
          </div>
        </div>
      </div>

      <!-- 강의 계획 -->
      <div class="content-section">
        <div class="section-header">강의 계획</div>
        <div class="plan-section">
          <div class="plan-header">
            <span class="required">강의목표</span>
            <span class="required-mark">*</span>
          </div>
          <div class="plan-content">
            <p>{{ lectureData.lecGoal || '아직 입력된 정보가 없습니다.' }}</p>
          </div>
        </div>
      </div>

      <!-- 강의내용 -->
      <div class="content-section">
        <div class="plan-section">
          <div class="plan-header">
            <span class="required">강의내용</span>
            <span class="required-mark">*</span>
          </div>
          <div class="plan-content">
            <p>{{ lectureData.lecContent || '아직 입력된 정보가 없습니다.' }}</p>
          </div>
        </div>
      </div>

      <!-- 강의기타사항 -->
      <div class="content-section">
        <div class="plan-section">
          <div class="plan-header">
            <span class="required">강의기타사항</span>
            <span class="required-mark">*</span>
          </div>
          <div class="plan-content">
            <p>{{ lectureData.lecSpecifics || '아직 입력된 정보가 없습니다.' }}</p>
          </div>
        </div>
      </div>

      <!-- 하단 정보 -->
      <template v-if="weekLecList.length > 0">
        <div class="content-section">
          <div class="bottom-grid">
            <div class="bottom-item">
              <div class="bottom-header">
                <span class="required">주차</span>
                <span class="required-mark">*</span>
              </div>
              <div class="bottom-content">{{ lectureData.lecWeek || '1주차' }}</div>
            </div>
            <div class="bottom-item">
              <div class="bottom-header">
                <span class="required">학습목표</span>
                <span class="required-mark">*</span>
              </div>
              <div class="bottom-content">{{ lectureData.lecWeekGoal || '' }}</div>
            </div>
            <div class="bottom-item">
              <div class="bottom-header">
                <span class="required">학습내용</span>
                <span class="required-mark">*</span>
              </div>
              <div class="bottom-content">{{ lectureData.lecWeekContent || '' }}</div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
@import './styled.css';
</style>
