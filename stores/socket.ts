import { defineStore } from "pinia";

export const useSocketStore = defineStore('user', () => {

    const socket = ref('' as any);
    const nickname = ref('');

    const socketVal = computed(() => socket.value);
    const nicknameVal = computed(() => nickname.value);

    function setSocket(_socket: any) {
        socket.value = _socket;
    }

    function setNickname(_nickname: any) {
        nickname.value = _nickname;
    }

    function emitNickname(_nickname: any) {
        socket.value.emit('setNickname', _nickname);
    }

    return { socketVal, nicknameVal, setNickname, setSocket, emitNickname }
})