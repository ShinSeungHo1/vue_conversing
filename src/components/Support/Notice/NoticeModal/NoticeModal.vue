<script setup>
import { useModalState } from '@/stores/modalState';
import { onMounted, onUnmounted, ref } from 'vue';
import axios from 'axios';

const emit = defineEmits(['postSuccess', 'unMountedModal']);

const { detailId: id } = defineProps({
  detailId: { type: Number, default: 0 },
});

const modalState = useModalState();
const formRef = ref();
const detail = ref({});
const imageUrl = ref('');

const handlerInsert = () => {
  const formData = new FormData(formRef.value);

  axios.post('/api/support/noticeFileSave.do', formData).then((res) => {
    if (res.data.result === 'success') {
      alert('저장되었습니다');
      modalState.$patch({ isOpen: false });
      emit('postSuccess');
    }
  });
};

const handlerUpdate = () => {
  const formData = new FormData(formRef.value);
  formData.append('noticeId', id);

  axios.post('/api/support/noticeUpdate.do', formData).then((res) => {
    if (res.data.result === 'success') {
      alert('수정되었습니다');
      modalState.$patch({ isOpen: false });
      emit('postSuccess');
    }
  });
};

const searchDetail = () => {
  const param = new URLSearchParams();
  param.append('noticeId', id);

  axios.post('/api/support/noticeFileDetail.do', param).then((res) => {
    detail.value = res.data.detailValue;

    if (['jpg', 'png', 'gif'].includes(detail.value.fileExt)) {
      getFileImage();
    }
  });
};

const getFileImage = () => {
  const param = new URLSearchParams();
  param.append('noticeId', id);
  axios.post('/api/support/noticeDownload.do', param, { responseType: 'blob' }).then((res) => {
    // const url = window.URL.createObjectURL(new Blob([res.data]));
    const url = window.URL.createObjectURL(res.data);
    imageUrl.value = url;
  });
};

//미리보기
const handlerFile = (e) => {
  // 현재 파일이 이미지 파일이면, 썸네일이 나타나게 할겁니다.
  const fileInfo = e.target.files;
  const fileInfoSplit = fileInfo[0].name.split('.');
  const fileExtension = fileInfoSplit[1].toLowerCase();

  if (['jpg', 'png', 'gif'].includes(fileExtension)) {
    imageUrl.value = URL.createObjectURL(fileInfo[0]);
  }
};

const deleteNotice = () => {
  const param = new URLSearchParams();
  param.append('noticeId', id);

  axios.post('/api/support/noticeDelete.do', param).then((res) => {
    if (res.data.result === 'success') {
      alert('삭제가 완료되었습니다.');
      modalState.$patch({ isOpen: false });
      emit('postSuccess');
    }
  });
};

onMounted(() => {
  id && searchDetail();
});

onUnmounted(() => {
  emit('unMountedModal', 0);
});
</script>

<template>
  <div class="modal-overlay">
    <form ref="formRef" class="modal-form modal-container">
      <label>
        제목 :<input v-model.lazy="detail.noticeTitle" type="text" name="fileTitle" />
      </label>
      <label>
        내용 :<input v-model.lazy="detail.noticeContent" type="text" name="fileContent" />
      </label>
      파일 :
      <input id="fileInput" type="file" name="file" @change="handlerFile" />
      <label class="img-label" htmlFor="fileInput"> 파일 첨부하기 </label>
      <div>
        <div>
          <label>미리보기</label>
          <img :src="imageUrl" class="preview-image" />
        </div>
      </div>
      <div class="button-container">
        <button type="button" @click="!id ? handlerInsert() : handlerUpdate()">
          {{ !id ? '저장' : '수정' }}
        </button>
        <button v-if="!!id" type="button" @click="deleteNotice">삭제</button>
        <button type="button" @click="modalState.$patch({ isOpen: false })">나가기</button>
      </div>
    </form>
  </div>
</template>

<style>
@import './styled.css';
</style>
