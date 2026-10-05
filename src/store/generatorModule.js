import { LabelAPI } from "@/api/LabelAPI"
export const generatorModule = {
    state: () => ({
        editMode: false,

        dialogVisibleColumnSettings: false,
        dialogVisiblePrint: false,
        tableRowLimit: 15,
        tableLength: 1,

        sameValueCheckbox: {
            sku: false,
            color: false,
            size: false,
            name: false,
            seller: false,
            date: false,
            country: false,
            brand: false,
            composition: false,
            freeTitle: false,
        },
        colVisible: {
            sku: true,
            color: true,
            size: true,
            name: true,
            seller: true,
            date: false,
            country: false,
            brand: false,
            composition: false,
            freeTitle: false,
        },
        barcodeLetters: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        rowLimit: {
            barcode: 16,
            sku: 30,
            color: 80,
            size: 20,
            name: 40,
            seller: 30,
            date: 40,
            country: 30,
            brand: 40,
            composition: 50,
            freeTitle: 150,
        },
        rows: [
            {
                _id: 1,
                barcode: "",
                sku: "",
                color: "",
                size: "",
                name: "",
                seller: "",
                date: "",
                country: "",
                brand: "",
                composition: "",
                freeTitle: "",
            },
        ],
    }),
    getters: {
        allRows(state) {
            return state.rows
        },
    },
    mutations: {
        editLabels(state, editArray) {
            state.rows = []
            if (!state.rows.length) {
                state.editMode = true
                state.rows = editArray
            }
        },
        setEditMode(state, value) {
            state.editMode = value
        },
        setBarcode(state, obj) {
            let index = state.rows.findIndex((r) => r._id === obj.id)
            if (index !== -1) {
                state.rows[index].barcode = obj.value.toLowerCase().replace(/[^a-zA-Z0-9]/g, ' ')
                state.rows[index].barcode = state.rows[index].barcode.trim().slice(0, state.rowLimit.barcode)
            }
        },
        setSku(state, obj) {
            let index = state.rows.findIndex((r) => r._id === obj.id)
            if (index !== -1) {
                state.rows[index].sku = obj.value
                state.rows[index].sku = state.rows[index].sku.slice(0, state.rowLimit.sku)
            }
        },
        setColor(state, obj) {
            let index = state.rows.findIndex((r) => r._id === obj.id)
            if (index !== -1) {
                state.rows[index].color = obj.value
                state.rows[index].color = state.rows[index].color.slice(0, state.rowLimit.color)
            }
        },
        setSize(state, obj) {
            let index = state.rows.findIndex((r) => r._id === obj.id)
            if (index !== -1) {
                state.rows[index].size = obj.value
                state.rows[index].size = state.rows[index].size.slice(0, state.rowLimit.size)
            }
        },
        setName(state, obj) {
            let index = state.rows.findIndex((r) => r._id === obj.id)
            if (index !== -1) {
                state.rows[index].name = obj.value
                state.rows[index].name = state.rows[index].name.slice(0, state.rowLimit.name)
            }
        },
        setSeller(state, obj) {
            let index = state.rows.findIndex((r) => r._id === obj.id)
            if (index !== -1) {
                state.rows[index].seller = obj.value
                state.rows[index].seller = state.rows[index].seller.slice(0, state.rowLimit.seller)
            }
        },
        setDate(state, obj) {
            let index = state.rows.findIndex((r) => r._id === obj.id)
            if (index !== -1) {
                state.rows[index].date = obj.value
                state.rows[index].date = state.rows[index].date.slice(0, state.rowLimit.date)
            }
        },
        setCountry(state, obj) {
            let index = state.rows.findIndex((r) => r._id === obj.id)
            if (index !== -1) {
                state.rows[index].country = obj.value
                state.rows[index].country = state.rows[index].country.slice(0, state.rowLimit.country)
            }
        },
        setBrand(state, obj) {
            let index = state.rows.findIndex((r) => r._id === obj.id)
            if (index !== -1) {
                state.rows[index].brand = obj.value
                state.rows[index].brand = state.rows[index].brand.slice(0, state.rowLimit.brand)
            }
        },
        setComposition(state, obj) {
            let index = state.rows.findIndex((r) => r._id === obj.id)
            if (index !== -1) {
                state.rows[index].composition = obj.value
                state.rows[index].composition = state.rows[index].composition.slice(0, state.rowLimit.composition)
            }
        },
        setFreeTitle(state, obj) {
            let index = state.rows.findIndex((r) => r._id === obj.id)
            if (index !== -1) {
                state.rows[index].freeTitle = obj.value
                state.rows[index].freeTitle = state.rows[index].freeTitle.slice(0, state.rowLimit.freeTitle)
            }
        },
        // !set same values active or not
        activeSameValue(state, obj) {
            switch (obj.name) {
                case "sku":
                    state.sameValueCheckbox.sku = obj.value
                    break
                case "color":
                    state.sameValueCheckbox.color = obj.value
                    break
                case "size":
                    state.sameValueCheckbox.size = obj.value
                    break
                case "name":
                    state.sameValueCheckbox.name = obj.value
                    break
                case "seller":
                    state.sameValueCheckbox.seller = obj.value
                    break
                case "date":
                    state.sameValueCheckbox.date = obj.value
                    break
                case "country":
                    state.sameValueCheckbox.country = obj.value
                    break
                case "brand":
                    state.sameValueCheckbox.brand = obj.value
                    break
                case "composition":
                    state.sameValueCheckbox.composition = obj.value
                    break
                case "freeTitle":
                    state.sameValueCheckbox.freeTitle = obj.value
                    break
            }
        },
        // !set same values to column fields START
        setSameSku(state, value) {
            state.rows.forEach((row) => {
                row.sku = value
            })
        },
        setSameColor(state, value) {
            state.rows.forEach((row) => {
                row.color = value
            })
        },
        setSameSize(state, value) {
            state.rows.forEach((row) => {
                row.size = value
            })
        },
        setSameName(state, value) {
            state.rows.forEach((row) => {
                row.name = value
            })
        },
        setSameSeller(state, value) {
            state.rows.forEach((row) => {
                row.seller = value
            })
        },
        setSameDate(state, value) {
            state.rows.forEach((row) => {
                row.date = value
            })
        },
        setSameCountry(state, value) {
            state.rows.forEach((row) => {
                row.country = value
            })
        },
        setSameBrand(state, value) {
            state.rows.forEach((row) => {
                row.brand = value
            })
        },
        setSameComposition(state, value) {
            state.rows.forEach((row) => {
                row.composition = value
            })
        },
        setSameFreeTitle(state, value) {
            state.rows.forEach((row) => {
                row.freeTitle = value
            })
        },
        // !field-settings START
        setSkuVisible(state, value) {
            state.colVisible.sku = value
            if (value == false) {
                state.rows.forEach((row) => {
                    row.sku = ""
                })
                state.sameValueCheckbox.sku = false
            }
        },
        setColorVisible(state, value) {
            state.colVisible.color = value
            if (value == false) {
                state.rows.forEach((row) => {
                    row.color = ""
                })
                state.sameValueCheckbox.color = false
            }
        },
        setSizeVisible(state, value) {
            state.colVisible.size = value
            if (value == false) {
                state.rows.forEach((row) => {
                    row.size = ""
                })
                state.sameValueCheckbox.size = false
            }
        },
        setNameVisible(state, value) {
            state.colVisible.name = value
            if (value == false) {
                state.rows.forEach((row) => {
                    row.name = ""
                })
                state.sameValueCheckbox.name = false
            }
        },
        setSellerVisible(state, value) {
            state.colVisible.seller = value
            if (value == false) {
                state.rows.forEach((row) => {
                    row.seller = ""
                })
                state.sameValueCheckbox.seller = false
            }
        },
        setDateVisible(state, value) {
            state.colVisible.date = value
            if (value == false) {
                state.rows.forEach((row) => {
                    row.date = ""
                })
                state.sameValueCheckbox.date = false
            }
        },
        setCountryVisible(state, value) {
            state.colVisible.country = value
            if (value == false) {
                state.rows.forEach((row) => {
                    row.country = ""
                })
                state.sameValueCheckbox.country = false
            }
        },
        setBrandVisible(state, value) {
            state.colVisible.brand = value
            if (value == false) {
                state.rows.forEach((row) => {
                    row.brand = ""
                })
                state.sameValueCheckbox.brand = false
            }
        },
        setCompositionVisible(state, value) {
            state.colVisible.composition = value
            if (value == false) {
                state.rows.forEach((row) => {
                    row.composition = ""
                })
                state.sameValueCheckbox.composition = false
            }
        },
        setFreeTitleVisible(state, value) {
            state.colVisible.freeTitle = value
            if (value == false) {
                state.rows.forEach((row) => {
                    row.freeTitle = ""
                })
                state.sameValueCheckbox.freeTitle = false
            }
        },
        // !Table methods  "create-delete-clear" rows
        createRow(state) {
            if (state.tableLength < state.tableRowLimit) {
                state.tableLength += 1
                state.rows.push({
                    _id: Date.now(),
                    barcode: "",
                    sku: "",
                    color: "",
                    size: "",
                    name: "",
                    seller: "",
                    date: "",
                    country: "",
                    brand: "",
                    composition: "",
                    freeTitle: "",
                })
            }
        },
        deleteRow(state, id) {
            state.tableLength -= 1
            state.rows = state.rows.filter((r) => r._id !== id)
        },
        clearTable(state) {
            state.rows.splice(0, state.rows.length)
            state.rows.push({
                _id: Date.now(),
                barcode: "",
                sku: "",
                color: "",
                size: "",
                name: "",
                seller: "",
                date: "",
                country: "",
                brand: "",
                composition: "",
                freeTitle: "",
            })
            state.tableLength = 1
            state.sameValueCheckbox = {
                sku: false,
                color: false,
                size: false,
                name: false,
                seller: false,
                date: false,
                country: false,
                brand: false,
                composition: false,
                freeTitle: false,
            }
            state.colVisible = {
                sku: true,
                color: true,
                size: true,
                name: true,
                seller: true,
                date: false,
                country: false,
                brand: false,
                composition: false,
                freeTitle: false,
            }
        },
        //! Show and hide "Table columns(fields)" dialog
        showPrintDialog(state, value) {
            state.dialogVisiblePrint = value
        },
        showColumnSettingsDialog(state, value) {
            state.dialogVisibleColumnSettings = value
        },
    },
    actions: {
        async sendLabels({ commit, state, rootState }) {
            if (rootState.demoMode) {
                const validRows = state.rows.filter(row => row.barcode.trim())
                if (!validRows.length) {
                    alert('Укажите штрихкод хотя бы для одной позиции')
                    return false
                }

                if (state.editMode) {
                    commit('updateDemoLabels', validRows)
                    commit('setEditMode', false)
                }
                else {
                    const labels = validRows.map(({ _id, ...label }) => label)
                    commit('addDemoLabels', labels)
                }
                commit('clearTable')
                return true
            }

            try {
                if (state.editMode) {
                    if (state.rows.some(row => row.barcode !== "")) {
                        const res = await LabelAPI.changeLabels(state.rows)
                        if (res) {
                            commit('setEditMode', false)
                            commit('clearTable')
                            return true
                        }
                    }
                    else {
                        alert('Barcode!')
                    }
                }
                else {
                    const data = state.rows.map(({ _id, ...temp }) => temp); // убрать id всех элементов
                    await LabelAPI.createLabels(data)
                    commit('clearTable')
                    return true
                }
            } catch (error) {
                console.error("Ошибка при отправке POST-запроса:", error)
                return false
            }
        },
    },
}
