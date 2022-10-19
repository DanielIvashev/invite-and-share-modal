<template>
    <q-layout
        view="lHh lpR fFf"
        class="guestLayout"
    >
        <q-page-container
            class="pageContainer"
        >
            <q-page class="page">
                <router-view v-slot="{ Component }">
                    <Suspense>
                        <template #default>
                            <transition
                                name="fade"
                                appear
                                mode="out-in"
                            >
                                <component :is="Component" />
                            </transition>
                        </template>
                        <template #fallback>
                            <SuspenseComponent />
                        </template>
                    </Suspense>
                </router-view>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
import SuspenseComponent from '@/components/SuspenseComponent';

export default {
    name: 'GuestsLayout',
    components: {
        SuspenseComponent
    }
};
</script>
