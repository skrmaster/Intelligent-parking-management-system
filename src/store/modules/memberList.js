import * as op from '../mutations-types'

const state = {
    memberTableData: [],
    memberAddStatus: false,
    memberEditStatus: false
}

const getters = {
    memberTableData: (state) => state.memberTableData,
    memberAddStatus: (state) => state.memberAddStatus,
    memberEditStatus: (state) => state.memberEditStatus
}

const mutations = {
    [op.MEMBER_SET_EACH_ORDER] (state, newTableData) {
        Array.isArray(newTableData) 
        ? state.memberTableData = newTableData
        : console.log('not a Array')
    },
    [op.MEMBER_DELETE_ROW] (state, rowIndex) {
        state.memberTableData.splice(rowIndex, 1)
    },
    [op.MEMBER_UPDATE_ROW] (state, payload) {
        for (let key in payload.newData) {
            state.memberTableData[payload.index][key] = payload.newData[key]
        }
    },
    [op.MEMBER_OPEN_DIALOG] (state, ae) {
        ae === 'add' ? state.memberAddStatus = true : state.memberEditStatus = true
    },
    [op.MEMBER_CLOSE_DIALOG] (state, ae) {
        ae === 'add' ? state.memberAddStatus = false : state.memberEditStatus = false
    },
    [op.MEMBER_SET_DIALOG] (state, ae, val) {
        ae === 'add' ? state.memberAddStatus = val : state.memberEditStatus = val 
    }
}

const actions = {
    mupdateTable ({commit}, payload) {
        commit('MEMBER_SET_EACH_ORDER', payload)
    },
    mdeleteRow ({state, commit}, rowIndex) {
        commit('MEMBER_DELETE_ROW', rowIndex)
    },
    mupdateRow ({commit}, payload) {
        commit('MEMBER_UPDATE_ROW', payload)
    },
    mopen ({commit}, ae) {
        commit('MEMBER_OPEN_DIALOG', ae)
    },
    mclose ({commit}, ae) {
        commit('MEMBER_CLOSE_DIALOG', ae)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
