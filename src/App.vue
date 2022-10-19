<template>
    <div
        v-show="!$route.name || suspensePending"
    >
        <q-inner-loading showing>
            <q-spinner-gears
                size="50px"
                color="primary"
            />
        </q-inner-loading>
    </div>
    <div
        v-show="$route.name && !suspensePending"
    >
        <Suspense
            @resolve="suspensePending = false"
            @pending="suspensePending = true"
        >
            <component
                :is="layout"
                v-if="layout"
            />
            <div v-else>
            </div>
        </Suspense>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
    name: 'App',
    components: {
        GuestLayout: defineAsyncComponent(() => import('./layouts/GuestLayout'))
    },
    data () {
        return {
            suspensePending: true
        };
    },
    computed: {
        layout () {
            return this.$route.meta.layout;
        }
    }
};
</script>

<style></style>
