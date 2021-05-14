import * as op from '../mutations-types'

const state = {
    rowIndex: 0,
    form: {
        index: '',
        carId: '',
        parkId: '',
        inparkway: '',
        outparkway: '',
        payStatus: '',
        payway: '',
        money: '',
        coupon: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        start: '',
        end: ''
    }
}

const getters = {
    form: (state) => state.form,
    rowIndex: (state) => state.rowIndex,
    index: (state) => state.form.index,
    carId: (state) => state.form.carId,
    parkId: (state) => state.form.parkId,
    inparkway: (state) => state.form.inparkway,
    outparkway: (state) => state.form.outparkway,
    payStatus: (state) => state.form.payStatus,
    payway: (state) => state.form.payway,
    money: (state) => state.form.money,
    coupon: (state) => state.form.coupon,
    startDate: (state) => state.form.startDate,
    startTime: (state) => state.form.startTime,
    endDate: (state) => state.form.endDate,
    endTime: (state) => state.form.endTime,
    start: (state) => state.form.start,
    end: (state) => state.form.end
}

const mutations = {
    [op.ORDER_UPADTE_VALUE] (state, payload) {
        switch (payload.key) {
            case 'index':
                state.form.index = payload.val
                break
            case 'carId':
                state.form.carId = payload.val
                break
            case 'payStatus':
                state.form.payStatus = payload.val
                if (state.form.payStatus === '未支付') {
                    state.form.money = '0'
                    state.form.payway = '无'
                }
                break
            case 'parkId':
                state.form.parkId = payload.val
                break
            case 'inparkway':
                state.form.inparkway = payload.val
                break
            case 'outparkway':
                state.form.outparkway = payload.val
                break
            case 'payway':
                state.form.payway = payload.val
                break
            case 'money':
                state.form.money = payload.val
                break
            case 'coupon':
                state.form.coupon = payload.val
                break
            case 'startDate':
                state.form.startDate = payload.val
                break
            case 'startTime':
                state.form.startTime = payload.val
                break
            case 'endDate':
                state.form.endDate = payload.val
                break
            case 'endTime':
                state.form.endTime = payload.val
                break
            case 'start':
                state.form.start = payload.val
                break
            case 'end':
                state.form.end = payload.val
                break
            default:
                break
        }
    },
    [op.ORDER_INIT_EDIT_FORM] (state, payload) {
        state.rowIndex = payload.index
        for (let key in payload.row) {
            state.form[key] = payload.row[key]
        }
        state.form.startDate = new Date(state.form.start)
        state.form.startTime = new Date(state.form.start)
        state.form.endDate = new Date(state.form.end)
        state.form.endTime = new Date(state.form.end)
    }
}

const actions = {
    initEditForm ({commit}, payload) {
        commit('ORDER_INIT_EDIT_FORM', payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
