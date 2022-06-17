<template>
    <div class="mask" v-if="showCart" @click="handleCartShowChange" />
    <div class="cart">
        <div class="product" v-if="showCart">
            <div class="product__header">
                <div
                    class="product__header__all"
                    @click="() => setCartItemsChecked(shopId)"
                >
                    <span
                        class="product__header__icon iconfont"
                        v-html="calculations.allChecked? '&#xe63b;' : '&#xe619;'"
                    />
                    全选
                </div>
                <div class="product__header__clear">
                  <span
                    class="product__header__clear__btn"
                    @click="() => cleanCartProducts(shopId)"
                  >清空购物车</span>
                </div>
            </div>
            <div
            class="product__item"
            v-for="item in confirmProductList"
            :key="item._id"
            >
                <div
                    class="product__item__checked iconfont"
                    v-html="item.check? '&#xe63b;' : '&#xe619;'"
                    @click.stop="() => changeCartItemChecked(shopId, item._id)"
                />
                <img class="product__item__img" :src="item.imgUrl" alt="">
                <div class="product__item__detail">
                <h4 class="product__item__title">{{item.name}}</h4>
                <p class="product__item__price">
                    <span class="product__item__price__yen">&yen;{{item.price}}</span>
                    <span class="product__item__price__origin">&yen;{{item.oldPrice}}</span>
                </p>
                </div>
                <div class="product__number">
                <span
                    class="iconfont product__number__minus"
                    @click="() => { changeCartItemInfo(shopId, item._id, item, -1) }"
                >&#xe677;</span>
                {{item.count || 0}}
                <span
                    class="iconfont product__number__plus"
                    @click="() => { changeCartItemInfo(shopId, item._id, item, 1) }"
                >&#xe845;</span>
                </div>
            </div>
        </div>
        <div class="check">
            <div class="check__icon">
                <img
                    class="check__icon__img"
                    src="http://www.dell-lee.com/imgs/vue3/basket.png"
                    @click="handleCartShowChange"
                />
                <div class="check__icon__tag">{{calculations.totalCount}}</div>
            </div>
            <div class="check__info">
                总计：<span class="check__info__price">&yen; {{calculations.totalPrice}}</span>
            </div>
            <div class="check__btn" v-show="calculations.totalCount > 0">
              <router-link :to="{path: `/orderConfirmation/${shopId}`}">
                去结算
              </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'

// 购物车相关逻辑
const useCartEffect = (shopId) => {
  const store = useStore()
  const { changeCartItemInfo, confirmProductList, calculations } = useCommonCartEffect(shopId)

  // 更改购物车 选中 按钮
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }

  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }

  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', { shopId, calculations })
  }

  return {
    calculations,
    confirmProductList,
    changeCartItemInfo,
    changeCartItemChecked,
    cleanCartProducts,
    setCartItemsChecked
  }
}

// 展示隐藏购物车逻辑
const toggleCartEffect = (calculations) => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    if (calculations.value.totalCount > 0) showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}

export default {
  name: 'ShopCart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const {
      calculations, confirmProductList, setCartItemsChecked,
      changeCartItemInfo, changeCartItemChecked, cleanCartProducts
    } = useCartEffect(shopId)
    const { showCart, handleCartShowChange } = toggleCartEffect(calculations)
    return {
      calculations,
      confirmProductList,
      shopId,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked,
      showCart,
      handleCartShowChange
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,0.50);
  z-index: 1;
}
.product {
    overflow-y: scroll;
    flex: 1;
    background: $bgColor;
    &__header {
        display: flex;
        line-height: .52rem;
        border-bottom: .01rem solid $content-bgColor;
        font-size: .14rem;
        color: $content-fontcolor;
        &__all {
            width: .64rem;
            margin-left: .18rem;
        }
        &__icon {
            display: inline-block;
            color: $btn-bgColor;
            font-size: .2rem;
            vertical-align: top;
            margin-right: .1rem;
        }
        &__clear {
            flex: 1;
            margin-right: .16rem;
            text-align: right;
            &__btn {
              display: inline-block;
            }
        }
    }
    &__item {
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: .01rem solid $content-bgColor;
        &__checked {
            color: $btn-bgColor;
            font-size: .25rem;
            line-height: .5rem;
            margin-right: .15rem;
        }
        &__detail {
            overflow: hidden;
        }
        &__img {
            width: .46rem;
            height: .46rem;
            margin-right: .16rem;
        }
        &__title {
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color: $content-fontcolor;
            @include ellipsis
        }
        &__price {
            margin: .06rem 0 0 0;
            line-height: .2rem;
            font-size: .14rem;
            color: $highlight-fontColor;
            &__yen {
                font-size: .12rem;
            }
            &__origin {
                margin-left: .06rem;
                line-height: .2rem;
                font-size: .12rem;
                color: $light-fontColor;
                text-decoration: line-through;
            }
        }
    }
    &__number {
        position: absolute;
        right: 0;
        bottom: .25rem;
        &__minus, &__plus {
            position:relative;
            top: .02rem;
            font-size: .2rem;
        }
        &__minus {
            color: $medium-fontColor;
            margin-right: .05rem;
        }
        &__plus {
            color: $btn-bgColor;
            margin-left: .05rem;
        }
    }
}
.cart {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: .5rem;
    z-index: 2;
}
.check {
    display: flex;
    line-height: .49rem;
    height: .49rem;
    background: $bgColor;
    border-top: .01rem solid $content-bgColor;
    &__icon {
        position: relative;
        width: .84rem;
        &__img {
            width: .28rem;
            height: .26rem;
            display: block;
            margin: 0 auto;
            margin-top: .12rem;
        }
        &__tag {
            position: absolute;
            left: .46rem;
            right: .2rem;
            top: .04rem;
            padding: 0 .04rem;
            min-width: .2rem;
            min-height: .2rem;
            line-height: .2rem;
            background-color: $highlight-fontColor;
            border-radius: .1rem;
            font-size: .12rem;
            text-align: center;
            color: $bgColor;
            transform: scale(.5);
            transform-origin: left center;
        }
    }
    &__info {
        flex: 1;
        color: $content-fontcolor;
        font-size: .12rem;
        &__price {
            color: $highlight-fontColor;
            font-size: .18rem;
        }
    }
    &__btn {
        width: .98rem;
        font-size: .14rem;
        text-align: center;
        background-color: #4FB0F9;
        a {
          color: $bgColor;
          text-decoration: none;
        }
    }
}
</style>
