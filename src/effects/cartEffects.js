import { useStore } from 'vuex'
import { computed } from 'vue'

// 购物车相关的逻辑
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList

  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', {
      shopId, productId, productInfo, num
    })
  }

  // 同商店已购买物品的列表
  const confirmProductList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    const notEmptyProductList = {}
    for (const i in productList) {
      const product = productList[i]
      if (product.count > 0) notEmptyProductList[i] = product
    }
    return notEmptyProductList
  })

  // 返回商店名称
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })

  // 返回同商店购物车的总价，总计数
  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList
    const result = { totalCount: 0, allChecked: true, totalPrice: 0 }
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.check) {
          result.totalPrice += product.count * product.price
        }
        if (product.count > 0 && !product.check) {
          result.allChecked = false
        }
        result.totalCount += product.count
      }
    }
    result.totalPrice = result.totalPrice.toFixed(2)
    return result
  })

  return { changeCartItemInfo, cartList, confirmProductList, shopName, calculations }
}
