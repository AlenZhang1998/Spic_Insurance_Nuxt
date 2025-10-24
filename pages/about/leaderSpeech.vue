<template>
  <DynamicPage v-bind="layout">
    <div class="about-us">
      <strong class="title">
        <span>领导寄语</span>
      </strong>

      <div class="rich-text">
        <img :src="leader1" alt="" class="leader1" />
        <p>
          <span>
            2020年，保险经纪面对“一流保险经纪公司”建设目标，在探寻、在突破、在创新，时刻保持危机感，自我革新，主动走出舒适区，响亮地提出了“442”三步走的转型发展方略，对标先进、奋勇拼搏，成果初见雏形。
          </span>
        </p>
        <p>
          <span>
            这一年，保险经纪聚焦转型发展，走出了一条全面推进深化改革之路。按照转型发展“开启年”确定的目标任务，化压力为动力，完成市场化业务部门试点改革，实现了部门架构调整、岗位人员优化、业务模式创新、配套机制建立，为公司深化改革积累了宝贵经验，汇聚了不竭动力。
          </span>
        </p>
        <p>
          <span>
            这一年，保险经纪聚焦党的建设，实现了企业融合发展。始终坚持党的领导，强化党建主体责任落实，体现了党建工作把方向、管大局、保落实的领导作用。充分发挥党支部战斗堡垒作用和党员先锋模范作用，以幵展党员先锋岗、突击队、责任区主题实践活动，促进党建与业务工作深度融合。
          </span>
        </p>
        <p>
          <span>
            这一年，保险经纪聚焦产融结合，实现了服务集团再升级。做优做精保险经纪业务，首年即完成集团雇责险、安责险80%的投保人数；为集团成员单位年节约保险成本约3000万元；为山东核电、乌兰察布600万风场，以及广东、江苏、山东海上风电开展统保服务；胡布火电、几内亚港口、哈萨克斯坦风电、越南永好光伏等集团境外项目首次纳入统一保险管理。配合集团公司顺利组建清洁能源产业基金，产权经纪服务助力北京公司募集43.5亿元外部权益资金。
          </span>
        </p>
        <p>
          <span>
            变则通，通则远。不平凡的2020年，保险经纪主动创新求变夯实了事业发展的基石，朝气蓬勃、争创一流的保险经纪公司正在奔跑前行。
          </span>
        </p>
        <p>
          <span>
            创新追逐新梦想，催马扬鞭奔新程。当前，保险经纪正处在市场化改革转型与“十四五”幵 局的历史交汇点。2021年，保险经纪将提振信心、锐意进取，不负集团公司和资本控股的信任与重托，坚持改革创新，坚持务实求变，坚持稳健经营，努力打造一流保险经纪公司，为集团公司实现“2035” 一流战略、资本控股构建“一流产业金融”作出新的更大贡献！
          </span>
        </p>
        <div>
          <span>
            ____________________________________________________________________________________________________
          </span>
        </div>
        <p>
          <img :src="leader2" alt="" class="leader2" />
        </p>
        <p>
          <span>
            2020年，保险经纪持续聚焦保险保障职能的落实，秉承服务集团公司宗旨，在集团公司、成员单位的大力支持下，不断巩固和发展自身的核心优势，以服务创造价值，特别是在海上风电和核电等清洁能源领域保险方面拥有丰富的经验和独特的专业优势，为集团公司电力、煤矿、铝业等业务板块提供专业的保险经纪服务，用优质服务赢得信任，用专业实力发挥价值。
          </span>
        </p>
        <p>
          <span>
            保险经纪坚持服务集团和幵拓市场并重，围绕需求热点，提升服务效率、挖掘新的业务增长极，加快完善和拓展新的产品链条，有效满足客户需求，受到了客户的广泛认可，圆满完成2020年制定的目标任务，经营指标再创历史最好水平。
          </span>
        </p>
        <p>
          <span>
            永葆初心，農续奋进。2021年是我国“十四五”规划幵局年，是全面建设社会主义现代化国家新征程幵启年，也是保险经纪转型发展关键年。保险经纪将认真贯彻落实集团公司“构筑新跑道、提升新价值、激发新活力、 培育新动能、发挥新优势”的五新要求，以资本控股党委“建设一流产业金融优秀企业”为 目标，坚持战略定力，按照公司市场化改革既定的战略目标和重点任务，构建新的发展格局，以坚如磐石的信心、只争朝夕的劲头、坚 韧不拔的毅力，以“服务集团”与“数字化” 为导向，在确保主业业务稳健增长的基础上，推进产品服务持续优化，业务内涵进一步提升，实现高质量发展的新的突破！
          </span>
        </p>
      </div>
    </div>
  </DynamicPage>
</template>

<script setup>
import DynamicPage from '~/components/common/DynamicPage.vue'
import { contentPageLayouts } from '~/configs/contentPages'
// import { resolveAssetPath } from '~/utils/assets'

const layout = contentPageLayouts.about
const leader1 = resolveAssetPath('images/about/leader1.jpg')
const leader2 = resolveAssetPath('images/about/leader2.jpg')

useHead({
  title: '企业概况_国家电投集团保险经纪有限公司',
})
</script>

<style scoped lang="scss">
.about-us{
  width: 100%;
  // background-color: pink;
  .title{
    // margin-left: 16px;
    padding: 15px 0 14px 0;
    font-size: 24px;
    color: #000000;
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .rich-text{
    margin-top: -.6em;
    .leader1{
      float: right;
      width: 440px;
      margin-top: 10px;
      margin-left: 20px;
    }
    p {
      text-align: justify;
      // text-indent: 2em;
      // line-height: 32px;
      color: #2F2F2F;
      font-size: 16px;
      margin-top: 2em;
      span{
        font-size: 16px;
        line-height: 2;
      }
    }
    .leader2{
      float: left;
      width: 440px;
      margin-top: 10px;
      margin-right: 20px;
    }
  }
}
</style>
