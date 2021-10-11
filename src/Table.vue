<template>
  <div class="container">
    <div style="width: 50vw">
      <!-- <div ref="table" @paste.prevent="pasting" contenteditable="true"></div> -->

      <CellHori :content="element" v-for="(element, i) in list" :key="i">
        <Cell
          @update="(newval) => update(newval, i, j)"
          v-for="(el, j) in element"
          :key="j"
          :content="el"
          :type="typeof el === 'boolean' ? 'checkBox' : ''"
          :i="i"
          :j="j"
          :index="index"
          @cellDelete="cellDelete"
          @cellPaste="(text) => cellPaste(text, i, j)"
          @cellTranslate="cellTranslate"
        >
        </Cell>
      </CellHori>
    </div>
    <div>
      <Model :content="list" :index="index"></Model>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CellHori from './components/CellHori.vue'
import Cell from './components/Cell.vue'
/* eslint-disable */
import Model from './components/Model.vue'
@Component({
  components: {
    Cell,
    CellHori,
    Table,
    Model,
  },
})
export default class Table extends Vue {
  list: Array<Array<any>> = [
    ['字段名称', '字段', '详细说明', '是否必须'],
    ['', '', '', 'false'],
  ]

  index = ['0', '1', '2']

  update(newval: any, i: number, j: number) {
    this.list[i][j] = newval
    this.$set(this.list, i, this.list[i])
  }

  cellDelete(i: number, j: number) {
    // 下方上移
    var height = this.list.length
    if (i == height - 1) {
      this.list[i][j] = ''
      this.$set(this.list, i, this.list[i])
    }
    for (let index = i; index < height - 1; index++) {
      this.list[index][j] = this.list[index + 1][j]

      this.$set(this.list, index, this.list[index])
    }
  }

  cellPaste(text: any, i: number, j: number) {
    // 第一行不处理复制
    if (i != 0) {
      var originHeight = this.list.length - 1

      var split = text.split('\r\n')

      if (i == originHeight) {
        split.push(' ')
      }

      split.forEach((e: any, index: number) => {
        // 当前行的数组
        var curr = this.list[index + i] || ['', '', '', 'false']

        // 要复制的数组
        var array = e.split('\t')

        for (let ind = j, index1 = 0; ind < 3; ind++, index1++) {
          if (array[index1] != undefined) {
            curr[ind] = array[index1]
          }
        }

        this.$set(this.list, index + i, curr)
      })
    }
  }

  cellTranslate(i: number, j: number) {
    var zhcn = ''

    for (let i = 1; i < this.list.length; i++) {
      zhcn += this.list[i][this.index.findIndex((v: string) => v === '0')] + ','
    }
    this.doTranslate(zhcn)
  }

  doTranslate(zhcn: string) {
    var api = 'http://fanyi-api.baidu.com/api/trans/vip/translate?'
    var sign = '20211011000969958' + zhcn + '21089' + 'qZcXd83zBFIkSTbhi4DK'
    var win: any = window
    sign = win.MD5(sign)

    api =
      api +
      'q=' +
      zhcn +
      '&from=zh&to=en&appid=20211011000969958&salt=21089&sign=' +
      sign +
      '&callback=callbackName'

    this.$jquery.ajax({
      url: 'http://fanyi-api.baidu.com/api/trans/vip/translate',
      type: 'get',
      dataType: 'jsonp',
      data: {
        q: zhcn,
        appid: '20211011000969958',
        salt: '21089',
        from: 'zh',
        to: 'en',
        sign: sign,
      },
      success: (data: any) => {
        const { trans_result } = data
        var res = trans_result[0].dst
        res = res.replaceAll(' ', '_')
        res = res.replaceAll(',_', '\r\n')
        res = res.replaceAll(',', '\r\n')

        this.cellPaste(
          res,
          1,
          this.index.findIndex((v: string) => v === '1')
        )
      },
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  display: flex;
}
</style>
