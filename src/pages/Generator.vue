<template>
    <div class="flex flex-col gap-3">
        <div v-if="$store.state.demoMode"
             class="flex items-center justify-between gap-4 rounded-[10px] bg-[#5856d6] px-5 py-3 text-white">
            <span>{{ $t('demoNotice') }}</span>
            <button class="shrink-0 underline"
                    @click="exitDemo">
                {{ $t('demoExit') }}
            </button>
        </div>
        <table-buttons />
        <table-block />
    </div>
</template>
<script>
import tableBlock from "@/components/generator/table-block.vue"
import tableButtons from '@/components/generator/table-buttons.vue'
import printBlock from "@/components/labels/print-block.vue";
export default {
    components: { tableBlock, tableButtons, printBlock },
    methods: {
        exitDemo() {
            this.$store.commit('setDemoMode', false)
            this.$router.push('/auth')
        }
    }
}
</script>