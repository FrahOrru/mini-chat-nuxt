<script setup>
import { toRefs } from "vue";
import { useScroll } from "@vueuse/core";
const props = defineProps({
  chatLog: [],
});
const { chatLog } = toRefs(props);
const chatBox = ref(null);
const { y } = useScroll(chatBox, {
  behavior: "smooth",
});
watch(chatLog, () => {
  nextTick(() => {
    y.value = chatBox.value.scrollHeight;
  });
});

</script>
<template>
    <div
      ref="chatBox"
      class="p-2 overflow-scroll w-full chat-view text-white"
    >
    <div v-for="item in chatLog">

      <MessageBuble v-if="!item.acivity" 
      :nickname="item.nickname"
      :message="item.message"
      :isConnected="item.isConnected"
      :typing="item?.id === 'loading'"
      :isLink="item.isLink"
      :img="item.img"></MessageBuble>

      <ActivityMessage v-if="item.acivity" :message="item.message"></ActivityMessage>
    </div>
  </div>
  </template>
<style scoped>
.chat-view {
  height: 80vh;
}

.chat-view::-webkit-scrollbar {
  width: 5px;
  height: 100%;
}
</style>