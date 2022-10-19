<template>
    <div
        class="q-linear-progress text-primary q-table__linear-progress"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="1"
        style="--q-linear-progress-speed: 2100ms;"
    >
        <div
            class="
                q-linear-progress__track
                absolute-full q-linear-progress__track--with-transition
                q-linear-progress__track--light
                bg-transparent
            "
            style="transform: scale3d(1, 1, 1);"
        >
        </div>
        <div
            class="
                q-linear-progress__model
                absolute-full
                q-linear-progress__model--with-transition
                q-linear-progress__model--indeterminate
            "
            style="transform: scale3d(1, 1, 1);"
        >
        </div>
    </div>
</template>

<script>
export default {
    name: 'SuspenseComponent'
};
</script>
