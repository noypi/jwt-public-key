import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
    state: () => ({
        access_token: '',
        username: '',
    }),
    persist: true,
});
