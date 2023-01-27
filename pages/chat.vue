<script setup>
  import io from "socket.io-client";
  import ChatLog from "../components/ChatLog.vue";
  import { useSocketStore } from '~/stores/socket';

  const config = useRuntimeConfig();
  const chatLog = ref([]);
  const text = ref("");
  const nickname = ref("");
  const imageInput = ref('')

  const { socketVal, nicknameVal, setSocket, emitNickname} = useSocketStore();

  const { escape } = useMagicKeys()

  let socket;
  function addToChat(m, n = nicknameVal, activityMessage = false, isConnected, isLink, img) {
    if(!activityMessage) {
      chatLog.value.push({ nickname: n, message: m, isConnected: isConnected, acivity: false, isLink: isLink, img: img});
    } else {
      chatLog.value.push({ message: m, acivity: true });
    }
  }

  
  onMounted(() => {
    socket = io(config.public.wssUrl); // "http://192.168.20.31:3000");
    setSocket(socket);
    emitNickname(nicknameVal);

    socket.on("chat message", (data) => {
      addToChat(data.msg, data.nickname, false, data.connected, data.isLink, data.img);
    });

    socket.on("message", (data) => {
      if(!!data.type) {
        switch(data.type) {
          case 'joined': 
            addToChat(`${ data.nickname === nicknameVal ? 'you' : data.nickname } joined`, data.nickname, true);
          break;
          case 'typing':
            if(!chatLog.value.find(item => item.id === 'loading')) {
              chatLog.value.push({id: 'loading', nickname: nicknameVal});
            }
            break;
          case 'no typing':
              chatLog.value = chatLog.value.filter(item => item?.id !== 'loading')
            break;
        }
      }
    })
  });

  onBeforeUnmount(() => {
    socket.emit('disconnecting');
    connect(false);
  })

  function onFocus() {
    socket.emit('activity', 'typing');
  }
  function onBlur() {
    socket.emit('activity', 'no typing');
  }

  function isValidHttpUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (err) {
    return false;
  }
}

    function sendImage() {
      const file = imageInput.value.files[0];
      const formData = new FormData();

      const image = URL.createObjectURL(file);

      socket.emit("chat message", image, false, true)
      // { nickname: n, message: m, isConnected: isConnected, acivity: false, isLink: isLink, img: img}
      chatLog.value.push({ nickname: nicknameVal, message: image, isConnected: true, acivity: false, isLink: false, img: true});
    }

  function send() {
    socket.emit("chat message", text.value, isValidHttpUrl(text.value));
    socket.emit('activity', 'no typing');
    chatLog.value.push({ nickname: nicknameVal, message: text.value, isConnected: true, acivity: false, isLink: isValidHttpUrl(text.value)});
    text.value = "";
  }
  watch(escape, () => {
    navigateTo({ path: '/' });
  })
</script>
<template>
    <div>
      <div class="header-chat flex items-center justify-center">
          <h2 class="text-center text-white text-xl">Group chat</h2>
      </div>
      <ChatLog :chat-log="chatLog" />
  
      <div class="flex items-center justify-evenly p-3 footer-chat">
        <label for="file-upload" class="custom-file-upload">
          <img class="fa fa-cloud-upload" src="~/assets/img/picture.png"/>
        </label>
        <input id="file-upload" type="file" ref="imageInput" @change="sendImage"/>
        <input v-model="text" @keyup.enter="send" @focus="onFocus" @blur="onBlur" class="text-white border border-white rounded-3xl p-2 w-11/12 message-input" />
        <button @click="send" class="h-full send-button"><img src="~/assets/img/send.png" alt="send button"></button>
      </div>
    </div>
</template>

<style scoped>

input[type="file"] {
    display: none;
}
.custom-file-upload {
    display: inline-block;
    background-color: #7289da;
    border-radius: 50%;
    padding: 0.7rem;
    cursor: pointer;
}

.custom-file-upload img {
  width: 20px;
  height: 20px;
}

.header-chat {
  height: 10vh;
  background-color: #23272a;
}
.footer-chat {
  background-color: #23272a;
}
.message-input {
  background-color: transparent;
  caret-color: #fff;
}
.send-button {
  background-color: #7289da;
  border-radius: 50%;
  padding: 0.7rem;
}

.send-button img {
  width: 20px;
  height: 20px;
}
</style>