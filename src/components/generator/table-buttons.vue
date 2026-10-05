<template>
    <div class="flex justify-between gap-2 px-5">
        <div class="flex gap-3">
            <base-button
                class="flex flex-1 items-center gap-2"
                @click.prevent="saveLabels"
            >
                <img
                    src="@/assets/icons/download.png"
                    class="w-[16px]"
                >
                <div>
                    {{ $t('saveButtonG') }}
                </div>
            </base-button>
        </div>
        <div class="flex gap-[24px] text-[16px] text-[#4e4e53] font-medium">
            <button
                :disabled="($store.state.generatorModule.tableRowLimit == $store.state.generatorModule.tableLength || $store.state.generatorModule.editMode ? true : false)"
                @click="$store.commit('createRow')"
                class="flex items-center gap-2"
            >
                <svg
                    fill="#4e4e53"
                    viewBox="0 0 30 30"
                    class="rotate-45 w-[16px]"
                >
                    <path
                        d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"
                    />
                </svg>
                {{ $t('addRowButtonG') }}
            </button>
            <button
                @click="$store.commit('clearTable')"
                :disabled="$store.state.generatorModule.editMode"
                class="flex items-center gap-2"
            >
                <svg
                    fill="none"
                    height="16"
                    viewBox="-2 -1 24 24"
                    width="16"
                >
                    <path
                        clip-rule="evenodd"
                        d="M7 0H13C14.1046 0 15 0.89543 15 2V3H18C19.1046 3 20 3.89543 20 5V7C20 8.10457 19.1046 9 18 9H17.9199L17 20C17 21.1046 16.1046 22 15 22H5C3.89543 22 3 21.1046 3.00345 20.083L2.07987 9H2C0.89543 9 0 8.10457 0 7V5C0 3.89543 0.89543 3 2 3H5V2C5 0.89543 5.89543 0 7 0ZM2 5H5H15H18V7H2V5ZM4.08649 9H15.9132L15.0035 19.917L15 20H5L4.08649 9ZM13 2V3H7V2H13Z"
                        fill="#4e4e53"
                        fill-rule="evenodd"
                    ></path>
                </svg>
                {{ $t('clearButtonG') }}
            </button>
            <button
                @click="$store.commit('showColumnSettingsDialog', true)"
                class="flex items-center gap-2 outline-button"
            >
                <svg
                    class="w-[16px]"
                    viewBox="0,0,256,256"
                    fill-rule="nonzero"
                    fill="#4e4e53"
                >

                    <g transform="scale(10.66667,10.66667)">
                        <path
                            d="M10.49023,2c-0.479,0 -0.88847,0.33859 -0.98047,0.80859l-0.33398,1.71484c-0.82076,0.31036 -1.57968,0.74397 -2.24609,1.29102l-1.64453,-0.56641c-0.453,-0.156 -0.95141,0.03131 -1.19141,0.44531l-1.50781,2.61328c-0.239,0.415 -0.15202,0.94186 0.20898,1.25586l1.31836,1.14648c-0.06856,0.42135 -0.11328,0.8503 -0.11328,1.29102c0,0.44072 0.04472,0.86966 0.11328,1.29102l-1.31836,1.14648c-0.361,0.314 -0.44798,0.84086 -0.20898,1.25586l1.50781,2.61328c0.239,0.415 0.73841,0.60227 1.19141,0.44727l1.64453,-0.56641c0.6662,0.54671 1.42571,0.97884 2.24609,1.28906l0.33398,1.71484c0.092,0.47 0.50147,0.80859 0.98047,0.80859h3.01953c0.479,0 0.88847,-0.33859 0.98047,-0.80859l0.33399,-1.71484c0.82076,-0.31036 1.57968,-0.74397 2.24609,-1.29102l1.64453,0.56641c0.453,0.156 0.95141,-0.03031 1.19141,-0.44531l1.50781,-2.61523c0.239,-0.415 0.15202,-0.93991 -0.20898,-1.25391l-1.31836,-1.14648c0.06856,-0.42135 0.11328,-0.8503 0.11328,-1.29102c0,-0.44072 -0.04472,-0.86966 -0.11328,-1.29102l1.31836,-1.14648c0.361,-0.314 0.44798,-0.84086 0.20898,-1.25586l-1.50781,-2.61328c-0.239,-0.415 -0.73841,-0.60227 -1.19141,-0.44727l-1.64453,0.56641c-0.6662,-0.54671 -1.42571,-0.97884 -2.24609,-1.28906l-0.33399,-1.71484c-0.092,-0.47 -0.50147,-0.80859 -0.98047,-0.80859zM12,8c2.209,0 4,1.791 4,4c0,2.209 -1.791,4 -4,4c-2.209,0 -4,-1.791 -4,-4c0,-2.209 1.791,-4 4,-4z"
                        >
                        </path>
                    </g>

                </svg>
                {{ $t('settingsButtonG') }}
            </button>
            <base-button
                class="flex items-center gap-2"
                @click="$router.push('/labels'), $store.commit('setEditMode', false), $store.commit('clearTable')"
            >
                {{ $t('backButtonG') }}
                <img
                    src="@\assets\icons\back.png"
                    class="w-[18px] rotate-180"
                >
            </base-button>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        async saveLabels() {
            const saved = await this.$store.dispatch('sendLabels')
            if (saved && this.$store.state.demoMode)
                this.$router.push('/labels')
        }
    }
}
</script>
