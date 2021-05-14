<template>
<div>
    <div class="container-fluid mt-3 p-3" style="background-color: white;">
        <el-row type="flex">
            <el-col class="d-flex">
                <el-button type="primary" @click="timeShowOff()" class="text-wrap" style="width:80px">点击查看当前时间</el-button>
                <transition name="mytime">
                    <div
                    v-if="show"
                    class="mytime"
                    >{{ times }}</div>
                </transition>        
            </el-col>
            <el-col type="flex">
                <div class="d-flex justify-content-around align-items-center">
                    <div class="d-flex align-items-center font-weight-bold">车牌号</div>
                    <div class="d-flex align-items-center">
                        <div>
                            <el-autocomplete 
                            size="medium" 
                            class="inline-input" 
                            v-model="search" 
                            :fetch-suggestions="querySearch" 
                            placeholder="搜索车牌号" 
                            :trigger-on-focus="false" 
                            :clearable="true" 
                            @select="handleSelect">
                            </el-autocomplete>
                        </div>
                        <div class="searchSet" @click="handleSearch()">
                            <div key='img'>
                                <i class="el-icon-search"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col type="flex">
                <div class="d-flex justify-content-center">
                    <div class="mr-3">
                        <button class="btn btn-outline-primary" @click="reload()">刷新</button>
                    </div>
                    <button class="registerTrigger" @click="registerMember()">注册会员</button>
                    <MemberAdd></MemberAdd>
                </div>
            </el-col>
        </el-row>
    </div>
    <MemberList></MemberList>
</div>
</template>

<script>
import MemberList from '@/components/member/MemberList'
import MemberAdd from '@/components/member/MemberAdd'

export default {
    name: 'Members',
    components: {
        MemberList,
        MemberAdd
    },
    data() {
        return {
            times: '',
            show: false,
            search: '',
            tmp: '',
            runing: false,
            member: []
        }
    },
    computed: {
        
    },
    methods: {
        reload() {
            location.reload()
        },
        time() {
            let now = new Date()
            let day = now.getDate()
            let month = now.getUTCMonth() + 1
            let year = now.getFullYear()
            let second = now.getSeconds()
            let minute = now.getMinutes()
            let hour = now.getHours()
            this.times = year + '年' + month + '月' + day + '日 ' 
            + hour + '时' + minute + '分' + second + '秒'
        },
        timeShowOff() {
            if (this.runing) {
                return
            } 
            this.runing = true

            this.show = !this.show
            this.time()
            setTimeout(() => { 
                this.show = !this.show 
                this.runing = false
            }, 2000)
            
        },
        querySearch(queryString, cb) {
            var cars = this.cars
            var results = queryString ? cars.filter(this.createFilter(queryString)) : cars
            cb(results)
        },
        createFilter(queryString) {
            return (car) => {
                return (car.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
            }
        },
        handleSelect(val) {
            this.tmp = val
        },
        handleSearch() {
            this.axios.post('/api/searchMsg', {
                carId: this.tmp.carId
            }).then(res => {
                res !== undefined ?
                    this.$store.dispatch('updateTable', res.data.table) :
                    console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },
        registerMember() {
            this.$store.dispatch('mopen', 'add')
        },
        memberInit(cb) {
            this.axios.get('/api/memberPage').then(res => {
                res !== undefined ?
                    this.$store.dispatch('mupdateTable', res.data.table) :
                    console.log(res)
                cb(this.$store.getters.memberTableData)
            }).catch(err => {
                console.log(err)
            })
        },
        handleData(val) {
            for (let i = 0; i < val.length; i++) {
                for (let key in val[i]) {
                    if (key === 'carId') {
                        val[i][`value`] = val[i][`carId`]
                    }
                }
                if (i === val.length - 1) {
                    return val
                }
            }
        },
    },
    mounted() {
        this.memberInit((val) => {
            this.member = this.handleData(val)
        })
    }
}
</script>

<style lang="scss" scoped>
.mytime-enter, .mytime-leave-to{
    width: 0;
}
.mytime-enter-active, .mytime-leave-active{
    transition: width .1s ease;
}
.mytime-enter-to, .mytime-leave{
    width: 130px;
}
.mytime{
    height: 30px;
    margin-left: 1rem;
    margin-top: .5rem;
    overflow: hidden;
    border: 1px solid transparent;
    border-radius: .25rem;
    color: #004085;
    background-color: #cce5ff;
    border-color: #b8daff;
    padding: .25rem;
}
.searchSet {
    cursor: pointer;
    text-align: center;
    padding-top: 6px;
    height: 40px;
    width: 40px;
    overflow: hidden;
    margin-left: .5rem;
    position: relative;
    border: 1px solid #DCDFE6;
    border-radius: 20px;
    color: rgba(0, 174, 255, 0.9);
}
.registerTrigger {
    display: inline-block;
    font-weight: 400;
    color: white;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    background-color: #272c54;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
}
</style>
