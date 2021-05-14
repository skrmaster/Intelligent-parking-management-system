<template>
<div>
    <el-dialog 
    width="45%" 
    @closed="closed('1')" 
    title="增加订单" 
    :visible.sync="dialogFormVisible" 
    @destroy-on-close="true" 
    :close-on-click-modal="false"
    center>
        <el-row>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-row :gutter="50">
                    <el-col :span="10">
                        <el-form-item prop="index" label="订单编号" :label-width="formLabelWidth">
                            <el-input v-model="ruleForm.index" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="10">
                        <el-form-item prop="carId" label="车牌号码" :label-width="formLabelWidth">
                            <el-input v-model="ruleForm.carId" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="进场时间" required>
                    <el-col :span="8">
                        <el-form-item prop="startTime">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.startTime"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="1">-</el-col>
                    <el-col :span="8">
                        <el-form-item prop="startTime">
                            <el-time-picker placeholder="选择时间" v-model="ruleForm.startTime"></el-time-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="出场时间" required>
                    <el-col :span="8">
                        <el-form-item prop="endTime">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.endTime"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="1">-</el-col>
                    <el-col :span="8">
                        <el-form-item prop="endTime">
                            <el-time-picker placeholder="选择时间" v-model="ruleForm.endTime"></el-time-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-row type="flex" :gutter="20">
                    <el-col :span="8">
                        <el-form-item prop="parkId" >
                            <el-select v-model="ruleForm.parkId" placeholder="请选择车场选择">
                                <el-option v-for="item in parkId" :key="item.value" :label="item.value" :value="item.value">
                                    <span style="float: left; font-size: 13px">车场编号</span>
                                    <span style="float: right; color: #8492a6;">{{ item.value }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="inparkway" >
                            <el-select v-model="ruleForm.inparkway" placeholder="请选择进场通道">
                                <el-option v-for="item in inparkway" :key="item.value" :label="item.value" :value="item.value">
                                    <span style="float: left; font-size: 13px">进场通道编号</span>
                                    <span style="float: right; color: #8492a6;">{{ item.value }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="outparkway" >
                            <el-select v-model="ruleForm.outparkway" placeholder="请选择出场通道">
                                <el-option v-for="item in outparkway" :key="item.value" :label="item.value" :value="item.value">
                                    <span style="float: left; font-size: 13px">出场通道编号</span>
                                    <span style="float: right; color: #8492a6;">{{ item.value }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="支付状态" prop="payStatus" :label-width="formLabelWidth">
                    <el-switch v-model="ruleForm.payStatus" active-value="已支付" inactive-value="未支付" active-text="已支付" inactive-text="未支付">
                    </el-switch>
                </el-form-item>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm2" :disabled="this.status">
                    <el-form-item label="支付方式" prop="payway" :label-width="formLabelWidth">
                        <el-radio v-model="ruleForm.payway" label="在线支付" size="medium">在线支付</el-radio>
                        <el-radio v-model="ruleForm.payway" label="现金" size="medium">现金</el-radio>
                    </el-form-item>
                    <el-form-item label="支付金额" prop="money" :label-width="formLabelWidth">
                        <el-popover placement="top-start" title="停靠时间" width="200" trigger="hover" content="1小时">
                            <el-radio slot="reference" class="mr-2" v-model="ruleForm.money" label="¥5.00" border size="medium"></el-radio>
                        </el-popover>
                        <el-popover placement="top-start" title="停靠时间" width="200" trigger="hover" content="2小时">
                            <el-radio slot="reference" class="mr-2" v-model="ruleForm.money" label="¥10.0" border size="medium"></el-radio>
                        </el-popover>
                        <el-popover placement="top-start" title="停靠时间" width="200" trigger="hover" content="2+小时">
                            <el-radio slot="reference" v-model="ruleForm.money" label="¥15.0" border size="medium"></el-radio>
                        </el-popover>
                    </el-form-item>
                    <el-form-item label="优惠券" prop="coupon" :label-width="formLabelWidth">
                        <el-radio class="mr-2" v-model="ruleForm.coupon" label="无" border size="small"></el-radio>
                        <el-radio class="mr-2" v-model="ruleForm.coupon" label="¥2.00" border size="small"></el-radio>
                        <el-radio class="mr-2" v-model="ruleForm.coupon" label="¥3.00" border size="small"></el-radio>
                    </el-form-item>
                </el-form>
            </el-form>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button @click="restForm('ruleForm')">重 置</el-button>
            <el-button @click="myClose()">取消</el-button>
            <el-button type="primary" @click="addorder('ruleForm')">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
export default {
    name: 'OrderAdd',
    data() {
        var checkCarNum = (rule, value, callback) => {
            var regex = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/g
            if (!value) {
                return callback(new Error('车牌号不能为空'))
            } else if (!regex.test(value)) {
                return callback(new Error('车牌例子: 川Q88888'))
            } else {
                callback()
            }
        }
        return {
            formLabelWidth: '80px',
            status: true,
            parkId: [{value: 'C1'}, {value: 'C2'}, {value: 'C3'}, {value: 'C4'}],
            inparkway: [{value: 'A1'}, {value: 'A2'}, {value: 'A3'}, {value: 'A4'}],
            outparkway: [{value: 'B1'}, {value: 'B2'}, {value: 'B3'}, {value: 'B4'}],
            ruleForm: {
                index: '',
                carId: '',
                payStatus: '',
                parkId: '',
                inparkway: '',
                outparkway: '',
                payway: '',
                money: '',
                coupon: '',
                startDate: '',
                startTime: '',
                endDate: '',
                endTime: '',
                start: '',
                end: ''
            },
            rules: {
                index: [{
                    required: true,
                    message: '请输入编号',
                    trigger: 'blur'
                }],
                parkId: [{
                    required: true,
                    message: '请选择车场',
                    trigger: 'change'
                }],
                inparkway: [{
                    required: true,
                    message: '请选择进场通道',
                    trigger: 'change'
                }],
                outparkway: [{
                    required: true,
                    message: '请选择出场通道',
                    trigger: 'change'
                }],
                carId: [{
                    validator: checkCarNum,
                    trigger: 'blur'
                }],
                payStatus: [{
                    required: true,
                    message: '请选择支付状态',
                    trigger: 'change'
                }],
                payway: [{
                    required: true,
                    message: '请选择支付方式',
                    trigger: 'change'
                }],
                money: [{
                    required: true,
                    message: '请选择价位',
                    trigger: 'change'
                }],
                coupon: [{
                    required: true,
                    message: '请选择优惠券',
                    trigger: 'change'
                }],
                startTime: [{
                    required: true,
                    type: 'date',
                    message: '请选择进场时间',
                    trigger: 'blur'
                }],
                endTime: [{
                    required: true,
                    type: 'date',
                    message: '请选择离场时间',
                    trigger: 'blur'
                }]
            }
        }
    },
    computed: {
        dialogFormVisible: {
            get() {
                return this.$store.getters.addstatus
            },
            set(val) {
                this.$store.commit('ORDER_SET_DIALOG', 'add', val)
            }
        }
    },
    watch: {
        'ruleForm.startDate': function () {
            return this.ruleForm.start = this.ruleForm.startDate + this.ruleForm.startTime
        },
        'ruleForm.startTime': function () {
            return this.ruleForm.start = this.ruleForm.startDate + this.ruleForm.startTime
        },
        'ruleForm.endDate': function () {
            return this.ruleForm.end = this.ruleForm.endDate + this.ruleForm.endTime
        },
        'ruleForm.endTime': function () {
            return this.ruleForm.end = this.ruleForm.endDate + this.ruleForm.endTime
        },
        'ruleForm.payStatus': function () {
            this.ruleForm.payStatus === '未支付'
            ?    this.status = true
            :    this.status = false
            this.$refs['ruleForm2'].resetFields()
        }
    },
    methods: {
        addorder(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let newDate = {}
                    for (let key in this.ruleForm) {
                        if (key === 'startDate' || key === 'startTime' || key === 'endDate' || key === 'endTime') {
                            continue
                        } else {
                            if (key === 'start' || key === 'end') {
                                let now = new Date(this.ruleForm[key])
                                let day = now.getDate()
                                let month = now.getUTCMonth() + 1
                                let year = now.getFullYear()
                                let second = now.getSeconds()
                                let minute = now.getMinutes()
                                let hour = now.getHours()
                                newDate[key] = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
                            } else {
                                newDate[key] = this.ruleForm[key]
                            }
                        }
                    }
                    if (newDate['payStatus'] === '未支付') {
                        newDate['payway'] = '无'
                        newDate['money'] = '0'
                    }
                    if (newDate['coupon'] === '无') {
                        newDate['coupon'] = '0'
                    } else if (newDate['coupon'] === '¥2.00') {
                        newDate['coupon'] = '1'
                    } else if (newDate['coupon'] === '¥3.00') {
                        newDate['coupon'] = '2'
                    }
                    this.axios.post('/api/orderPage', newDate).catch(err => {
                        console.log(err)
                    })
                    this.closed()
                    this.ruleForm = {
                        index: '',
                        carId: '',
                        payStatus: '未支付',
                        parkId: '',
                        inparkway: '',
                        outparkway: '',
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
                    this.$store.dispatch('close', 'add')
                } else {
                    return false
                }
            })
        },
        closed(allow) {
            if (allow === '1') {
                return
            } else {
                this.orderinit()
                this.$message({
                    type: 'success',
                    message: '添加成功'
                })
            }
        },
        orderinit() {
            this.axios.get('/api/orderPage').then(res => {
                res !== undefined
                ? this.$store.dispatch('updateTable', res.data.table)
                : console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },
        restForm(formName) {
            this.$refs[formName].resetFields()
        },
        myClose() {
            this.$store.dispatch('close', 'add')
        }
    }
}
</script>

<style scoped></style>
