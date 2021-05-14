import api from '../../api/sign'
import * as op from '../mutations-types'

const state = {
    token: sessionStorage.getItem('adminToken'),
    info: sessionStorage.getItem('adminInfo'),
}

const getters = {
    adminToken: (state) => state.token,
    adminInfo: (state) => state.info
}

const mutations = {
    [op.CREATE_TOKEN] (state, token) {
        state.token = token
        sessionStorage.setItem('adminToken', token)
    },
    [op.CREATE_USERINFO] (state, info) {
        state.info = info
        sessionStorage.setItem('adminInfo', info)
    },
    [op.DELETE] () {
        sessionStorage.setItem('adminInfo', '')
        sessionStorage.setItem('adminToken', '')
        sessionStorage.setItem('title', '')
        sessionStorage.setItem('activeIndex', '1')
    }
}

const actions = {
    createToken ({ commit }, { username, password }) {
        return api.createToken(username, password).then((res) => {
            if (res.data.err_code === 0) {
                commit('CREATE_TOKEN', res.data.token)
                commit('CREATE_USERINFO', res.data.name)
                commit('CHANGE_TITLE', '数据中心')
            }
            return new Promise((resolve) => {
                return resolve(res)
            })
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
