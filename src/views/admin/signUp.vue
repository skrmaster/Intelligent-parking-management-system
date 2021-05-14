<template>
<div class="whole-set-up">
    <div class="shadow sign-block-set-up">
        <div class="pl-3 ml-4 pt-5 mt-2">
            <p class="font-weight-bold" style="opacity: 0.9; font-size: 28px">
                赶紧来注册吧
            </p>
        </div>
        <div class="pl-3 ml-4 pt-3 pr-4" style="color: rgba(198, 199, 194, 0.8) ;">
            <el-form label-position="right" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="name">
                    <el-input type="text" clearable v-model="ruleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" clearable v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone" @keydown.enter="submitForm('ruleForm')">
                    <el-input v-model="ruleForm.phone" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="p-1 float-right">
                        <button type="button" @click="submitForm('ruleForm')" class="btn-set-up p-2">
                            注 册
                        </button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        var validatename = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error("名称不能为空"))
            } else {
                callback()
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error("请输入密码"))
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
            ruleForm: {
                name: "",
                pass: "",
                phone: "",
            },
            rules: {
                name: [{
                    validator: validatename,
                    trigger: "blur",
                }, ],
                pass: [{
                    validator: validatePass,
                    trigger: "blur",
                }, ],
                phone: [{
                    validator: checkphone,
                    trigger: "blur",
                }]
            }
        }
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.axios
                        .post("/api/register", this.ruleForm)
                        .then((res) => {
                            if (res.data.err_code === 0) {
                                this.$message({
                                    type: 'success',
                                    message: '注册成功请登录'
                                })
                                this.$router.push("/login").catch(err => {
                                    if (err) throw err
                                }
                            )} else {
                                this.$message({
                                    type: 'error',
                                    message: res.data.message
                                })
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                } else {
                    return false
                }
            })
        }
    }
}
</script>
