<script setup>
// const { $socket } = useNuxtApp();
import { useSocketStore } from '~/stores/socket';

const config = useRuntimeConfig();
const text = ref("");
let socket;
const { setNickname } = useSocketStore();
const { user, loginUser, registerUser } = useFireBase()



function onLogin() {
  const email = "franci.orru00@gmail.com";
  const password = "password123";

  loginUser(email, password);
}

function onRegister() {
  const email = "franci.orru00@gmail.com";
  const password = "password123";

  registerUser(email, password);
}

function start() {
  setNickname(text.value);

  text.value = "";

  navigateTo('/chat')
}
</script>

<template>
    <div class="w-96 h-96 fra-box text-white p-8 text-center flex flex-col">
      <span>{{ user?.email }}</span>
      <span class="text-xl my-6">please choose a nickname</span>
      <input v-model="text" @keyup.enter="start" class="my-6 border border-gray-100 h-9 rounded-md" />
      <button @click="start()" class="my-6 hover:underline">START</button>


      <div class="flex justify-around">
        <button @click="onRegister">REGISTER</button>
        <button @click="onLogin">LOG IN</button>
      </div>
    </div>
</template>
  
<style scoped>
    .fra-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #23272a;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }
    input {
        background-color: transparent;
        caret-color: #fff;
    }
</style>