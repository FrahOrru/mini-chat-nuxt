<script setup>
const props = defineProps({
    message: String,
})
</script>
<template>
    <div class="activity-message text-center text-white">
        <p class="text-sm">{{  message }}</p>
    </div>
</template>