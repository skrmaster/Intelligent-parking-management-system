<template>
<div>
    <div class="container-fluid mt-3 p-3" style="background-color: white;">
        <div class="row">
            <div class="col-xl-3">
                <el-radio-group v-model="orderTime" @change="orderByTime">
                    <el-radio-button label="按进场时间"></el-radio-button>
                    <el-radio-button label="默认"></el-radio-button>
                    <el-radio-button label="按出场时间"></el-radio-button>
                </el-radio-group>
            </div>
            <div class="col-xl-4">
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
                        <div class="searchSet" @click="handleSearch()" @mouseover="searchTextShow" @mouseleave="searchTextHide">
                            <transition name="searchAnimation" class="ml-2">
                                <div v-if="showhideset" key='img'>
                                    <i class="el-icon-search"></i>
                                </div>
                                <div v-else key='text'>
                                    <span style="font-size: 12px">搜索</span>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 offset-xl-2">
                <div class="d-flex justify-content-end">
                    <div class="mr-3">
                        <el-tooltip class="item" effect="dark" content="未勾选全部导出,勾选部分导出" placement="top-start">
                            <button class="btn btn-outline-primary" @click="exportXlsx()"><i class="bi bi-info-circle"></i> 导出</button>
                        </el-tooltip>
                    </div>
                    <div class="mr-3">
                        <button class="btn btn-outline-primary" @click="reload()">刷新</button>
                    </div>
                    <button class="btn btn-outline-primary" @click="showdialogFormVisible()">新增</button>
                    <OrderAdd></OrderAdd>
                </div>
            </div>
        </div>
    </div>
    <OrderList></OrderList>
</div>
</template>

<script>
import OrderAdd from '@/components/order/OrderAdd.vue'
import OrderList from '@/components/order/OrderList.vue'

export default {
    name: 'order',
    components: {
        OrderAdd,
        OrderList
    },
    data() {
        return {
            orderTime: '默认',
            cars: [],
            search: '',
            showhideset: true,
            tmp: ''
        }
    },
    watch: {
        search: function () {
            if (this.search === '') {
                this.axios.get('/api/orderPage').then(res => {
                    res !== undefined ?
                        this.$store.dispatch('updateTable', res.data.table) :
                        console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    },
    methods: {
        reload() {
            location.reload()
        },
        showdialogFormVisible() {
            this.$store.dispatch('open', 'add')
        },
        exportXlsx() {
            this.$confirm('', '导出?', {
                confirmButtonText: '导出',
                cancelButtonText: '取消',
                confirmButtonClass: 'btn-success',
                center: true,
                roundButton: true
            }).then(() => {
                this.axios.get(`/api/exportXlsx?rowToExport=${JSON.stringify(
                    this.$store.getters.rowToExport.concat(this.$store.getters.tmpRowToExport
                ))}`).then((res) => {
                    res === undefined ?
                        console.log('res undefined') :
                        window.open(res.data.data)
                }).catch(err => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        },
        orderByTime(val) {
            try {
                if (val === '按进场时间') {
                    this.axios.get('/api/orderByTime?way=in').then(res => {
                        res !== undefined ?
                            this.$store.dispatch('updateTable', res.data.data) :
                            console.log('res undefined')
                    }).catch(err => {
                        console.log(err)
                    })
                } else if (val === '按出场时间') {
                    this.axios.get('/api/orderByTime?way=out').then(res => {
                        res !== undefined ?
                            this.$store.dispatch('updateTable', res.data.data) :
                            console.log('res undefined')
                    }).catch(err => {
                        console.log(err)
                    })
                } else if (val === '默认') {
                    this.axios.get('/api/orderPage').then(res => {
                        res !== undefined ?
                            this.$store.dispatch('updateTable', res.data.table) :
                            console.log(res)
                    }).catch(err => {
                        console.log(err)
                    })
                }
            } catch (err) {
                throw err
            }
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
        orderInit(cb) {
            this.axios.get('/api/orderPage').then(res => {
                res !== undefined ?
                    this.$store.dispatch('updateTable', res.data.table) :
                    console.log(res)
                cb(this.$store.getters.tableData)
            }).catch(err => {
                console.log(err)
            })
        },
        searchTextShow() {
            this.showhideset = false
        },
        searchTextHide() {
            this.showhideset = true
        }
    },
    mounted() {
        this.orderInit((val) => {
            this.cars = this.handleData(val)
        })
    }
}
</script>

<style lang="scss" scoped>
.searchAnimation-enter {
    opacity: 0;
}

.searchAnimation-leave {
    opacity: 1;
}

.searchAnimation-enter-active {
    transition: all .2s;
    transform: translateX(-20px);
}

.searchAnimation-leave-active {
    transition: all .2s;
    transform: translateX(20px);
}

.searchAnimation-enter-to {
    opacity: 1;
}

.searchAnimation-leave-to {
    opacity: 0;
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

    &:hover {
        background: #b3d8ff;
        color: white;
    }
}
</style>
