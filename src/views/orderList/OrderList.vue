<template>
    <div class="wrapper">
        <div class="title">我的订单</div>
        <div class="orders">
            <div
                class="order"
                v-for="(item, index) in list"
                :key="index"
            >
                <div class="order__title">
                    {{item.shopName}}
                    <span class="order__status">{{item.isCanceled ? '已取消' : '已下单'}}</span>
                </div>
                <div class="order__content">
                    <div class="order__content__imgs">
                        <template
                            v-for="(innerItem, innerIndex) in item.products"
                            :key="innerIndex"
                        >
                            <img
                            class="order__content__img"
                            :src="innerItem.product.img"
                            v-if="innerIndex <= 3"
                            >
                        </template>
                    </div>
                    <div class="order__content__info">
                        <div class="order__content__price">￥{{item.totalPrice}}</div>
                        <div class="order__content__count">共{{item.totalCount}}件</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <docker-part :currentIndex="2" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request.js'
import DockerPart from '../../components/DockerPart.vue'

// 处理订单列表逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getOrderList = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data
      orderList.forEach((order) => {
        const products = order.products || []
        let totalPrice = 0
        let totalCount = 0
        products.forEach((productItem) => {
          totalCount += (productItem?.orderSales || 0)
          totalPrice += ((productItem?.product?.price * productItem?.orderSales) || 0)
        })
        order.totalPrice = totalPrice
        order.totalCount = totalCount
      })
      data.list = result.data
    }
  }
  getOrderList()
  const { list } = toRefs(data)
  return { list }
}

export default {
  name: 'OrderList',
  components: { DockerPart },
  setup () {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.wrapper {
  @include wrapper;
  background: rgb(248, 248, 248);
}
.title {
    background: $bgColor;
    line-height: .44rem;
    color: $content-fontcolor;
    font-size: .16rem;
    text-align: center;
    margin: 0 -.18rem;
}
.order {
    margin-top: .16rem;
    padding: .16rem;
    background: $bgColor;
    &__title {
        margin-bottom: .16rem;
        line-height: .22rem;
        font-size: .16rem;
        font-weight: bold;
        color: $content-fontcolor;
    }
    &__status {
        float: right;
        color: $light-fontColor;
        font-size: .14rem;
    }
    &__content {
        display: flex;
        &__imgs {
            flex: 1;
        }
        &__img {
            height: .4rem;
            width: .4rem;
            margin-right: .12rem;
        }
        &__info {
            width: .7rem;
        }
        &__price {
            margin-bottom: .04rem;
            line-height: .2rem;
            font-size: .14rem;
            color: $highlight-fontColor;
            text-align: right;
        }
        &__count {
            line-height: .14rem;
            font-size: .12rem;
            color: $content-fontcolor;
            text-align: right;
        }
    }
}
</style>
