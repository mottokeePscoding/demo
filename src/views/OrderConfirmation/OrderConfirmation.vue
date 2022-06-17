<template>
  <div class="wrapper">
    <top-area></top-area>
    <product-list :shop-id="shopId"></product-list>
    <order-part></order-part>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import TopArea from './TopArea.vue'
import ProductList from '../../components/ProductList.vue'
import OrderPart from './OrderPart.vue'

export default {
  name: 'OrderConfirmation',
  components: { TopArea, ProductList, OrderPart },
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    return { shopId }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #eee;
  overflow-y: scroll;
}
</style>
