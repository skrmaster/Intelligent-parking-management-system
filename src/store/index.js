import Vue from 'vue'
import Vuex from 'vuex'
import adminToken from './modules/adminToken'
import titleSet from './modules/titleSet'
import orderList from './modules/orderList'
import editOrdrer from './modules/orderListEdit'
import memberList from './modules/memberList'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    adminToken,
    titleSet,
    orderList,
    editOrdrer,
    memberList
  },
  strict: debug
})
