import { defineStore } from 'pinia';

export const useModalState = defineStore('modalState', {
  state: () => {
    return {
      isOpen: false,
      type: null, // type은 어떠한 모달 형식으로 띄울것인지 보는 것이다.
      payload: null,
    };
  },
});
