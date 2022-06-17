<template>
    <div class="wrapper">
        <div class="header">
            <div class="header__icon iconfont">&#xe683;</div>
            <div class="header__info">
                <img class="header__photo" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fc9%2F63%2F77%2Fc963777ebd9c8ebf5583b39565cfa1d7.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656404120&t=d1caafaacfbf0cb8ae8fa0770d2141e6">
                <div class="header__wrapper">
                    <div class="header__wrapper__name">热心市民李先生</div>
                    <div class="header__wrapper__id">ID: 1069643013</div>
                </div>
                <div class="header__info__details">
                    <div class="header__info__detail">
                        <div class="header__info__details__item">红包</div>
                        <div class="header__info__details__num">218</div>
                    </div>
                    <div class="header__info__detail">
                        <div class="header__info__details__item">优惠券</div>
                        <div class="header__info__details__num">12张</div>
                    </div>
                    <div class="header__info__detail">
                        <div class="header__info__details__item">鲜豆</div>
                        <div class="header__info__details__num">88</div>
                    </div>
                    <div class="header__info__detail">
                        <div class="header__info__details__item">白条</div>
                        <div class="header__info__details__num">1000</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="info">
            <div class="info__container">
                <span class="info__container__icon iconfont" style="color: #ED4A47;">&#xe61c;</span>
                <span class="info__container__name">我的钱包</span>
                <span class="info__container__go iconfont">&#xe7e0;</span>
            </div>
            <div class="info__container">
                <span class="info__container__icon iconfont" style="color: #32C5FF;">&#xe602;</span>
                <span class="info__container__name">我的地址</span>
                <span class="info__container__go iconfont">&#xe7e0;</span>
            </div>
            <div class="info__container info__container__last">
                <span class="info__container__icon iconfont" style="color: rgba(144,19,254,0.92);">&#xe740;</span>
                <span class="info__container__name">客服与帮助</span>
                <span class="info__container__go iconfont">&#xe7e0;</span>
            </div>
        </div>
    </div>
    <docker-part :currentIndex="3" />
</template>

<script>
import DockerPart from '../../components/DockerPart.vue'

export default {
  name: 'UserInfo',
  components: { DockerPart },
  setup () {
    return {}
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
.header {
    position: relative;
    margin: 0 -.18rem;
    padding: 1.08rem .18rem .175rem .175rem;
    z-index: 0;
    overflow: hidden;
    &__icon {
        position: absolute;
        top: .58rem;
        right: .2rem;
        color: $bgColor;
        font-size: .2rem;
    }
    &__info {
        position: relative;
        text-align: center;
        background: $bgColor;
        width: 100%;
        padding-top: .6rem;
        border-radius: .08rem;
        box-shadow: 0 .08rem .16rem 0 rgba(0,0,0,0.08);
        &__details {
            padding: .12rem .28rem .16rem .28rem;
            display: flex;
            justify-content: space-between;
            &__item {
                line-height: .17rem;
                font-size: .12rem;
                color: #C1C0C9;
                margin-bottom: .03rem;
            }
            &__num {
                line-height: .28rem;
                font-size: .2rem;
                color: #262628;
            }
        }
    }
    &__wrapper {
        height: 0.66rem;
        border-bottom: 1px solid $content-bgColor;
        &__name {
            font-size: .24rem;
            color: #262628;
            line-height: .36rem;
        }
        &__id {
            line-height: .17rem;
            font-size: .14rem;
            color: #C1C0C9;
            margin-top: .02rem;
        }
    }
    &__photo {
        position: absolute;
        top: -.47rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
        width: .94rem;
        height: .94rem;
        border-radius: 50%;
    }
}
.header::after {
    content: '';
    position: absolute;
    width: 140%;
    height: 2.5rem;
    left: -20%;
    top: 0;
    z-index: -1;
    border-radius: 0 0 50% 50%;
    background-image: linear-gradient(239deg, #3A6FF3 0%, #50C7FB 100%);
}
.info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 1.46rem;
    background: $bgColor;
    box-shadow: 0 .08rem .16rem 0 rgba(0,0,0,0.08);
    border-radius: .08rem;
    &__container {
        height: .22rem;
        margin: .16rem .16rem .08rem .16rem;
        &__last {
            margin-bottom: .16rem;
        }
        &__icon {
            font-size: .22rem;
            margin-right: .12rem;
        }
        &__name {
            position: relative;
            bottom: .025rem;
            line-height: .22rem;
            font-size: .14rem;
            color: #262626;
        }
        &__go {
            line-height: .22rem;
            float:right;
            transform: rotateY(180deg);
            color: #C2C4CA;
        }
    }
}
</style>
