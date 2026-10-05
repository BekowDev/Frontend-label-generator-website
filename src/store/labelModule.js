import { LabelAPI } from "@/api/LabelAPI"
import { demoLabels } from "./demoData"

export const labelModule = {
    state: () => ({
        dialogWrapper: false,
        menuActive: false,
        sortActive: false,
        printActive: false,
        printing: false,
        labels: [],
        demoLabels: demoLabels.map(label => ({ ...label })),
        chosenLabel: undefined,
        chosenLabels: [],
        totalPage: '0',
        getData: {
            sortBy: "addedDate",
            sortOrder: "desc",
            page: "1",
            limit: "8",
            search: ""
        },
        labelOptions: {
            width: 58,
            height: 40,
        },
        barcodeOptions: {
            width: 1,
            height: 30,
            textMargin: 0,
            font: 'Arial',
            margin: 0,
            flat: true,
            displayValue: true,
            format: "CODE128",
            fontSize: 11,
        },
        printSettings: {
            colorSizeSameLine: false,
            eac: false,
            noCertificate: false,
            centered: false,
            YCentered: false
        },
    }),
    getters: {
        allLabels(state) {
            return state.labels
        },
    },
    mutations: {
        setDialogWrapper(state, value) {
            state.dialogWrapper = value
            if (!value) {
                state.menuActive = false
                state.sortActive = false
                state.printActive = false
                state.chosenLabel = {}
                state.barcodeOptions = {
                    width: 1,
                    height: 30,
                    textMargin: 0,
                    font: 'Arial',
                    margin: 0,
                    flat: false,
                    format: "CODE128",
                    fontSize: 11,
                }
                state.printSettings = {
                    colorSizeSameLine: false,
                    eac: false,
                    noCertificate: false,
                    centered: false,
                    YCentered: false
                }
                state.labelOptions = {
                    width: 58,
                    height: 40,
                }
            }
        },
        setPrinting(state) {
            state.printing = !state.printing
        },
        setLabelWidth(state, value) {
            if (value < 100)
                state.labelOptions.width = +value
        },
        setLabelHeight(state, value) {
            if (value < 48)
                state.labelOptions.height = +value
        },
        setSortDialog(state) {
            state.sortActive = !state.sortActive
        },
        setMenuActive(state) {
            state.menuActive = !state.menuActive
        },
        setPrintActive(state) {
            state.printActive = !state.printActive
        },
        setFormat(state, value) {
            state.barcodeOptions.format = value
        },
        setFontSize(state, value) {
            state.barcodeOptions.fontSize = +value
        },
        setColorSizeSameLine(state, value) {
            state.printSettings.colorSizeSameLine = value
        },
        setEac(state, value) {
            state.printSettings.eac = value
        },
        setNoCertificate(state, value) {
            state.printSettings.noCertificate = value
        },
        setCentered(state, value) {
            state.printSettings.centered = value
        },
        setYCentered(state, value) {
            state.printSettings.YCentered = value
        },
        setChosenLabel(state, value) {
            state.chosenLabel = value
        },
        deleteFromChosenLabels(state, id) {
            state.chosenLabels = state.chosenLabels.filter((r) => r._id !== id)
        },
        clearChosenLabels(state) {
            state.chosenLabels = []
        },
        setChosenLabels(state, { obj, checked, limit }) {
            if (limit !== state.chosenLabels.length)
                checked ? state.chosenLabels.push(obj) : (state.chosenLabels = state.chosenLabels.filter((r) => r._id !== obj._id))
        },
        setLabels(state, value) {
            state.labels = value.map(e => ({ ...e, chose: false }))
        },
        addDemoLabels(state, labels) {
            const createdAt = new Date().toISOString()
            labels.forEach((label, index) => {
                state.demoLabels.unshift({
                    ...label,
                    _id: `demo-${Date.now()}-${index}`,
                    addedDate: createdAt,
                })
            })
        },
        updateDemoLabels(state, labels) {
            labels.forEach((label) => {
                const index = state.demoLabels.findIndex(item => item._id === label._id)
                if (index !== -1)
                    state.demoLabels.splice(index, 1, { ...state.demoLabels[index], ...label })
            })
        },
        deleteDemoLabels(state, ids) {
            state.demoLabels = state.demoLabels.filter(label => !ids.includes(label._id))
        },
        setSortBy(state, value) {
            state.getData.sortBy = value
        },
        setSortOrder(state, value) {
            state.getData.sortOrder = value
        },
        setSearch(state, value) {
            state.getData.search = value
        },
        setTotalPage(state, value) {
            state.totalPage = Math.ceil(value / state.getData.limit).toString()
        },
        setPage(state, { numbers, value }) {
            if (numbers)
                state.getData.page = value
            else
                state.getData.page = String(value === "+" ?
                    parseInt(state.getData.page) + 1 : parseInt(state.getData.page) - 1)
        },
    },
    actions: {
        async getLabels({ commit, state, rootState }) {
            if (rootState.demoMode) {
                const search = state.getData.search.toLowerCase()
                const filteredLabels = state.demoLabels
                    .filter(label => Object.values(label).some(value => String(value).toLowerCase().includes(search)))
                    .sort((first, second) => {
                        const firstValue = first[state.getData.sortBy] || ""
                        const secondValue = second[state.getData.sortBy] || ""
                        const comparison = String(firstValue).localeCompare(String(secondValue))
                        return state.getData.sortOrder === "desc" ? -comparison : comparison
                    })
                const start = (Number(state.getData.page) - 1) * Number(state.getData.limit)
                commit('setLabels', filteredLabels.slice(start, start + Number(state.getData.limit)))
                commit('setTotalPage', filteredLabels.length)
                return
            }

            try {
                setTimeout(
                    async () => {
                        const res = await LabelAPI.getLabels(state.getData);
                        commit('setLabels', res.data.labels);
                        commit('setTotalPage', res.data.totalPage);
                    }, 500);
            }
            catch (error) {
                console.error("Ошибка при отправке POST-запроса:", error)
            }
        },
        async deleteLabels({ commit, state, rootState }) {
            try {
                const deleteIds = state.chosenLabels.map((obj) => {
                    return obj._id.toString()
                })
                if (rootState.demoMode) {
                    commit('deleteDemoLabels', deleteIds)
                    commit('clearChosenLabels')
                    return
                }
                await LabelAPI.deleteLabels(deleteIds)
                commit('clearChosenLabels')
            } catch (error) {
                console.error("Ошибка при отправке POST-запроса:", error)
            }
        },
        async deleteLabel({ commit, rootState }, id) {
            try {
                if (rootState.demoMode) {
                    commit('deleteDemoLabels', [id])
                    commit('deleteFromChosenLabels', id)
                    return
                }
                const deleteId = [id]
                await LabelAPI.deleteLabels(deleteId)
                commit('deleteFromChosenLabels', id)
            } catch (error) {
                console.error("Ошибка при отправке POST-запроса:", error)
            }
        },
    },
}