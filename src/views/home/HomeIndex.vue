<template>
  <div class="wrapper">
    <static-part />
    <near-by />
  </div>
  <docker-part :currentIndex="0" />
</template>

<script>
import StaticPart from './StaticPart.vue'
import NearBy from './NearBy.vue'
import DockerPart from '../../components/DockerPart.vue'
export default {
  name: 'HomeIndex',
  components: { StaticPart, NearBy, DockerPart }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
.wrapper {
  @include wrapper;
}
</style>
