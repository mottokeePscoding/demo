<template>
    <div class="wrapper">
      <div class="title">我的全部购物车({{cartCount}})</div>
      <div
      class="empty"
      v-if="cartCount === 0"
      >
        购物车当前为空哦~
      </div>
      <div
      class="shop"
      v-for="(shop,index) in cartListWithProduct"
      :key="index"
      >
        <div class="shop__title">{{shop.shopName}}</div>
        <div class="products">
            <div class="products__list">
              <div
              class="products__item"
              v-for="item in shop.productList"
              :key="item._id"
              >
                <img class="products__item__img" :src="item.imgUrl" alt="" />
                <div class="products__item__detail">
                  <h4 class="products__item__title">{{item.name}}</h4>
                  <p class="products__item__price">
                    <span>
                        <span class="products__item__price__yen">&yen;</span>{{item.price}} * {{item.count}}
                    </span>
                    <span class="products__item__total">
                        <span class="products__item__price__yen">&yen;</span>{{(item.price * item.count).toFixed(2)}}
                    </span>
                  </p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    <docker-part :currentIndex="1" />
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import DockerPart from '../../components/DockerPart.vue'

const useCartEffect = () => {
  const store = useStore()
  const cartList = store.state.cartList
  const cartListWithProduct = computed(() => {
    const newCartList = {}
    for (const shopId in cartList) {
      let total = 0
      const products = cartList[shopId].productList
      for (const productId in products) {
        const product = products[productId]
        total += (product.count || 0)
      }
      if (total > 0) {
        newCartList[shopId] = cartList[shopId]
      }
    }
    return newCartList
  })
  const cartCount = computed(() => {
    let count = 0
    for (const shopId in cartListWithProduct.value) {
      if (shopId) count += 1
    }
    return count
  })
  return { cartListWithProduct, cartCount }
}

export default {
  name: 'CartIndex',
  components: { DockerPart },
  setup () {
    const { cartListWithProduct, cartCount } = useCartEffect()
    return { cartListWithProduct, cartCount }
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
.empty {
  margin-top: .16rem;
  color: $medium-fontColor;
  font-size: .14rem;
  text-align: center;
}
.shop {
  background: $bgColor;
  border-radius: .04rem;
  &__title {
    padding: .16rem;
    line-height: .22rem;
    margin-top: .16rem;
    font-size: .16rem;
    font-weight: bold;
    color: $content-fontcolor;
  }
}
.products {
  &__list {
    background: $bgColor;
    border-radius: .04rem;
  }
  &__item {
      position: relative;
      display: flex;
      padding: 0 .16rem .16rem .16rem;
    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }
    &__detail {
      flex: 1;
    }
    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis
    }
    &__price {
      display: flex;
      margin: .06rem 0 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $highlight-fontColor;
      &__yen {
        font-size: .08rem;
      }
    }
    &__total {
        flex: 1;
        text-align: right;
        color: $dark-fontcolor;
    }
  }
}
</style>
