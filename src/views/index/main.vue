<template>
    <section>
        <web-header></web-header>
        <section class="mid-body-box">
            <router-view></router-view>
        </section>

        <web-footer></web-footer>
    </section>
</template>
<script>
import webHeader from '../../components/common/header.vue'
import webFooter from '../../components/common/footer.vue'
import $ from 'Jquery'
export default {
    data () {
        return {}
    },
    mounted () {
        var bodyHeight = $(document).height() - 200
        $('.mid-body-box').css('min-height', bodyHeight)
    },
    components: {
        webHeader,
        webFooter
    }
}
</script>
<style lang="scss">
.mid-body-box {
    box-sizing: border-box;
}

.null-register {
    text-align: center;
    font-size: 14px;
    color: #999999;
    padding-top: 200px;
}
</style>
