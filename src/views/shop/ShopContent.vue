<template>
    <div class="content">
        <div class="category">
            <div
                :class="{'category__item': true, 'category__item--active': currentTab === item.tab}"
                v-for="item in categories"
                :key="item.name"
                @click="() => handleTabClick(item.tab)"
            >
            {{ item.name }}
            </div>
        </div>
        <div class="product">
            <div
                class="product__item"
                v-for="item in list"
                :key="item._id"
            >
                <img class="product__item__img" :src="item.imgUrl" alt="">
                <div class="product__item__detail">
                    <h4 class="product__item__title">{{item.name}}</h4>
                    <p class="product__item__sales">月售{{item.sales}}件</p>
                    <p class="product__item__price">
                        <span class="product__item__price__yen">&yen;{{item.price}}</span>
                        <span class="product__item__price__origin">&yen;{{item.oldPrice}}</span>
                    </p>
                </div>
                <div class="product__number">
                    <span
                        class="iconfont product__number__minus"
                        @click="() => { changeCartItem(shopId, item._id, item, -1, shopName) }"
                    >&#xe677;</span>
                    {{getProductCartCount(shopId, item._id)}}
                    <span
                        class="iconfont product__number__plus"
                        @click="() => { changeCartItem(shopId, item._id, item, 1, shopName) }"
                    >&#xe845;</span>
                </div>
            </div>
        </div>
    </div>
    <shop-cart />
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '../../utils/request'
import ShopCart from './ShopCart.vue'
import { useCommonCartEffect } from '../../effects/cartEffects'

const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'secKill' },
  { name: '新鲜水果', tab: 'fruit' }
]

// 和 tab切换 相关的逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 列表内容相关的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] })
  const getContentData = async (tab) => {
    const result = await get(`/api/shop/${shopId}/products`, { tab: currentTab.value })
    if (result?.errno === 0 && result?.data?.length) { content.list = result.data }
  }
  // watchEffect 使得 getContentData 依赖改变时就重新执行
  watchEffect(() => { getContentData() })
  const { list } = toRefs(content)
  return { list }
}

// 购物车信息相关逻辑
const useCartEffect = () => {
  const store = useStore()
  const { changeCartItemInfo, cartList } = useCommonCartEffect()
  const changeCartItem = (shopId, productId, item, number, shopName) => {
    changeCartItemInfo(shopId, productId, item, number)
    changeShopName(shopId, shopName)
  }
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  return { cartList, changeCartItem, getProductCartCount }
}

export default {
  name: 'ShopContent',
  components: { ShopCart },
  props: ['shopName'],
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCurrentListEffect(currentTab, shopId)
    const { cartList, changeCartItem, getProductCartCount } = useCartEffect()
    return { list, categories, handleTabClick, currentTab, shopId, changeCartItem, cartList, getProductCartCount }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.content {
    position: absolute;
    display: flex;
    left: 0;
    right: 0;
    top: 1.5rem;
    bottom: .5rem;
}
.category {
    overflow-y: scroll;
    width: .76rem;
    height: 100%;
    background: $search-bgColor;
    &__item {
        line-height: .4rem;
        text-align: center;
        font-size: .14rem;
        color: $content-fontcolor;
        &--active {
            background: $bgColor;
        }
    }
}
.product {
    overflow-y: scroll;
    flex: 1;
    &__item {
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: .01rem solid $content-bgColor;
        &__detail {
            overflow: hidden;
        }
        &__img {
            width: .68rem;
            height: .68rem;
            margin-right: .16rem;
        }
        &__title {
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color: $content-fontcolor;
            @include ellipsis
        }
        &__sales {
            margin: .06rem 0;
            font-size: .12rem;
            line-height: .16rem;
            color: $content-fontcolor;
        }
        &__price {
            margin: 0;
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
        bottom: .12rem;
        line-height: .18rem;
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
</style>
