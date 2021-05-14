<template>
<div class="col-xl-4 px-0">
    <div class="my-3 border shadow row_three">
        <div class="px-3">
            <div class="mt-1 title_line">
                <p class="pl-2 font-weight-bold">今日收费车场排行</p>
            </div>
            <div>
                <svg width="405" height="175">
                    <linearGradient id="mycolor">
                        <stop offset="0%" stop-color="#8188f3" />
                        <stop offset="50%" stop-color="#ae8ff6" />
                        <stop offset="100%" stop-color="#d58aff" />
                    </linearGradient>
                    <g id="parkId" font-family="cursive" font-size="14" fill="#bdbdbd">
                        <text x="10" y="15" font-size="12">车场</text>
                        <text x="8" y="45">C1</text>
                        <text x="8" y="75">C2</text>
                        <text x="8" y="105">C3</text>
                        <text x="8" y="135">C4</text>
                    </g>
                    <g id="money" font-family="cursive" font-size="12" fill="#bdbdbd" stroke="#bdbdbd" stroke-width="1">
                        <path d="M 30 150 H 350" />

                        <path d="M 70 150 V 148"/>
                        <path d="M 110 150 V 148"/>
                        <path d="M 150 150 V 148"/>
                        <path d="M 190 150 V 148"/>
                        <path d="M 230 150 V 148"/>
                        <path d="M 270 150 V 148"/>
                        <path d="M 310 150 V 148"/>
                        <path d="M 350 150 V 148"/>

                        <text x="60" y="165">{{ max_money / 8 * 1 | digitsRound}}</text>
                        <text x="95" y="165">{{ max_money / 8 * 2 | digitsRound}}</text>
                        <text x="135" y="165">{{ max_money / 8 * 3 | digitsRound}}</text>
                        <text x="175" y="165">{{ max_money / 8 * 4 | digitsRound}}</text>
                        <text x="215" y="165">{{ max_money / 8 * 5 | digitsRound}}</text>
                        <text x="255" y="165">{{ max_money / 8 * 6 | digitsRound}}</text>
                        <text x="295" y="165">{{ max_money / 8 * 7 | digitsRound}}</text>
                        <text x="335" y="165">{{ max_money / 8 * 8 | digitsRound}}</text>
                        <text x="375" y="165">金额</text>
                    </g>
                    <g id="colunm">
                        <rect x="30" y="32" rx="10" ry="10" :width="perwidth * this.park.C1" height="16" fill="url(#mycolor)">
                            <animate attributeName="width" from="0" :to="perwidth * this.park.C1" dur=".5s" />
                        </rect>
                        <rect x="30" y="62" rx="10" ry="10" :width="perwidth * this.park.C2" height="16" fill="url(#mycolor)">
                            <animate attributeName="width" from="0" :to="perwidth * this.park.C2" dur=".5s" />
                        </rect>
                        <rect x="30" y="92" rx="10" ry="10" :width="perwidth * this.park.C3" height="16" fill="url(#mycolor)">
                            <animate attributeName="width" from="0" :to="perwidth * this.park.C3" dur=".5s" />
                        </rect>
                        <rect x="30" y="122" rx="10" ry="10" :width="perwidth * this.park.C4" height="16" fill="url(#mycolor)">
                            <animate attributeName="width" from="0" :to="perwidth * this.park.C4" dur=".5s" />
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
            park: {
                'C1': 0,
                'C2': 0,
                'C3': 0,
                'C4': 0
            }
        }
    },
    computed: {
        max_money() {
            return Math.max(...Object.values(this.park)) <= 320 ? 320 : Math.max(...Object.values(this.park))
        },
        perwidth() {
            return this.max_money / 320
        }
    },
    methods: {
        init() {
            this.axios.get('/api/parkMoneyOrder').then(res => {
                res !== undefined ?
                    this.park = res.data.parkMoney :
                    console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style>

</style>
