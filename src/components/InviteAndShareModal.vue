<template>
    <div class="invite-and-share-modal">
        <q-dialog
            v-model="visibilityModel"
            class="invite-and-share-modal__dialog"
        >
            <q-card
                class="invite-and-share-modal__dialog-card"
            >
                <q-card-section
                    class="invite-and-share-modal__dialog-section invite-and-share-modal__dialog-section--top"
                >
                    <div class="invite-and-share-modal__dialog-heading">
                        <h3 class="invite-and-share-modal__dialog-title">Invite others</h3>
                        <q-btn
                            v-close-popup
                            class="invite-and-share-modal__dialog-close-btn"
                            flat
                            round
                            dense
                        >
                            <q-icon
                                :name="'img:' + $icons['closeIcon']"
                                size="14px"
                            />
                        </q-btn>
                    </div>
                    <div class="invite-and-share-modal__add-people">
                        <base-input
                            v-model="state.emailField.value"
                            class="invite-and-share-modal__add-people-field"
                            :error="v$.emailField?.$error && v$.emailField?.$dirty"
                            :error-message="v$.emailField?.$errors[0]?.$message"
                            :label="state.emailField.label"
                            :validation="v$.emailField"
                            :is-dirty="v$.emailField.$dirty"
                            :placeholder="state.emailField.placeholder"
                            no-margin
                        />
                        <q-btn
                            class="invite-and-share-modal__add-people-btn"
                            outline
                            label="Add"
                            :disable="!state.emailField.value"
                            @click="addToList"
                        />
                    </div>
                    <div class="invite-and-share-modal__add-people-services">
                        <span class="invite-and-share-modal__add-people-services-pre">
                            or add from
                        </span>
                        <div
                            v-for="service in servicesForImport"
                            :key="service.name"
                            class="invite-and-share-modal__add-people-service"
                        >
                            <a
                                href="#"
                                class="invite-and-share-modal__add-people-service-link"
                            >
                                <q-icon :name="'img:' + service.icon" />
                            </a>
                        </div>
                    </div>
                </q-card-section>
                <q-card-section
                    class="invite-and-share-modal__dialog-section invite-and-share-modal__dialog-section--middle"
                >
                    <q-circular-progress
                        v-if="state.getListLoading"
                        class="invite-and-share-modal__list-loader"
                        indeterminate
                        rounded
                    />
                    <div
                        v-else-if="!state.getListLoading && !state.data?.length"
                        class="invite-and-share-modal__list-no-data"
                    >
                        No data
                    </div>
                    <div
                        v-else
                        class="invite-and-share-modal__list"
                    >
                        <transition-group name="list">
                            <div
                                v-for="item in state.data"
                                :key="item.id"
                                class="invite-and-share-modal__list-item"
                            >
                                <div class="invite-and-share-modal__list-item-wrapper">
                                    <div class="invite-and-share-modal__user-info">
                                        <span class="invite-and-share-modal__user-name">
                                            {{ item.name }} {{ item.surname }}
                                        </span>
                                        <span
                                            :class="['invite-and-share-modal__user-email', { 'invite-and-share-modal__user-email--small': item.name || item.surname }]"
                                        >
                                            {{ item.email }}
                                        </span>
                                    </div>
                                    <q-btn
                                        flat
                                        :ripple="false"
                                        unelevated
                                        dense
                                        :class="['invite-and-share-modal__is-admin', { 'popup-opened': item.isOpenRulesPopup }]"
                                    >
                                        <span>
                                            {{ item.isAdmin ? 'Admin' : 'Guest' }}
                                        </span>
                                        <q-menu
                                            v-model="item.isOpenRulesPopup"
                                            anchor="bottom right"
                                            self="top end"
                                            :offset="[0, 5]"
                                            class="invite-and-share-modal__rules-menu"
                                        >
                                            <div class="invite-and-share-modal__rules-menu-list">
                                                <div
                                                    v-for="rule in rulesVariants"
                                                    :key="rule.id"
                                                    v-ripple
                                                    class="invite-and-share-modal__rules-menu-item"
                                                    @click="item.isAdmin = !item.isAdmin"
                                                >
                                                    <div class="invite-and-share-modal__rules-menu-checkmark">
                                                        <q-icon
                                                            :name="'img:' + $icons['checkmarkIcon']"
                                                            :class="{ 'to-hide': item.isAdmin ? rule.id === 'guest' : rule.id === 'admin' }"
                                                        />
                                                    </div>
                                                    <div>
                                                        <b class="invite-and-share-modal__rules-menu-title">
                                                            {{ rule.title }}
                                                        </b>
                                                        <p class="invite-and-share-modal__rules-menu-desc">
                                                            {{ rule.desc }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </q-menu>
                                    </q-btn>
                                </div>
                                <q-btn
                                    flat
                                    :ripple="false"
                                    unelevated
                                    dense
                                    rounded
                                    class="invite-and-share-modal__remove-list-item"
                                    @click="removeFromList({ id: item.id })"
                                >
                                    <q-icon :name="'img:' + $icons['listItemRemoveIcon']" />
                                </q-btn>
                            </div>
                        </transition-group>
                    </div>
                </q-card-section>
                <q-card-section
                    class="invite-and-share-modal__dialog-section invite-and-share-modal__dialog-section invite-and-share-modal__dialog-section--bottom"
                >
                    <div class="invite-and-share-modal__personal-message">
                        <base-input
                            v-model="state.messageField.value"
                            class="invite-and-share-modal__personal-message-field"
                            :error="v$.messageField?.$error && v$.messageField?.$dirty"
                            :error-message="v$.messageField?.$errors[0]?.$message"
                            :label="state.messageField.label"
                            :validation="v$.messageField"
                            :is-dirty="v$.messageField.$dirty"
                            :placeholder="state.messageField.placeholder"
                            no-margin
                        />
                    </div>
                    <div class="invite-and-share-modal__bottom-actions">
                        <span
                            v-show="state.data?.length"
                            class="invite-and-share-modal__bottom-recipients"
                        >
                            {{ recipientCount }}
                        </span>
                        <q-btn
                            :disable="!state.data?.length || state.sendDataLoading"
                            :loading="state.sendDataLoading"
                            unelevated
                            label="Send"
                            class="invite-and-share-modal__send-btn"
                            @click="sendData"
                        />
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

const mockData = [
    {
        email: 'example@email.com',
        name: null,
        surname: null,
        isAdmin: false
    },
    {
        email: 'example@email.com',
        name: 'John',
        surname: 'Wick',
        isAdmin: false
    },
    {
        email: 'example@email.com',
        name: 'Bruce',
        surname: 'Wayne',
        isAdmin: true
    },
    {
        email: 'example@email.com',
        name: 'Jose',
        surname: 'Jose Galdino',
        isAdmin: true
    },
    {
        email: 'example@email.com',
        name: null,
        surname: null,
        isAdmin: false
    },
    {
        email: 'example@email.com',
        name: 'John',
        surname: 'Wick',
        isAdmin: false
    },
    {
        email: 'example@email.com',
        name: 'Bruce',
        surname: 'Wayne',
        isAdmin: true
    },
    {
        email: 'example@email.com',
        name: 'Jose',
        surname: 'Jose Galdino',
        isAdmin: true
    }
];

</script>

<script setup>
import { useQuasar } from 'quasar';
import { computed, defineAsyncComponent, onMounted, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { email, maxLength, minLength, required } from '@vuelidate/validators';

const BaseInput = defineAsyncComponent(() => import('@/components/BaseInput.vue'));
const $q = useQuasar();

const emit = defineEmits(['update:is-open']);
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
});

const state = reactive({
    emailField: {
        value: '',
        placeholder: 'Enter people E-mails'
    },
    messageField: {
        value: '',
        placeholder: 'Personal message (optional)'
    },
    data: [],
    getListLoading: false,
    getListError: null,
    sendDataLoading: false,
    sendDataError: null
});
const servicesForImport = [
    {
        name: 'yahoo',
        icon: new URL('../assets/img/icons/yahoo.svg', import.meta.url).href
    },
    {
        name: 'gmail',
        icon: new URL('../assets/img/icons/gmail.svg', import.meta.url).href
    },
    {
        name: 'aol',
        icon: new URL('../assets/img/icons/aol.svg', import.meta.url).href
    },
    {
        name: 'icloud',
        icon: new URL('../assets/img/icons/icloud.svg', import.meta.url).href
    }
];
const rulesVariants = [
    {
        id: 'guest',
        title: 'Guest',
        desc: '  Default access level, can leave tributes, share media and stories'
    },
    {
        id: 'admin',
        title: 'Administrator',
        desc: 'Can control all aspects of the website, including moderating content posted by others and changing website settings'
    }
];

const rules = computed(() => ({
    emailField: {
        value: {
            required,
            email,
            maxLength: maxLength(60),
            minLength: minLength(4)
        }
    },
    messageField: {
        value: {
            maxLength: maxLength(200),
            minLength: minLength(4)
        }
    }
}));
let visibilityModel = computed({
    get () {
        return props.isOpen;
    },
    set (value) {
        emit('update:is-open', value);
    }
});
const recipientCount = computed(() => {
    const str = state.data?.length > 1 ? 'recipients' : 'recipient';
    return `${state.data?.length} ${str}`;
});

onMounted(() => {
    getData();
});

const v$ = useVuelidate(rules, state, { $autoDirty: true });

function getData () {
    state.getListError = null;
    state.getListLoading = true;

    return new Promise(resolve => {
        setTimeout(() => {
            state.data = mockData.map(user => ({ ...user, isOpenRulesPopup: false, id: Math.random() }));
            state.getListLoading = false;
            resolve();
        }, 3000);
    }).catch(e => state.getListError = e);
}

async function addToList () {
    const validationRes = await v$.value.emailField.$validate();
    if (!validationRes) return;
    const newItem = {
        email: state.emailField.value,
        id: Math.random(),
        name: null,
        surname: null,
        isAdmin: false
    };
    state.data = [newItem, ...state.data];
    state.emailField.value = '';
    v$.value.emailField.$reset();
}

function removeFromList ({ id }) {
    state.data = state.data.filter(item => item.id !== id);
}

async function sendData () {
    const validationRes = await v$.value.messageField.$validate();
    if (!validationRes) return;

    state.sendDataLoading = true;
    state.sendDataError = null;

    try {
        await new Promise(resolve => {
            setTimeout(() => {
                state.sendDataLoading = false;
                visibilityModel.value = false;
                state.data = [];
                $q.notify({
                    type: 'positive',
                    message: 'Invites have been sent'
                });
                resolve();
            }, 2500);
        });
    } catch (e) {
        state.sendDataError = e;
        state.sendDataLoading = false;
    }

}

</script>

<style lang="scss">
@import '@/styles/invite-and-share-modal.scss';
</style>
