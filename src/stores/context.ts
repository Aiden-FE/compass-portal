import { defineStore } from 'pinia';

export default defineStore('context', {
  state: () => {
    return { user: null };
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
});
