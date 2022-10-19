<template>
    <div class="home">
        <q-btn
            label="Open Popup"
            @click="toggleInviteAndShareModalVisibility"
        />
        <invite-and-share-modal v-model:is-open="isInviteAndShareModalOpen" />
    </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue';

const InviteAndShareModal = defineAsyncComponent(() => import('@/components/InviteAndShareModal.vue'));

const isInviteAndShareModalOpen = ref(false);

function toggleInviteAndShareModalVisibility () {
    isInviteAndShareModalOpen.value = !isInviteAndShareModalOpen.value;
}
</script>

<style lang="scss">
@import '@/styles/home.scss';
</style>
