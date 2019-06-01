<template>
<div class="detail-content">
    <detail-banner></detail-banner>
    <detail-header></detail-header>
    <div class="content">
        <detail-list :list="list"></detail-list>
    </div>
</div>
</template>

<script>
import DetailBanner from "./components/banner";
import DetailHeader from "./components/header";
import DetailList from "./components/list";
export default {
    name: "detail",
    components: {
        DetailBanner,
        DetailHeader,
        DetailList
    },
    data() {
        return {
            list: [{
                    title: "故宫预售老人票",
                    children: [{
                            title: "故宫+珍宝馆+钟表馆",
                            price: 40,
                            children:[{
                                title:"三级"
                            },{
                                title:"三级"
                            }]
                        },
                        {
                            title: "故宫+珍宝馆",
                            price: 35
                        }
                    ]
                },
                {
                    title: "故宫预售学生票",
                    children: [{
                            title: "故宫+钟表馆",
                            price: 40
                        },
                        {
                            title: "故宫",
                            price: 35
                        }
                    ]
                },
                {
                    title: "大内御讲",
                    children: [{
                            title: "蓝琪儿格格故宫讲解（不含门票）",
                            price: 75
                        },
                        {
                            title: "门票+珍宝馆+蓝琪儿格格故宫讲解",
                            price: 98
                        }
                    ]
                }
            ]
        };
    }
};
</script>

<style lang="stylus" scoped>
.detail-content {
    height: 20rem;
}
</style>
