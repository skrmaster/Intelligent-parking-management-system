<template>
<el-dialog width="45%" @closed="closed('1')" title="编辑订单" :visible.sync="dialogFormVisible" @destroy-on-close="true" center>
    <el-row>
        <el-form ref="ruleForm">
            <el-row :gutter="50">
                <el-col :span="10">
                    <el-form-item prop="index_check" label="订单编号" :label-width="formLabelWidth">
                        <el-input v-model="index" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2"></el-col>
                <el-col :span="10">
                    <el-form-item prop="carId_check" label="车牌号码" :label-width="formLabelWidth">
                        <el-input v-model="carId" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="进场时间" required>
                <el-col :span="8">
                    <el-form-item prop="startDate_check">
                        <el-date-picker type="date" placeholder="选择日期" v-model="startTime"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :offset="1" :span="1">-</el-col>
                <el-col :span="8">
                    <el-form-item prop="startTime_check">
                        <el-time-picker placeholder="选择时间" v-model="startTime"></el-time-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="出场时间" required>
                <el-col :span="8">
                    <el-form-item prop="endDate_check">
                        <el-date-picker type="date" placeholder="选择日期" v-model="endTime"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :offset="1" :span="1">-</el-col>
                <el-col :span="8">
                    <el-form-item prop="endTime_check">
                        <el-time-picker placeholder="选择时间" v-model="endTime"></el-time-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-row type="flex" :gutter="0" justify="space-around">
                <el-col :span="6">
                    <el-form-item prop="parkId_check">
                        <el-select v-model="parkId" placeholder="请选择车场">
                            <el-option v-for="item in parkIds" :key="item.value" :label="item.value" :value="item.value">
                                <span style="float: left; font-size: 13px">车场编号</span>
                                <span style="float: right; color: #8492a6;">{{ item.value }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="inparkway_check">
                        <el-select v-model="inparkway" placeholder="请选择进场通道">
                            <el-option v-for="item in inparkways" :key="item.value" :label="item.value" :value="item.value">
                                <span style="float: left; font-size: 13px">进场通道编号</span>
                                <span style="float: right; color: #8492a6;">{{ item.value }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="outparkway_check">
                        <el-select v-model="outparkway" placeholder="请选择出场通道">
                            <el-option v-for="item in outparkways" :key="item.value" :label="item.value" :value="item.value">
                                <span style="float: left; font-size: 13px">出场通道编号</span>
                                <span style="float: right; color: #8492a6;">{{ item.value }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="支付状态" prop="payStatus_check" :label-width="formLabelWidth">
                <el-switch v-model="payStatus" active-value="已支付" inactive-value="未支付" active-text="已支付" inactive-text="未支付">
                </el-switch>
            </el-form-item>
            <el-form :disabled="payStatus === '未支付'">
                <el-form-item label="支付方式" prop="payway_check" :label-width="formLabelWidth">
                    <el-radio v-model="payway" label="在线支付" size="medium">在线支付</el-radio>
                    <el-radio v-model="payway" label="现金" size="medium">现金</el-radio>
                </el-form-item>
                <el-form-item label="支付金额" prop="money_check" :label-width="formLabelWidth">
                    <el-popover placement="top-start" title="停靠时间" width="200" trigger="hover" content="1小时">
                        <el-radio slot="reference" class="mr-2" v-model="money" label="¥5.00" border size="medium">¥5.00</el-radio>
                    </el-popover>
                    <el-popover placement="top-start" title="停靠时间" width="200" trigger="hover" content="2小时">
                        <el-radio slot="reference" class="mr-2" v-model="money" label="¥10.0" border size="medium">¥10.0</el-radio>
                    </el-popover>
                    <el-popover placement="top-start" title="停靠时间" width="200" trigger="hover" content="2+小时">
                        <el-radio slot="reference" v-model="money" label="¥15.0" border size="medium">¥15.0</el-radio>
                    </el-popover>
                </el-form-item>
                <el-form-item label="优惠券" prop="coupon" :label-width="formLabelWidth">
                    <el-radio class="mr-2" v-model="coupon" label="无" border size="small"></el-radio>
                    <el-radio class="mr-2" v-model="coupon" label="¥2.00" border size="small"></el-radio>
                    <el-radio class="mr-2" v-model="coupon" label="¥3.00" border size="small"></el-radio>
                </el-form-item>
            </el-form>
        </el-form>
    </el-row>
    <div slot="footer" class="dialog-footer">
        <el-button @click="myClose()">取消</el-button>
        <el-button type="primary" @click="updateOrder('ruleForm')">确 定</el-button>
    </div>
</el-dialog>
</template>

<script>
export default {
    name: 'OrderEdit',
    data() {
        return {
            formLabelWidth: '80px',
            parkIds: [{
                value: 'C1'
            }, {
                value: 'C2'
            }, {
                value: 'C3'
            }, {
                value: 'C4'
            }],
            inparkways: [{
                value: 'A1'
            }, {
                value: 'A2'
            }, {
                value: 'A3'
            }, {
                value: 'A4'
            }],
            outparkways: [{
                value: 'B1'
            }, {
                value: 'B2'
            }, {
                value: 'B3'
            }, {
                value: 'B4'
            }],
            index_check: [{
                required: true,
                message: '请输入编号',
                trigger: 'blur'
            }],
            carId_check: [{
                required: true,
                message: '请输入车牌号',
                trigger: 'blur'
            }],
            parkId_check: [{
                required: true,
                message: '请输入车场号',
                trigger: 'change'
            }],
            inparkway_check: [{
                required: true,
                message: '请输进场通道',
                trigger: 'change'
            }],
            outparkway_check: [{
                required: true,
                message: '请输出场通道',
                trigger: 'change'
            }],
            payStatus_check: [{
                required: true,
                message: '请选择支付状态',
                trigger: 'change'
            }],
            payway_check: [{
                required: true,
                message: '请选择支付方式',
                trigger: 'change'
            }],
            money_check: [{
                required: true,
                message: '请选择价位',
                trigger: 'change'
            }],
            startTime_check: [{
                required: true,
                type: 'date',
                message: '请选择进场时间',
                trigger: 'blur'
            }],
            startDate_check: [{
                required: true,
                type: 'date',
                message: '请选择进场时间',
                trigger: 'blur'
            }],
            endDate_check: [{
                required: true,
                type: 'date',
                message: '请选择离场时间',
                trigger: 'blur'
            }],
            endTime_check: [{
                required: true,
                type: 'date',
                message: '请选择离场时间',
                trigger: 'blur'
            }]
        }
    },
    computed: {
        dialogFormVisible: {
            get() {
                return this.$store.getters.editstatus
            },
            set(val) {
                this.$store.commit('ORDER_SET_DIALOG', 'edit', val)
            }
        },
        index: {
            get() {
                return this.$store.getters.index
            },
            set(val) {
                this.$store.commit({
                    type: 'ORDER_UPADTE_VALUE',
                    key: 'index',
                    val: val
                })
            }
        },
        carId: {
            get() {
                return this.$store.getters.carId
            },
            set(val) {
                this.$store.commit({
                    type: 'ORDER_UPADTE_VALUE',
                    key: 'carId',
                    val: val
                })
            }
        },
        parkId: {
            get() {
                return this.$store.getters.parkId
            },
            set(val) {
                this.$store.commit({
                    type: 'ORDER_UPADTE_VALUE',
                    key: 'parkId',
                    val: val
                })
            }
        },
        inparkway: {
            get() {
                return this.$store.getters.inparkway
            },
            set(val) {
                this.$store.commit({
                    type: 'ORDER_UPADTE_VALUE',
                    key: 'inparkway',
                    val: val
                })
            }
        },
        outparkway: {
            get() {
                return this.$store.getters.outparkway
            },
            set(val) {
                this.$store.commit({
                    type: 'ORDER_UPADTE_VALUE',
                    key: 'outparkway',
                    val: val
                })
            }
        },
        payStatus: {
            get() {
                return this.$store.getters.payStatus
            },
            set(val) {
                this.$store.commit({
                    type: 'ORDER_UPADTE_VALUE',
                    key: 'payStatus',
                    val: val
                })
            }
        },
        payway: {
            get() {
                return this.$store.getters.payway
            },
            set(val) {
                this.$store.commit({
                    type: 'ORDER_UPADTE_VALUE',
                    key: 'payway',
                    val: val
                })
            }
        },
        money: {
            get() {
                return this.$store.getters.money
            },
            set(val) {
                this.$store.commit({
                    type: 'ORDER_UPADTE_VALUE',
                    key: 'money',
                    val: val
                })
            }
        },
        coupon: {
            get() {
                let val = this.$store.getters.coupon
                let handleval = ''
                if (val === '0') {
                    handleval = '无'
                } else if (val === '1') {
                   handleval = '¥2.00'
                } else if (val === '2') {
                   handleval = '¥3.00'
                }
                return handleval
            },
            set(val) {
                let newval = ''
                if (val === '无') {
                    newval = '0'
                } else if (val === '¥2.00') {
                   newval = '1'
                } else if (val === '¥3.00') {
                   newval = '2'
                }
                this.$store.commit({
                    type: 'ORDER_UPADTE_VALUE',
                    key: 'coupon',
                    val: newval
                })
            }
        },
        startDate: {
            get() {
                return this.$store.getters.startDate
            },
            set(val) {
                this.$store.commit({
                    type: 'ORDER_UPADTE_VALUE',
                    key: 'startDate',
                    val: val
                })
            }
        },
        startTime: {
            get() {
                return this.$store.getters.startTime
            },
            set(val) {
                this.$store.commit({
                    type: 'ORDER_UPADTE_VALUE',
                    key: 'startTime',
                    val: val
                })
            }
        },
        endDate: {
            get() {
                return this.$store.getters.endDate
            },
            set(val) {
                this.$store.commit({
                    type: 'ORDER_UPADTE_VALUE',
                    key: 'endDate',
                    val: val
                })
            }
        },
        endTime: {
            get() {
                return this.$store.getters.endTime
            },
            set(val) {
                this.$store.commit({
                    type: 'ORDER_UPADTE_VALUE',
                    key: 'endTime',
                    val: val
                })
            }
        },
        start: {
            get() {
                return this.$store.getters.start
            },
            set(val) {
                this.$store.commit({
                    type: 'ORDER_UPADTE_VALUE',
                    key: 'start',
                    val: val
                })
            }
        },
        end: {
            get() {
                return this.$store.getters.end
            },
            set(val) {
                this.$store.commit({
                    type: 'ORDER_UPADTE_VALUE',
                    key: 'end',
                    val: val
                })
            }
        }
    },
    methods: {
        closed(allow) {
            if (allow === '1') {
                return
            } else {
                this.$store.dispatch({
                    type: 'updateRow',
                    newData: this.$store.getters.form,
                    index: this.$store.getters.rowIndex
                })
                this.$message({
                    type: 'success',
                    message: '修改成功'
                })
            }
        },
        orderinit() {
            this.axios.get('/api/orderPage').then(res => {
                res !== undefined ?
                    this.$store.dispatch('updateTable', res.data.table) :
                    console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },
        myClose() {
            this.$store.dispatch('close', 'edit')
        },
        updateOrder() {
            let check = this.$store.getters.form
            let result = []
            for (let key in check) {
                if (check[key] === '') {
                    this.$message({
                        type: 'warning',
                        message: '请输入内容'
                    })
                    return
                } else {
                    result.push(true)
                    continue
                }
            }
            if (result[0] === true) {
                let newDate = {}
                for (let key in check) {
                    if (key === 'startDate' || key === 'startTime' || key === 'endDate' || key === 'endTime') {
                        if (key === 'startDate' || key === 'startTime') {
                            newDate.start = check[key]
                        } else {
                            newDate.end = check[key]
                        }
                    } else {
                        if (key === 'start' || key === 'end') {
                            let now = new Date(newDate[key])
                            let day = now.getDate()
                            let month = now.getUTCMonth() + 1
                            let year = now.getFullYear()
                            let second = now.getSeconds()
                            let minute = now.getMinutes()
                            let hour = now.getHours()
                            newDate[key] = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
                        } else {
                            newDate[key] = check[key]
                        }
                    }
                }
                this.axios.post('/api/editOne', newDate).then(res => {
                    if (res.data.err_code === 0) {
                        this.closed()
                        this.$store.dispatch('close', 'edit')
                    }
                })
            }
        }
    },
    mounted() {}
}
</script>

<style>

</style>
