<template>
<div class="container">
    <div class="d-flex flex-row justify-content-around">
        <div class="col-xl-3"></div>
        <div class="col-xl-4 mt-5">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="name">
                    <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="修改头像">
                    <el-row type="flex">
                        <el-col :span="12">
                            <el-popover placement="left" width="400" trigger="click">
                                <el-image v-for="(data, index) in imgSelect" :key=index :src=data.img class="m-1 overborder" style="width: 80px; height: 80px" @click="choseImg(index)"></el-image>
                                <el-button slot="reference">修改头像</el-button>
                            </el-popover>
                        </el-col>
                        <el-col :span="12">
                            <el-avatar v-if='show' :src="userImg" :size="80"></el-avatar>
                            <el-avatar v-else :size="80" shape="square"> {{userDefault}} </el-avatar>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="float-right" @click="submitForm('ruleForm')">确认修改</el-button>
                </el-form-item>
                <el-form-item>
                    <el-collapse>
                        <el-collapse-item title="高级操作" class="text-center">
                            <el-button type="danger" icon="el-icon-delete" @click="open" round>删除账号</el-button>
                        </el-collapse-item>
                    </el-collapse>
                </el-form-item>
                <el-form-item>
                    <el-alert :title="registerTime" type="warning">
                    </el-alert>
                </el-form-item>
            </el-form>
        </div>
        <div class="col-xl-3"></div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"))
            } else {
                if (this.ruleForm.checkPass !== "") {
                    this.$refs.ruleForm.validateField("checkPass");
                }
                callback()
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"))
            } else if (value !== this.ruleForm.pass) {
                callback(new Error("两次输入密码不一致!"))
            } else {
                callback()
            }
        }
        var validateName = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入用户名"));
            } else {
                callback()
            }
        }

        return {
            ruleForm: {
                name: "",
                pass: "",
                checkPass: ""
            },
            rules: {
                name: [{
                    validator: validateName,
                    trigger: "blur",
                }],
                pass: [{
                    validator: validatePass,
                    trigger: "blur",
                }],
                checkPass: [{
                    validator: validatePass2,
                    trigger: "blur",
                }]
            },
            imgSelect: [{
                    img: '/api/public/img/avatar/avatar_1.png'
                },
                {
                    img: '/api/public/img/avatar/avatar_2.png'
                },
                {
                    img: '/api/public/img/avatar/avatar_3.png'
                },
                {
                    img: '/api/public/img/avatar/avatar_4.png'
                },
                {
                    img: '/api/public/img/avatar/avatar_5.png'
                },
                {
                    img: '/api/public/img/avatar/avatar_6.png'
                }
            ],
            userImg: '',
            userDefault: '',
            show: true,
            enduserImg: '',
            registerTime: ''
        }
    },
    methods: {
        choseImg(index) {
            this.userImg = this.imgSelect[index].img
            this.show = true
            this.enduserImg = this.userImg.slice(40)
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let info = {
                        oldname: sessionStorage.getItem('adminInfo'),
                        newname: this.ruleForm.name,
                        newpwd: this.ruleForm.pass,
                        avatar: this.enduserImg
                    }
                    this.axios.post('/api/changInfo', info).then((res) => {
                        if (res.data.err_code === 2) {
                            this.$message({
                                type: 'warning',
                                message: '用户名已存在'
                            })
                        }
                        if (res.data.err_code === 0) {
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            })
                            this.$store.commit('DELETE')
                            location.reload()
                            this.$router.push('/').catch(err => {
                                if (err) throw err
                            })
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                } else {
                    return false;
                }
            })
        },
        open() {
            this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error',
                center: true
            }).then(() => {
                this.axios.post('/api/delAccount', {
                    name: sessionStorage.getItem('adminInfo')
                }).then((res) => {
                    if (res.data.err_code === 0) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.$store.commit('DELETE')
                        this.$router.push('/').catch(err => {
                            if (err) throw err
                        })
                        location.reload()
                    } else {
                        throw err
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        handleTime(val) {
            let now = new Date(val)
            let time = now.toString().slice(16, 25)
            let year = now.getFullYear()
            let month = now.getUTCMonth() + 1
            let day = now.getDate()
            return '注册时间 ' + year + '-' + month + '-' + day + ' ' + time
        }
    },
    mounted() {
        if (this.$store.getters.adminInfo !== '') {
            this.axios.get(`/api/avatarGet?key=${this.$store.getters.adminInfo}`).then(res => {
                if (res.data.avatar === 'default') {
                    this.show = false
                    this.userDefault = this.$store.getters.adminInfo
                } else {
                    this.show = true
                    res !== undefined ?
                        this.userImg = `/api/public/img/avatar/${res.data.avatar}` :
                        console('res undefined')
                }
            }).catch(err => {
                console.log(err)
            })

            this.axios.get(`/api/registerTime?key=${this.$store.getters.adminInfo}`).then(res => {
                res !== undefined ?
                    this.registerTime = this.handleTime(res.data.registerTime) :
                    console.log('res registerTime null')
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.overborder:hover {
    transform: scale(.9);
    outline: 1px solid gray;
    cursor: pointer;
    transition: all .1s;
}
</style>
