<template>
    <div class="products">
      <div class="products__title">{{shopName}}</div>
      <div class="products__wrapper">
        <div class="products__list">
          <div
          class="products__item"
          v-for="item in confirmProductList"
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
</template>

<script>
import { useCommonCartEffect } from '../effects/cartEffects'

export default {
  name: 'ProductList',
  props: ['shopId'],
  setup (props) {
    const { confirmProductList, shopName, calculations } = useCommonCartEffect(props.shopId)
    return { confirmProductList, shopName, calculations }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';
@import '../style/mixins.scss';

.products {
  margin: .16rem .18rem .55rem .18rem;
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
  &__wrapper {
    overflow-y: scroll;
    position: absolute;
    left: 0;
    right: 0;
    bottom: .6rem;
    top: 2.6rem;
    margin: 0 .18rem;
  }
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
