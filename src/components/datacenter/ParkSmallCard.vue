<template>
<div class="container-fluid py-3">
    <div class="d-flex flex-row justify-content-between">
        <div v-for="(content, index) in fiveblock" :key=index :class="'shadow five_block_set '+ content.imgpath">
            <div class="p-4">
                <div class="justify-content-start">
                    <div>{{content.title}}</div>
                    <h3>{{content.num}}</h3>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            fiveblock: [{
                    title: "总收入(元)",
                    num: '----',
                    imgpath: "five_block_radius_bg_set_money"
                },
                {
                    title: "空车位(个)",
                    num: '----',
                    imgpath: "five_block_radius_bg_set_parkinglot"
                },
                {
                    title: "会员(人)",
                    num: '----',
                    imgpath: "five_block_radius_bg_set_member"
                },
                {
                    title: "优惠券使用(张)",
                    num: '----',
                    imgpath: "five_block_radius_bg_set_coupon"
                },
                {
                    title: "访客未处理(人)",
                    num: '----',
                    imgpath: "five_block_radius_bg_set_visitor"
                }
            ]
        }
    },
    methods: {
        initData() {
            this.axios.get('/api/datashow').then(res => {
                if (res !== undefined) {
                    this.fiveblock[0].num = res.data.money
                    this.fiveblock[1].num = res.data.emptyParkSpace
                    this.fiveblock[2].num = res.data.member
                    this.fiveblock[3].num = res.data.coupon
                    this.fiveblock[4].num = res.data.visiter
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mounted() {
        this.initData()
    }
}
</script>
