import { defineStore } from 'pinia';
// pinia : 난 현재의 data를 다른 컴포넌트에서도 사용할것같어...
// 그때마다 api 요청하는 것도 그렇고, 

export const useUserInfo = defineStore('userInfo', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUserData(data) {
      this.user = data;
    },
    initializeFromSession() {
      const storedUserInfo = sessionStorage.getItem('userInfo');
      if (storedUserInfo) {
        try {
          this.user = JSON.parse(storedUserInfo);
        } catch (error) {
          console.error('Error loading user info:', error);
        }
      }
    },
  },
});
