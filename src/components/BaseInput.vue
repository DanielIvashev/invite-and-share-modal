<template>
    <div
        :class="['base-input', 'no-margin' in attrs && 'base-input--no-margin', attrs['class-name']]"
    >
        <label
            v-if="attrs.label"
            class="base-input__label"
            :for="attrs.for"
        >
            {{ attrs.label }}
            <q-icon
                v-if="attrs['label-description'] || attrs['clicable-popup']"
                :name="`img:${$icons.infoTooltipIcon}`"
                size="16px"
                class="cursor-pointer"
            >
                <q-popup-proxy
                    v-if="attrs['clicable-popup']"
                    anchor="top left"
                    self="bottom left"
                    :offset="[10, 10]"
                >
                    <q-banner>
                        <slot name="clicable-popup"></slot>
                    </q-banner>
                </q-popup-proxy>

                <q-tooltip
                    v-else
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                >
                    <div class="base-input__label-description">
                        {{ attrs['label-description'] }}
                    </div>
                </q-tooltip>
            </q-icon>
        </label>
        <q-input
            ref="input"
            outlined
            no-error-icon
            dense
            bottom-slots
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            hide-bottom-space
            v-bind="{
                ...passedAttrs,
                class: computedClasses,
                ...(attrs.debounce !== null && { debounce: attrs.debounce || 300 })
            }"
        >
            <template #error>
                <span>
                    <q-icon
                        name="error"
                        size="15px"
                    />
                    {{ attrs['error-message'] }}
                </span>
            </template>
            <template
                v-for="(_, slot) of $slots"
                #[slot]="props"
            >
                <slot
                    :key="slot"
                    :name="slot"
                    v-bind="props"
                ></slot>
            </template>
        </q-input>
    </div>
</template>


<script>
export default {
    inheritAttrs: false
};
</script>
<script setup>
import { computed, ref, useAttrs } from 'vue';

const props = defineProps({
    validation: {
        type: Object,
        default: () => ({})
    },
    isDirty: {
        type: Boolean,
        default: false
    }
});
const attrs = useAttrs();
const input = ref(null);

const passedAttrs = computed(() => {
    const {
        'class': className,
        'error-message': errorMessage,
        label,
        labelDescription,
        debounce,
        ...otherAttrs
    } = attrs;

    return otherAttrs;
});
const computedClasses = computed(() => {
    const classes = [
        {
            'error-input': props.validation?.$error && !props.validation?.$pending,
            'success-input': props.isDirty && !props.validation?.$invalid && !props.validation?.$pending
        }
    ];
    if ('class' in attrs) {
        classes.push(attrs['class']);
        classes.flat();
    }

    return classes;
});

function focus () {
    input.value?.focus();
}
</script>

<style lang="scss">
@import "@/styles/base-input";
</style>
