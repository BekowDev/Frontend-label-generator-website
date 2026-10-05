<template>
    <header class="h-20 flex items-center justify-between">
        <h1 class="text-4xl font-bold cursor-pointer"
            @click="$router.push('/')">
            WildCoder
        </h1>

        <div class="flex flex-col gap-2 text-[12px]">
            <div class="flex flex-1 gap-2 items-center justify-between">
                <label>{{ $t('theme') }}:</label>
                <div class="flex border-[1px] border-[#5856d6] rounded-full overflow-hidden">
                    <button class="px-[15px]"
                            @click="$store.commit('setTheme', 'light')"
                            style="transition: all 0.3s;"
                            :style="$store.state.theme == 'light' ? {
                                'background': '#5856d6',
                                'color': '#FFFFFF',
                            } : false">
                        {{ $t('light') }}
                    </button>
                    <button class="px-[15px] py-[2px]"
                            @click="$store.commit('setTheme', 'dark')"
                            style="transition: all 0.3s;"
                            :style="$store.state.theme == 'dark' ? {
                                'background': '#5856d6',
                                'color': '#FFFFFF',
                            } : false">
                        {{ $t('dark') }}
                    </button>
                </div>
            </div>

            <div class="flex flex-1 gap-2 items-center justify-between">
                <label>{{ $t('lang') }}:</label>
                <div class="flex border-[1px] border-[#5856d6] rounded-full overflow-hidden">
                    <button class="px-[15px]"
                            @click="$store.commit('setLanguage', 'ru')"
                            style="transition: all 0.3s;"
                            :style="$store.state.language == 'ru' ? {
                                'background': '#5856d6',
                                'color': '#FFFFFF',
                            } : false">
                        {{ $t('rus') }}
                    </button>
                    <button class="px-[15px] py-[2px]"
                            @click="$store.commit('setLanguage', 'kz')"
                            style="transition: all 0.3s;"
                            :style="$store.state.language == 'kz' ? {
                                'background': '#5856d6',
                                'color': '#FFFFFF',
                            } : false">
                        {{ $t('kaz') }}
                    </button>
                </div>
            </div>
        </div>

    </header>
    <div class="flex items-center justify-center h-[500px] text-[28px] auth-wrapper">
        <div class="flex bg-white relative rounded-[20px]">
            <form class="px-[50px] py-[70px] flex items-center justify-center">
                <div class="flex flex-col gap-3 w-[250px] formAnimationEnter"
                     v-show="!$store.state.authModule.haveAccount">
                    <h3 class="font-medium ">{{ $t('authSignUp') }}</h3>
                    <base-input type="text"
                                :placeholder="$t('authUsername')"
                                v-model="username" />
                    <base-input type="password"
                                placeholder="Пароль"
                                v-model="password" />
                    <auth-button @click.prevent="signUp">
                        {{ $t('authSignUpB') }}
                    </auth-button>
                </div>
                <!-- ? Account have button -->
                <div class="text-center w-[250px]"
                     :style="$store.state.authModule.haveAccount ? 'z-index: 50;' : false"
                     v-show="$store.state.authModule.haveAccount">
                    <h4 class="text-[16px] text-white">
                        {{ $t('authNoAccount') }}
                    </h4>
                    <auth-button style="background: white;"
                                 @click.prevent="$store.commit('toggleAccount', false)"
                                 class="buttonAnimationLeave">
                        {{ $t('authSignUpB') }}
                    </auth-button>

                </div>
            </form>
            <form class="px-[50px] py-[70px] flex items-center justify-center">
                <div class="flex flex-col gap-3 w-[250px] formAnimationLeave"
                     v-show="$store.state.authModule.haveAccount">
                    <h3 class="font-medium ">{{ $t('authSignIn') }}</h3>
                    <base-input type="text"
                                :placeholder="$t('authUsername')"
                                v-model="username" />
                    <base-input type="password"
                                placeholder="Пароль"
                                v-model="password" />
                    <auth-button @click="signIn">
                        {{ $t('authSignInB') }}
                    </auth-button>
                </div>
                <!-- ? Account have button -->
                <div class="text-center w-[250px]"
                     :style="!$store.state.authModule.haveAccount ? 'z-index: 50;' : false"
                     v-show="!$store.state.authModule.haveAccount">
                    <h4 class="text-[16px] text-white">
                        {{ $t('authHaveAccount') }}
                    </h4>
                    <auth-button style="background: white;"
                                 @click.prevent="$store.commit('toggleAccount', true)"
                                 class="buttonAnimationEnter">
                        {{ $t('authSignInB') }}
                    </auth-button>
                </div>
            </form>
            <div class="z-40 absolute bg-[#5856d6] top-0 bottom-0 w-[50%] scale-y-110 transition-block rounded-[20px]"
                 :style="!$store.state.authModule.haveAccount ? 'translate: 100%;' : 'translate: 0%;'"></div>
        </div>
    </div>
    <div class="flex flex-col items-center gap-2 pb-8">
        <base-button @click="startDemo">
            {{ $t('authDemoButton') }}
        </base-button>
        <p class="text-sm text-center">
            {{ $t('authDemoHint') }}
        </p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        startDemo() {
            this.$store.commit('setDemoMode', true)
            this.$router.push('/labels')
        },
        signIn() {
            this.$store.dispatch('signIn', { username: this.username, password: this.password })
        },
        signUp() {
            this.$store.dispatch('signUp', { username: this.username, password: this.password })
        }
    }
}
</script>
<style scoped>
.transition-block {
    transition: all 0.5s;
}
@keyframes buttonAnimationEnter {
    0% {
        color: transparent;
        background: transparent;
        border: 1px solid transparent;
        box-shadow: 0 0 0 transparent;
        translate: 100% 0;
    }
}
@keyframes buttonAnimationLeave {
    0% {
        color: transparent;
        background: transparent;
        border: 1px solid transparent;
        box-shadow: 0 0 0 transparent;
        translate: 100% 0;
    }
}
@keyframes formAnimationEnter {
    0% {
        translate: -10% 0;
    }
}
@keyframes formAnimationLeave {
    0% {
        translate: -10% 0;
    }
}
@keyframes authWrapperAnimationEnter {
    0% {
        translate: -10% 0;
    }
}


.buttonAnimationEnter {
    transition: all 1s ease;
    animation: buttonAnimationEnter var(--animation-speed);
}
.buttonAnimationLeave {
    transition: all 1s ease;
    animation: buttonAnimationLeave var(--animation-speed);

}
.formAnimationEnter {
    animation: formAnimationEnter var(--animation-speed);
}
.formAnimationLeave {
    animation: formAnimationLeave var(--animation-speed);
}
.auth-wrapper {
    animation: authWrapperAnimationEnter var(--animation-page-speed);
}
</style>
