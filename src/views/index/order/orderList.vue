<template>
    <div class="source-box">
        <!-- <router-link target="_blank"
                      :to="{
                        name: 'survey-detail',
                        query: {
                          enterpriseCode: $route.query.enterpriseCode
                        }
                      }">
          <el-button class="add-btn" type="primary" size="mini">增加</el-button>
        </router-link> -->

        <div class="formDiscount">
            <section class="formBox">
                <span>产品名称</span>
                <select-product class="input-box"
                                :search-data="formInline"
                                :m-code="'productCode'"
                                :m-name="'productCname'">
                </select-product>
            </section>
            <section class="formBox">
                <span>下单时间</span>
                <el-date-picker
                    class="input-box"
                    v-model="formInline.orderCreateTime"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </section>
            <section class="formBox">
                <span>订单状态</span>
                <el-select class="input-box"
                            v-model="formInline.orderStatus"
                            filterable
                            placeholder="请选择">
                    <el-option :label="'全部'" :value="''"></el-option>
                    <el-option :label="'待支付'" :value="'1'"></el-option>
                    <el-option :label="'已支付'" :value="'2'"></el-option>
                    <el-option :label="'待确认'" :value="'3'"></el-option>
                    <el-option :label="'已确认'" :value="'5'"></el-option>
                    <el-option :label="'订单执行中'" :value="'6'"></el-option>
                    <el-option :label="'订单完成'" :value="'7'"></el-option>
                    <el-option :label="'订单申请取消'" :value="'8'"></el-option>
                    <el-option :label="'订单取消'" :value="'9'"></el-option>
                    <el-option :label="'订单异常'" :value="'10'"></el-option>
                    <el-option :label="'订单关闭'" :value="'11'"></el-option>
                </el-select>
            </section>
        </div>
        <el-button class="save-btn primary" size="mini" icon="document"
            @click="searchItem">查询</el-button>

        <div class="clear demo-form-inline"></div>
        
        <!-- 列表 -->
        <el-table
            :data="orderList"
            border
            style="width: 100%">
            
                <el-table-column
                    prop="ownerStockRight"
                    label="订单时间">
                    <template scope="scope">
                        {{scope.row.orderCreateTime ? scope.row.orderCreateTime.split(' ')[0] : ''}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="orderMemberName"
                    label="下单人">
                </el-table-column>
                <el-table-column
                    prop="orderMemberMobile"
                    label="手机号">
                </el-table-column>
                <el-table-column
                    label="订单状态">
                    <template scope="scope">
                        <template v-if="scope.row.orderStatus == 1">待支付</template>
                        <template v-else-if="scope.row.orderStatus == 2">已支付</template>
                        <template v-else-if="scope.row.orderStatus == 3">待确认</template>
                        <template v-else-if="scope.row.orderStatus == 5">已确认</template>
                        <template v-else-if="scope.row.orderStatus == 6">订单执行中</template>
                        <template v-else-if="scope.row.orderStatus == 7">订单完成</template>
                        <template v-else-if="scope.row.orderStatus == 8">订单申请取消</template>
                        <template v-else-if="scope.row.orderStatus == 9">订单取消</template>
                        <template v-else="scope.row.orderStatus == 10">订单异常</template>
                        <template v-else="scope.row.orderStatus == 11">订单关闭</template>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <router-link target="_blank"
                                    :to="{
                                        name: 'order-detail',
                                        query: {
                                            orderCode: scope.row.orderCode
                                        }
                                    }">
                            <el-button size="small"
                                        class="el-button-reset">查看</el-button>
                              
                        </router-link>
                        <el-button size="small"
                                    v-if="scope.row.orderStatus == 2 || scope.row.orderStatus == 3"
                                    type="primary"
                                    @click="confirmOrder(scope.row)">抢单</el-button>
                        <el-button size="small"
                                    v-if="scope.row.orderStatus == 5"
                                    type="primary"
                                    @click="robOrder(scope.row)">发货</el-button>
                    </template>
                </el-table-column>
        </el-table>

        <el-pagination
            v-if="total"
            class="page-box"
            @current-change="pageChange"
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="total">
        </el-pagination>
        <el-dialog class="user-add-box" title="抢单" :visible.sync="showModal">
          <el-form :label-position="'left'" :model="itemData" label-width="90px">
            <el-form-item label="发货时间" class="remark-box">
                <el-date-picker
                    class="input-box"
                    v-model="itemData.logisticsCreateTime"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="物流编码" class="remark-box">
                <el-input class="input-box" v-model="itemData.orderLogisticCode"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="showModal = false" size="small" class="el-button-reset">取 消</el-button>
                <el-button type="primary" @click="confirmItem" size="small">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            formInline: {
                orderCreateTime: '',//入职时间
                productCode: '', //员工姓名
                orderStatus: ''//离职时间
            },
            orderList: [],
            pageSize: 20,
            pageNumber: 1,
            total: 0,
            showModal: false,
            itemData: {
                orderLogisticCode: '',
                logisticsCreateTime: '',
                userCode: '',
                orderCode: ''
            }
        }
    },
    mounted () {
        this.getList()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        searchItem () {
            this.pageNumber = 1
            this.getList()
        },
        getList () {
            var formData = {
                orderGoodsCode: '',
                enterpriseCode: this.userInfo.company,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }

            formData = Object.assign(formData, this.formInline)

            if (formData.productCode) {
                formData.orderGoodsCode = formData.productCode
            }

            if (formData.orderCreateTime) {
                formData.orderCreateTime = util.formDataDate(formData.orderCreateTime)
            }

            util.request({
                method: 'post',
                interface: 'orderList',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.total = Number(res.result.total)
                    this.orderList = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        pageChange (size) {
            this.pageNumber = size
            this.getList()
        },
        confirmOrder (item) {
            util.request({
                method: 'post',
                interface: 'confirmOrder',
                data: {
                    orderCode: item.orderCode,
                    optUserCode: this.userInfo.userInfo.userCode,
                    enterpriseCode: this.userInfo.company
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getList()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },   
        robOrder (item) {
            this.showModal = true
            this.itemData.orderCode = item.orderCode,
            this.itemData.userCode = this.userInfo.userInfo.userCode
        },
        confirmItem () {
            if (!this.itemData.logisticsCreateTime) {
                this.$message({
                    message: '请选择发货时间！',
                    type: 'warning'
                })
                return false
            }
            if (!this.itemData.orderLogisticCode) {
                this.$message({
                    message: '请填写物流编码！',
                    type: 'warning'
                })
                return false
            }
            this.itemData.logisticsCreateTime = util.formatDate(this.itemData.logisticsCreateTime)
            util.request({
                method: 'post',
                interface: 'orderDeliver',
                data: this.itemData
            }).then(res => {
                if (res.result.success == '1') {
                    this.showModal = false
                    this.getList()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    },
    components: {
        selectProduct
    }
}
</script>