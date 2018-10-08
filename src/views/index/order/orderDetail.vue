<template>
    <div class="form-discount">
        <!-- 基本信息 -->
        <div  class="float-form-box" >
            <div class="formDiscount static-box">
                <section class="formBox">
                    <span>预定人</span>
                    <div class="input-box">{{addressData.receiverName}}</div>
                </section>

                <section class="formBox">
                    <span>手机号</span>
                    <div class="input-box">{{addressData.receiverPhone}}</div>
                </section>

                <section class="formBox">
                    <span>所在区域</span>
                    <div class="input-box">{{addressData.province + ' ' + addressData.city + ' ' + addressData.area}}</div>
                </section>

                <section class="formBox">
                    <span>邮政编码</span>
                    <div class="input-box">{{addressData.zipCode}}</div>
                </section>

                <section class="formBox">
                    <span>详细地址</span>
                    <div class="input-box">{{addressData.street}}</div>
                </section>

                <section class="formBox">
                    <span>发票抬头</span>
                    <div class="input-box">{{invioceData.invoiceTitle}}</div>
                </section>

                <section class="formBox">
                    <span>发票税号</span>
                    <div class="input-box">{{invioceData.invoiceTaxNo}}</div>
                </section>

                <section class="formBox">
                    <span>总金额</span>
                    <div class="input-box">{{price}}</div>
                </section>
                
                <section class="formBox">
                    <span>物流编码</span>
                    <div class="input-box">{{orderData.orderLogisticCode}}</div>
                </section>
                
                <section class="formBox">
                    <span>发货时间</span>
                    <div class="input-box">{{orderData.orderUpdateTime}}</div>
                </section>

            </div>
            <!-- 列表 -->
            <section class="card-list-large">
                <router-link class="sou-box"
                    target="_blank"
                    :to="{
                        name: 'product-detail',
                        query: {
                            productCode: item.productCode
                        }
                    }"
                    v-for="item in productList">
                    <div class="cover-box">
                        <img class="cover-img" :src="item.productCoverPath">
                    </div>
                    <div class="title-box">
                        <div class="title" v-text="item.productCname"></div>
                    </div>
                    <div class="bottom-box">
                        <div class="status-big-box">
                            ¥{{item.productPrice}}
                        </div>
                        <div class="btn-big-box">
                            <span class="btn-font">{{item.productNum}}</span>
                        </div>
                    </div>
                </router-link>
            </section>
        </div>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import { mapGetters } from 'vuex'
import personList from './personList'
export default {
    data () {
        return {
            orderData: {},
            addressData: {},
            invioceData: {},
            personList: [],
            productList: [],
            price: 0
        }
    },
    mounted () {
        this.getOrderDetail()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        getOrderDetail () {
            util.request({
                method: 'get',
                interface: 'orderDetail',
                data: {
                    orderCode: this.$route.query.orderCode
                }
            }).then((res) => {
                if (res.result.success == '1') {
                    this.orderData = res.result.result
                    this.productList = res.result.result.orderProductList
                    this.getAddressInfo()
                    this.getTaxInfo()
                    this.setPrice()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getTaxInfo () {
            util.request({
                method: 'get',
                interface: 'memberInvoiceDetail',
                data: {
                    invoiceCode: this.orderData.invoiceCode
                }
            }).then((res) => {
                if (res.result.success == '1') {
                    this.invioceData = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getAddressInfo () {
            util.request({
                method: 'get',
                interface: 'memberAddressDetail',
                data: {
                    addressCode: this.orderData.addressCode
                }
            }).then((res) => {
                if (res.result.success == '1') {
                    this.addressData = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        setPrice () {
            var price = 0
            this.productList.forEach((item) => {
                let proPrice = item.productPrice ? Number(item.productPrice) : 0
                let num = item.productNum ? Number(item.productNum) : 1
                price += proPrice * 100 * num
            })
            this.price = (Math.floor(price) / 100).toFixed(2)
        },
    },
    components: {
        personList
    }
}
</script>