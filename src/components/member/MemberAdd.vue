<template>
<div>
    <el-dialog width="45%" @closed="closed('1')" title="注册会员" :visible.sync="dialogFormVisible" @destroy-on-close="true" :close-on-click-modal="false">
        <div slot="title">
            <span class="diaglogTitleSet">注册会员</span>
        </div>
        <el-tabs v-model="tableValue">
            <el-tab-pane name="基础信息">
                <span slot="label"><i class="el-icon-menu"></i> 基础信息</span>
                <el-row>
                    <el-form label-position="right" :model="ruleForm" :rules="rules1" ref="ruleForm1">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item :label-width="formLabelWidth" label="会员编号" prop="id" required>
                                    <el-input placeholder="请输入" v-model="ruleForm.id"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :offset="1" :span="10">
                                <el-form-item :label-width="formLabelWidth" label="车主姓名" prop="carMaster" required>
                                    <el-input placeholder="请输入" v-model="ruleForm.carMaster"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item :label-width="formLabelWidth" label="车牌号" prop="carId" required>
                                    <el-input placeholder="请输入" v-model="ruleForm.carId"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :offset="1" :span="10">
                                <el-form-item :label-width="formLabelWidth" label="电话号码" prop="phone" required>
                                    <el-input placeholder="请输入" v-model="ruleForm.phone"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="开始时间" required>
                            <el-col :span="8">
                                <el-form-item prop="start">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.start"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :offset="1" :span="1">-</el-col>
                            <el-col :span="8">
                                <el-form-item prop="start">
                                    <el-time-picker placeholder="选择时间" v-model="ruleForm.start"></el-time-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="结束时间" required>
                            <el-col :span="8">
                                <el-form-item prop="end">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.end"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :offset="1" :span="1">-</el-col>
                            <el-col :span="8">
                                <el-form-item prop="end">
                                    <el-time-picker placeholder="选择时间" v-model="ruleForm.end"></el-time-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth" label="备注" prop="remarks">
                            <el-col :span="21">
                                <el-input placeholder="不超过50字" type="textarea" v-model="ruleForm.remarks" maxlength="50" show-word-limit></el-input>
                            </el-col>
                        </el-form-item>
                    </el-form>
                </el-row>
            </el-tab-pane>
            <el-tab-pane name="详细信息" :disabled="tabStatus">
                <span slot="label"><i class="el-icon-s-grid"></i> 详细信息</span>
                <el-row>
                    <el-form :model="ruleForm" :rules="rules2" ref="ruleForm2">
                        <el-form-item :label-width="formLabelWidth" label="车辆品牌" prop="carBrand" required>
                            <el-input placeholder="请输入" v-model="ruleForm.carBrand"></el-input>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth" label="限行" prop="trafficRestriction" required>
                            <el-input placeholder="请输入" v-model="ruleForm.trafficRestriction"></el-input>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth" label="车位" prop="carPark" required>
                            <el-input placeholder="请输入" v-model="ruleForm.carPark"></el-input>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth" label="地址" prop="address" required>
                            <el-input placeholder="请输入" v-model="ruleForm.address"></el-input>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth" label="套餐" prop="setMeal" required>
                            <el-select v-model="ruleForm.setMeal" placeholder="套餐选择">
                                <el-option v-for="item in setMeal" :key="item.value" :label="item.value" :value="item.value">
                                    <span style="float: left; font-size: 13px">套餐名</span>
                                    <span style="float: right; color: #8492a6;">{{ item.value }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-row>
            </el-tab-pane>
        </el-tabs>

        <div slot="footer" class="dialog-footer dialogFooterSet">
            <el-button @click="myClose()">取消</el-button>
            <el-button v-if="tableValue === '基础信息'" type="primary" @click="nextStep('ruleForm1')">下一步</el-button>
            <span class="ml-3" v-else>
                <el-button type="primary" @click="preStep()">上一步</el-button>
                <el-button type="primary" @click="addMember('ruleForm2')">确 定</el-button>
            </span>
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
            if (value === '') {
                return callback(new Error('车牌号不能为空'))
            } else if (!regex.test(value)) {
                return callback(new Error('车牌例子: 川Q88888'))
            } else {
                callback()
            }
        };
        var checkphone = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error("号码不能为空"))
            } else if (value.length !== 11) {
                callback(new Error("请输入11位手机号"))
            } else {
                for (let i = 0; i < value.length; i++) {
                    var yanzhen = /^[0-9]$/g;
                    if (yanzhen.test(value[i])) {
                        continue;
                    } else {
                        callback(new Error(`第${i + 1}位不是数字请修改`))
                    }
                }
                callback();
            }
        };
        return {
            tableValue: '基础信息',
            formLabelWidth: '80px',
            status: true,
            tabStatus: true,
            setMeal: [{
                value: '套餐一'
            }, {
                value: '套餐二'
            }, {
                value: '套餐三'
            }],
            ruleForm: {
                id: '',
                carMaster: '',
                carID: '',
                phone: '',
                start: '',
                end: '',
                remarks: '',
                carBrand: '',
                trafficRestriction: '',
                carPark: '',
                address: '',
                setMeal: ''
            },
            rules1: {
                id: [{
                    required: true,
                    message: '请输入月卡编号',
                    trigger: 'blur'
                }],
                carMaster: [{
                    required: true,
                    message: '请输入车主姓名',
                    trigger: 'blur'
                }],
                carId: [{
                    validator: checkCarNum,
                    trigger: 'blur'
                }],
                phone: [{
                    validator: checkphone,
                    trigger: 'blur'
                }],
                start: [{
                    required: true,
                    type: 'date',
                    message: '请选择开始时间',
                    trigger: 'blur'
                }],
                end: [{
                    required: true,
                    type: 'date',
                    message: '请选择结束时间',
                    trigger: 'blur'
                }]
            },
            rules2: {
                carBrand: [{
                    required: true,
                    message: '请输入车辆品牌',
                    trigger: 'blur'
                }],
                trafficRestriction: [{
                    required: true,
                    message: '请输入限行内容',
                    trigger: 'blur'
                }],
                carPark: [{
                    required: true,
                    message: '请输入车位',
                    trigger: 'blur'
                }],
                address: [{
                    required: true,
                    message: '请输入地址',
                    trigger: 'blur'
                }],
                setMeal: [{
                    required: true,
                    message: '请输选择套餐',
                    trigger: 'change'
                }]
            }
        }
    },
    computed: {
        dialogFormVisible: {
            get() {
                return this.$store.getters.memberAddStatus
            },
            set(val) {
                this.$store.commit('MEMBER_SET_DIALOG', 'add', val)
            }
        }
    },
    watch: {

    },
    methods: {
        nextStep(formName) {      
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.tabStatus = false
                    this.tableValue = '详细信息'
                } else {
                    return false
                }
            })
        },
        preStep() {
            this.tableValue = '基础信息'
        },
        addMember(formName) {
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
                    this.axios.post('/api/newMember', newDate).catch(err => {
                        console.log(err)
                    })

                    this.closed()
                    this.restForm('ruleForm1')
                    this.restForm('ruleForm2')
                    this.ruleForm = {
                        id: '',
                        carMaster: '',
                        carID: '',
                        phone: '',
                        start: '',
                        end: '',
                        remarks: '',
                        carBrand: '',
                        trafficRestriction: '',
                        carPark: '',
                        address: '',
                        setMeal: ''
                    }
                    this.$store.dispatch('mclose', 'add')
                } else {
                    return false
                }
            })
        },
        closed(allow) {
            if (allow === '1') {
                return
            } else {
                this.memberInit()
                console.log(1)
                this.$message({
                    type: 'success',
                    message: '添加成功'
                })
            }
        },
        memberInit() {
            this.axios.get('/api/memberPage').then(res => {
                res !== undefined ?
                    this.$store.dispatch('mupdateTable', res.data.table) :
                    console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },
        restForm(formName) {
            this.$refs[formName].resetFields()
        },
        myClose() {
            this.$store.dispatch('mclose', 'add')
        }
    }
}
</script>

<style lang="scss" scoped>
.diaglogTitleSet {
    border-left: 10px solid teal;
    padding-left: .5rem;
    font-size: 20px
}

.dialogFooterSet {
    padding-top: .8rem;
    text-align: center;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 70px;
        height: 2px;
        width: 100%;
        background-color: #E4E7ED;
    }
}
</style>
