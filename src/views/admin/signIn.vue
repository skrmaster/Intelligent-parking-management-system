<template>
<div>
    <div class="whole-set">
        <div class="shadow sign-block-set">
            <div class="pl-3 ml-4 pt-4 mt-2">
                <p class="font-weight-bold" style="opacity: 0.9">登陆你的账号吧</p>
            </div>
            <div class="pl-3 ml-4 pt-3" style="color: rgba(198, 199, 194, 0.8)">
                <form id="form-control">
                    <div>
                        <div>
                            <label class="m-0" id="name" for="user" style="font-size: 14px">账号</label>
                        </div>
                        <input id="user" type="text" class="input-set" @blur="clearn('name', 'user'), checkNullReveser('user', 0)" @focus="activeI('name', 'user'), checkNull('user', 0)" autocomplete="off" autofocus v-model="loginForm.username" />
                        <div class="texterror py-1">&nbsp;</div>
                    </div>
                    <div class="">
                        <div>
                            <label id="pwdtitle" class="m-0" for="pwd" style="font-size: 14px">密码</label>
                        </div>
                        <div class="position-relative">
                            <input id="pwd" type="password" class="input-set" @focus="activeI('pwdtitle', 'pwd'), checkNull('pwd', 1)" @blur="clearn('pwdtitle', 'pwd'), checkNullReveser('pwd', 1)" v-model="loginForm.password"  @keydown.enter="typecheck()"/>
                            <i id="showorhidepwd" class="bi bi-eye-slash onoff" @click="showorhide()"></i>
                        </div>
                        <div class="texterror py-1">&nbsp;</div>
                    </div>
                    <div class="pr-4 float-right">
                        <button type="button" @click="typecheck()" class="btn-set p-2">
                            登&nbsp;录
                        </button>
                    </div>
                    <div class="float-left pt-4">
                        <router-link to="/register" style="font-size: 12px">没有账号?点这注册</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            onoff: false,
            loginForm: {
                username: "",
                password: "",
            },
        };
    },
    methods: {
        activeI(name, user) {
            var nam = document.getElementById(name);
            var use = document.getElementById(user);
            if (user === "pwd") {
                const icon = document.getElementById("showorhidepwd");
                icon.style.color = "rgba(0,0,0,.9)";
            }
            use.style.borderBottom = "solid 2px rgba(0,0,0,.9)";
            nam.style.color = "rgba(0,0,0,.9)";
        },
        clearn(name, user) {
            var nam = document.getElementById(name);
            var use = document.getElementById(user);
            var icon = document.getElementById("showorhidepwd");

            use.style.borderBottom = "solid 2px rgba(198, 199, 194, .8)";
            nam.style.color = "rgba(198, 199, 194, .8)";
            icon.style.color = "rgba(198, 199, 194, .8)";
        },
        showorhide() {
            this.onoff = !this.onoff;
            const content = document.getElementById("pwd");
            const icon = document.getElementById("showorhidepwd");

            if (content.value) {
                if (!this.onoff) {
                    icon.className = "bi bi-eye onoff";
                    content.type = "text";
                } else {
                    icon.className = "bi bi-eye-slash onoff";
                    content.type = "password";
                }
            }
        },
        checkNull(id, index) {
            var position = document.getElementById(id);
            var errortext = document.getElementsByClassName("texterror");
            if (position.value === "") {
                errortext[index].innerHTML = "&nbsp";
            }
        },
        checkNullReveser(id, index) {
            var position = document.getElementById(id);
            var errortext = document.getElementsByClassName("texterror");
            if (position.value === "") {
                switch (id) {
                    case "user":
                        errortext[index].innerHTML = "请输入用户名";
                        break;
                    case "pwd":
                        errortext[index].innerHTML = "请输入密码";
                        break;
                    default:
                        break;
                }
            }
        },
        typecheck() {
            var errortext = document.getElementsByClassName("texterror");
            var username = document.getElementById("user");
            var password = document.getElementById("pwd");
            var usr = /^\w+$/g;
            var pwd = /^\w+$/g;

            if (!usr.test(username.value) || username.value === "") {
                username.focus();
                username.value === ""
                ?   (errortext[0].innerHTML = "请输入用户名")
                :   (errortext[0].innerHTML = "请输入包含a-zA-Z0-9的用户名");
                return false;
            }
            if (!pwd.test(password.value) || password.value === "") {
                password.focus();
                password.value === "" 
                ?    (errortext[1].innerHTML = "请输入密码") 
                :    (errortext[1].innerHTML = "请输入包含a-zA-Z0-9的密码");
                return false;
            }

            this.$store.dispatch('createToken', this.loginForm).then((res) => {
                if (res.data.err_code === 1) {
                    this.$message.error(res.data.message)
                } else {
                    this.$router.push("/admin/datacenter").catch(err => {
                        if (err) throw err
                    })
                }
            })
        }
    },
    mounted() {
    }
}
</script>

<style scoped>

</style>
