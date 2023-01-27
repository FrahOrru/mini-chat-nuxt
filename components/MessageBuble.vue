<script setup>
  import { onMounted } from 'vue';
import { useSocketStore } from '~/stores/socket';

    const props = defineProps({
        nickname: String,
        message: String,
        isConnected: Boolean,
        typing: Boolean,
        isLink: Boolean,
        img: Boolean
    })
    const { nicknameVal } = useSocketStore();

</script>
<template>
    <div class="message-buble">
        <div v-if="typing">
            <DotElastic></DotElastic>
        </div>
        <div v-if="!typing">
            <p v-if="nickname !== nicknameVal" class="font-bold">{{ nickname }}<span class="ml-2 dot" :class="isConnected ? 'online' : 'offline'"></span></p>
            <p class="text-sm" v-if="!isLink && !img">{{ message }}</p>
            <a :href="message" v-if="isLink && !img" target="_blank">{{ message }}</a>
            <img v-if="!isLink && img" :src="message" alt="imported image" class="w-72 h-96" />
        </div>
    </div>
</template>
<style scoped>
a:link {
  color: #99aab5;
  text-decoration: underline;
}
.message-buble {
    background-color: #7289da;
    width: fit-content;
    padding: 0.8rem;
    margin: 1rem;
    border-radius: 20px;
}

.dot {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
}

.dot.online {
    background-color: rgb(4, 179, 4);
}

.dot.offline {
  background-color: rgb(149, 144, 144);
}
</style>