<template>
    <div class="flex gap-3 flex-col">
        <div v-if="$store.state.demoMode"
             class="flex items-center justify-between gap-4 rounded-[10px] bg-[#5856d6] px-5 py-3 text-white">
            <span>{{ $t('demoNotice') }}</span>
            <button class="shrink-0 underline"
                    @click="exitDemo">
                {{ $t('demoExit') }}
            </button>
        </div>
        <header-buttons />
        <div class="w-full min-h-[625px] bg-white p-5 flex flex-col gap-3 rounded-[10px] relative">
            <table-block />
            <page-buttons />
        </div>
    </div>
    <label-block v-if="$store.state.labelModule.printActive" />
    <menu-block v-show="$store.state.labelModule.menuActive" />
</template>
<script>
import headerButtons from '@/components/labels/header-buttons'
import tableBlock from '@/components/labels/table-block'
import pageButtons from "@/components/labels/page-buttons"
import menuBlock from '@/components/labels/menu-block'
import labelBlock from '@/components/labels/label-block'
export default {
    components: {
        tableBlock,
        pageButtons,
        headerButtons,
        menuBlock,
        labelBlock
    },
    methods: {
        exitDemo() {
            this.$store.commit('setDemoMode', false)
            this.$router.push('/auth')
        }
    }
}
</script>



