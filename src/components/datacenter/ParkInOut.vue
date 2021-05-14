<template>
<div class="col-xl-4 px-0">
    <div class="my-3 mr-4 border shadow row_three">
        <div class="px-3">
            <div class="mt-1 title_line">
                <p class="pl-2 font-weight-bold">进出车辆统计</p>
            </div>
            <div>
                <svg width="380" height="180">
                    <linearGradient id="parkInColor">
                        <stop offset="0" stop-color="#2ce685" />
                        <stop offset="90" stop-color="#79f4c5" />
                    </linearGradient>
                    <linearGradient id="parkOutColor">
                        <stop offset="0" stop-color="#f6a00f" />
                        <stop offset="90" stop-color="#fcc372" />
                    </linearGradient>
                    <linearGradient id="parkBerthColor">
                        <stop offset="0" stop-color="#5698f9" />
                        <stop offset="90" stop-color="#6cd5ff" />
                    </linearGradient>
                    <g id="img">

                    </g>
                    <g id="text" font-family="cursive" font-size="14">
                        <text x="105" y="20">今日入场车辆</text>
                        <text x="105" y="80">今日离场车辆</text>
                        <text x="105" y="140">今日在场车辆</text>

                        <text :x="text_transform('in')" y="20">{{ this.statisitics.in }}
                            <animate attributeName="x" :from="this.statisitics.in === 0 ? 210 : 220" :to="text_transform('in')" dur=".5s" />
                        </text>
                        <text :x="text_transform('out')" y="80">{{ this.statisitics.out }}
                            <animate attributeName="x" :from="this.statisitics.out === 0 ? 210 : 220" :to="text_transform('out')" dur=".5s" />
                        </text>
                        <text :x="text_transform('berth')" y="140">{{ this.statisitics.berth }}
                            <animate attributeName="x" :from="this.statisitics.berth === 0 ? 210 : 220" :to="text_transform('berth')" dur=".5s" />
                        </text>
                    </g>
                    <g>
                        <rect x="210" y="10" rx="5" :width="this.statisitics.in / perwidth" height="10" fill="url(#parkInColor)">
                            <animate attributeName="width" from="0" :to="this.statisitics.in / perwidth" dur=".5s" />
                        </rect>
                        <rect x="210" y="70" rx="5" :width="this.statisitics.out / perwidth" height="10" fill="url(#parkOutColor)">
                            <animate attributeName="width" from="0" :to="this.statisitics.out / perwidth" dur=".5s" />
                        </rect>
                        <rect x="210" y="130" rx="5" :width="this.statisitics.berth / perwidth" height="10" fill="url(#parkBerthColor)">
                            <animate attributeName="width" from="0" :to="this.statisitics.berth / perwidth" dur=".5s" />
                        </rect>
                    </g>
                </svg>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            // statisitics:{in: 200, out: 200, berth: 300}
            statisitics: {
                in: 0,
                out: 0,
                berth: 0
            }
        }
    },
    computed: {
        max_num() {
            return Math.max(...Object.values(this.statisitics)) <= 120 ? 120 : Math.max(...Object.values(this.statisitics))
        },
        perwidth() {
            return this.max_num / 120
        }
    },
    methods: {
        init() {
            this.axios.get('/api/parkInOutStatistics').then(res => {
                res !== undefined ?
                    this.statisitics = res.data.num :
                    console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
        },
        text_transform(val) {
            return this.statisitics[`${val}`] * 1 / this.perwidth === 0 ?
                this.statisitics[`${val}`] * 1 / this.perwidth + 210 :
                this.statisitics[`${val}`] * 1 / this.perwidth + 220
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style>

</style>
