import { defineStore } from "pinia";

export const useSocketStore = defineStore('user', () => {

    const socket = ref('' as any);
    const nickname = ref('');
    const online = ref(true);

    const socketVal = computed(() => socket.value);
    const nicknameVal = computed(() => nickname.value);
    const isOnline = computed(() => online.value);

    function setSocket(_socket: any) {
        socket.value = _socket;
    }

    function setNickname(_nickname: any) {
        nickname.value = _nickname;
    }

    function emitNickname(_nickname: any) {
        socket.value.emit('setNickname', _nickname);
    }

    function disconnect() {
        online.value = false;
    }

    function connect() {
        online.value = true;
    }

    return { socketVal, nicknameVal, setNickname, setSocket, emitNickname, disconnect, connect, isOnline }
})