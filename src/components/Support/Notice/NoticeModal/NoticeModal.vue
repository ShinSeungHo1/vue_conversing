<script setup>
import { useUserInfo } from '@/stores/loginInfoState';
import { ref } from 'vue';

const title = ref('');
const content = ref('');
const selectedFile = ref(null);
const previewImage = ref('');

const emits = defineEmits(['save', 'delete', 'close']);

const clickSave = () => {
  if (!title.value) {
    alert('제목을 입력하세요');
    return;
  }
  if (!content.value) {
    alert('내용을 입력하세요');
    return;
  }
};
const clickDelete = () => {};
const clickClose = () => {
  emits('close');
};
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay">
      <form ref="formRef" class="modal-form modal-container">
        <label> 제목 :<input v-model.lazy="title" type="text" name="title" /> </label>
        <label> 내용 :<input v-model.lazy="content" type="text" name="content" /> </label>
        파일 :
        <input id="fileInput" type="file" name="file" />
        <label class="img-label" htmlFor="fileInput"> 파일 첨부하기 </label>
        <div>
          <div>
            <label>미리보기</label>
            <img class="preview-image" />
          </div>
        </div>
        <div class="button-container">
          <button type="button" @click="clickSave">저장</button>
          <button type="button" @click="clickDelete">삭제</button>
          <button type="button" @click="clickClose">나가기</button>
        </div>
      </form>
    </div>
  </Teleport>
</template>

<style>
@import './styled.css';
</style>
