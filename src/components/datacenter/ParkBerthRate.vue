<template>
<div class="col-xl-6 p-0">
    <div class="my-3 mr-4 border shadow row_two">
        <div class="px-3">
            <div class="mt-1 title_line">
                <p class="pl-3 font-weight-bold">停车周转率</p>
            </div>
            <div>
                <svg height="290" width="610">
                    <linearGradient id="vcolor">
                        <stop offset="0" stop-color="#6ac4c7" stop-opacity="0.9" />
                        <stop offset="25" stop-color="#318bcc" stop-opacity="0.9" />
                        <stop offset="50" stop-color="#1b479c" stop-opacity="0.9" />
                        <stop offset="75" stop-color="#554398" stop-opacity="0.9" />
                        <stop offset="100" stop-color="#b84795" stop-opacity="0.9" />
                    </linearGradient>
                    <g id="outpattern" fill="#bdbdbd" stroke="#bdbdbd" stroke-width="1">
                        <path d="M 30 20 H 580" />
                        <path d="M 30 70 H 580" />
                        <path d="M 30 120 H 580" />
                        <path d="M 30 170 H 580" />
                        <path d="M 30 220 H 580" />

                        <path d="M 30 270 H 580" />

                        <path d="M 75 270 V 268" />
                        <path d="M 120 270 V 268" />
                        <path d="M 165 270 V 268" />
                        <path d="M 210 270 V 268" />
                        <path d="M 255 270 V 268" />
                        <path d="M 300 270 V 268" />
                        <path d="M 345 270 V 268" />
                        <path d="M 390 270 V 268" />
                        <path d="M 435 270 V 268" />
                        <path d="M 480 270 V 268" />
                        <path d="M 525 270 V 268" />
                        <path d="M 570 270 V 268" />
                    </g>
                    <g id="text" fill="#bdbdbd" font-size="14">
                        <text x="0" y="220">0.2</text>
                        <text x="0" y="170">0.4</text>
                        <text x="0" y="120">0.6</text>
                        <text x="0" y="70">0.8</text>
                        <text x="0" y="20">1.0</text>

                        <text x="25" y="285">0</text>
                        <text x="70" y="285">2</text>
                        <text x="115" y="285">4</text>
                        <text x="160" y="285">6</text>
                        <text x="205" y="285">8</text>
                        <text x="250" y="285">10</text>
                        <text x="295" y="285">12</text>
                        <text x="340" y="285">14</text>
                        <text x="385" y="285">16</text>
                        <text x="430" y="285">18</text>
                        <text x="472" y="285">20</text>
                        <text x="520" y="285">22</text>
                        <text x="565" y="285">24</text>
                        <text x="585" y="270" font-size="12">时间</text>
                    </g>
                    <g id="path">
                        <path :d="'M'+' 30 '+ handlePoint(this.parkrate['0']) + 
                        ' L ' + ' 75 ' + handlePoint(this.parkrate['2']) + 
                        ' L ' + ' 120 ' + handlePoint(this.parkrate['4']) + 
                        ' L ' + ' 165 ' + handlePoint(this.parkrate['6']) + 
                        ' L ' + ' 210 ' + handlePoint(this.parkrate['8']) + 
                        ' L ' + ' 255 ' + handlePoint(this.parkrate['10']) + 
                        ' L ' + ' 300 ' + handlePoint(this.parkrate['12']) + 
                        ' L ' + ' 345 ' + handlePoint(this.parkrate['14']) + 
                        ' L ' + ' 390 ' + handlePoint(this.parkrate['16']) + 
                        ' L ' + ' 435 ' + handlePoint(this.parkrate['18']) + 
                        ' L ' + ' 480 ' + handlePoint(this.parkrate['20']) + 
                        ' L ' + ' 525 ' + handlePoint(this.parkrate['22']) + 
                        ' L ' + ' 570 ' + handlePoint(this.parkrate['24'])
                        " fill="none" stroke="url(#vcolor)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
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
            parkrate: {
                0: 0.2,
                2: 0.4,
                4: 0.6,
                6: 0.8,
                8: 0.6,
                10: 0.4,
                12: 0.2,
                14: 0.4,
                16: 0.7,
                18: 0.5,
                20: 0.4,
                22: 0.1,
                24: 0.2
            }
        }
    },
    computed: {
        per() {
            return 1 / 250
        }
    },
    methods: {
        handlePoint(val) {
            let upLimit = 20
            let downLimit = 270
            let y = 270 - val / this.per

            if (y >= upLimit && y <= downLimit) {
                return Math.floor(y)
            } else if (y <= upLimit) {
                return upLimit
            } else if (y >= downLimit) {
                return downLimit
            }
        },
        init() {
            this.axios.get('/api/berthRate').then(res => {
                console.log(res.data)
                res !== undefined
                ? this.parkrate = res.data.rate
                : console.log('res undefined')
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mounted() {
        // this.init()
    }
}
</script>

<style scoped>
#path path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
    animation: hash 2s ease-in;
}

@keyframes hash {
    from {
        stroke-dashoffset: 1000;
    }

    to {
        stroke-dashoffset: 0;
    }
}
</style>
