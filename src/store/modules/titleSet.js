import * as op from '../mutations-types'

const state = {
    title: sessionStorage.getItem('title') || '',
    activeIndex: sessionStorage.getItem('activeIndex') || '1'
}

const getters = {
    title: (state) => state.title,
    activeIndex: (state) => state.activeIndex
}

const mutations = {
    [op.CHANGE_TITLE] (state, text) {
        state.title = text
        sessionStorage.setItem('title', text)
    },
    [op.CHANGE_TITLE_INDEX] (state, index) {
        state.activeIndex = index
        sessionStorage.setItem('activeIndex', index)
    }
}

const actions = {
    change ({state, commit}, {title, index}) {
        commit('CHANGE_TITLE', title)
        commit('CHANGE_TITLE_INDEX', index)
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
