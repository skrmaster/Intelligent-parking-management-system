import * as op from '../mutations-types'

const state = {
    tableData: [],
    rowToExport: [],
    tmpRowToExport: [],
    addstatus: false,
    editstatus: false,
}

const getters = {
    tableData: (state) => state.tableData,
    rowToExport: (state) => state.rowToExport,
    tmpRowToExport: (state) => state.tmpRowToExport,
    addstatus: (state) => state.addstatus,
    editstatus: (state) => state.editstatus
}

const mutations = {
    [op.ORDER_SET_EACH_ORDER] (state, newTableData) {
        Array.isArray(newTableData) 
        ? state.tableData = newTableData
        : console.log('not a Array')
    },
    [op.ORDER_UPDATE_ROW_CONTEXT] (state, payload) {
        state.rowToExport = payload
    },
    [op.ORDER_DELETE_ROW] (state, rowIndex) {
        state.tableData.splice(rowIndex, 1)
    },
    [op.ORDER_UPDATE_ROW] (state, payload) {
        for (let key in payload.newData) {
            state.tableData[payload.index][key] = payload.newData[key]
        }
    },
    [op.ORDER_SAVE_TMP_ROW] (state) {
        state.tmpRowToExport = state.tmpRowToExport.concat(state.rowToExport)
    },
    [op.ORDER_OPEN_DIALOG] (state, ae) {
        ae === 'add' ? state.addstatus = true : state.editstatus = true
    },
    [op.ORDER_CLOSE_DIALOG] (state, ae) {
        ae === 'add' ? state.addstatus = false : state.editstatus = false
    },
    [op.ORDER_SET_DIALOG] (state, ae, val) {
        ae === 'add' ? state.addstatus = val : state.editstatus = val 
    }
}

const actions = {
    updateExportRow ({commit}, payload) {
        commit('ORDER_UPDATE_ROW_CONTEXT', payload)
    },
    updateTable ({commit}, payload) {
        commit('ORDER_SET_EACH_ORDER', payload)
    },
    deleteRow ({state, commit}, rowIndex) {
        commit('ORDER_DELETE_ROW', rowIndex)
    },
    updateRow ({commit}, payload) {
        commit('ORDER_UPDATE_ROW', payload)
    },
    saveCurrentExportOrder ({commit}) {
        commit('ORDER_SAVE_TMP_ROW')
    },
    open ({commit}, ae) {
        commit('ORDER_OPEN_DIALOG', ae)
    },
    close ({commit}, ae) {
        commit('ORDER_CLOSE_DIALOG', ae)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
