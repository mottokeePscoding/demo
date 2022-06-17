<template>
    <div class="order">
      <div class="order__price">实付金额
        <span class="order__price__num">&yen;{{calculations.totalPrice}}</span>
      </div>
      <div class="order__btn" @click="() => handleSubmitClick(true)">提交订单</div>
    </div>
    <toast-part v-if="show" :message="toastMsg" />
    <div
      class="mask"
      v-show="showConfirm"
      @click="() => handleSubmitClick(false)"
    >
      <div class="mask__content" @click.stop>
          <h3 class="mask__content__title">确认要离开收银台？</h3>
          <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
          <div class="mask__content__btns">
              <div
                  class="mask__content__btn mask__content__btn--first"
                  @click="() => handleConfirmOrder(true)"
              >取消订单</div>
              <div
                  class="mask__content__btn mask__content__btn--last"
                  @click="() => handleConfirmOrder(false)"
              >确认支付</div>
          </div>
      </div>
    </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { post } from '../../utils/request.js'
import { useStore } from 'vuex'
import { ref } from 'vue'
import { useCommonCartEffect } from '../../effects/cartEffects'
import ToastPart, { useToastEffect } from '../../components/ToastPart.vue'

// 下单相关逻辑
const useMakeOrderEffect = (confirmProductList, shopName, shopId, showToast, showConfirm) => {
  const router = useRouter()
  const store = useStore()

  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    for (const i in confirmProductList.value) {
      const product = confirmProductList.value[i]
      products.push({ id: parseInt(product._id, 10), num: product.count })
    }
    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (result?.errno === 0) {
        showToast('支付成功！')
        store.commit('clearCartData', shopId)
        showConfirm.value = false
        router.push({ name: 'OrderList' })
      }
    } catch (e) {
      showToast('请求失败！')
    }
  }
  return { handleConfirmOrder }
}

// 蒙层展示相关逻辑
const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleSubmitClick = (status) => {
    showConfirm.value = status
  }
  return { showConfirm, handleSubmitClick }
}

export default {
  name: 'OrderPart',
  components: { ToastPart },
  setup () {
    const route = useRoute()
    const shopId = parseInt(route.params.id, 10)
    const { calculations, shopName, confirmProductList } = useCommonCartEffect(shopId)
    const { show, toastMsg, showToast } = useToastEffect()
    const { showConfirm, handleSubmitClick } = useShowMaskEffect()
    const { handleConfirmOrder } = useMakeOrderEffect(confirmProductList, shopName, shopId, showToast, showConfirm)

    return { show, toastMsg, calculations, handleConfirmOrder, useToastEffect, handleSubmitClick, showConfirm }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: $bgColor;
  &__price {
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: $content-fontcolor;
    &__num {
      font-weight: 600;
      font-size: .16rem;
    }
  }
  &__btn {
    width: .98rem;
    background: #4FB0F9;
    color: $bgColor;
    text-align: center;
    font-size: .14rem;
  }
}
.mask {
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0,0,0,0.50);
    &__content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 3rem;
        height: 1.56rem;
        background: #fff;
        border-radius: .04rem;
        text-align: center;
        &__title {
            margin: .24rem 0 0 .1rem;
            line-height: .26rem;
            font-size: .18rem;
            color: #333;
        }
        &__desc {
            margin: .08rem 0 0 0;
            font-size: .14rem;
            color: #666;
        }
        &__btns {
            display: flex;
            margin: .24rem .58rem;
        }
        &__btn {
            flex: 1;
            width: .8rem;
            line-height: .32rem;
            border-radius: .16rem;
            font-size: .14rem;
            &--first {
                margin-right: .24rem;
                border: .01rem solid #4FB0F9;
                color: #0091FF;
            }
            &--last {
                background: #4FB0F9;
                color: #fff;
            }
        }
    }
}
</style>
