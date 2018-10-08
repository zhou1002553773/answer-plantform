<template>
    <section class="bigF static-box">
        <section class="formBox bigF item-title">
            <h4>入住人</h4>
        </section>
        <section class="purchase-info-box" v-for="(item, index) in purchaseList">
            <div class="delete-box">
                <span>入住人{{index + 1}}</span>
            </div>
            <div class="line-bold"></div>
            <section class="formBox">
                <span>姓名</span>
                <div class="input-box">{{item.customerName}}</div>
            </section>
            <section class="formBox">
                <span>身份证</span>
                <div class="input-box">{{item.customerIdentificaitonCard}}</div>
            </section>

            <section class="formBox">
                <span>联系电话</span>
                <div class="input-box">
                    {{item.customerMobile}}
                </div>
            </section>
        </section>
    </section>
</template>
<script>
export default {
    props: ['purchaseList']
}
</script>