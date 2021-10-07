<template>
  <div class="container">
    <div style="width: 50vw">
      <!-- <div ref="table" @paste.prevent="pasting" contenteditable="true"></div> -->

      <Table>
        <CellHori :content="element" v-for="(element, i) in list" :key="i">
          <Cell
            @update="(newval) => update(newval, i, j)"
            v-for="(el, j) in element"
            :key="j"
            :content="el"
            :type="typeof el === 'boolean' ? 'checkBox' : ''"
            :i="i"
            :j="j"
            @deleteCell="deleteCell"
            @cellPaste="(text) => cellPaste(text, i, j)"
          >
          </Cell>
        </CellHori>
      </Table>
    </div>
    <div>
      <Model :content="list"></Model>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CellHori from './components/CellHori.vue'
import Cell from './components/Cell.vue'
import Table from './components/Table.vue'
import Model from './components/Model.vue'
@Component({
  components: {
    Cell,
    CellHori,
    Table,
    Model,
  },
})
export default class App extends Vue {
  list: Array<Array<any>> = [
    ['详细说明', '字段', '示例值', '是否必须'],
    ['', '', '', 'false'],
  ]
  columnlist: Array<Array<string>> = []

  pasting(e: any) {
    // 两次循环
    var split = e.clipboardData.getData('text').split('\r\n')

    var maxWidth = 0

    split.forEach((e: any) => {
      var array = e.split('\t')
      maxWidth = Math.max(array.length, maxWidth)
      if (array.length < maxWidth) {
        for (let index = 0; index < maxWidth - array.length; index++) {
          array.push('')
        }
      }

      this.list.push(array)
    })
    this.refresh()
  }

  refresh() {
    var maxLen = 0
    this.list.forEach((e: any) => {
      maxLen = Math.max(e.length, maxLen)
      if (this.columnlist.length < maxLen) {
        var len = maxLen - this.columnlist.length
        for (let index = 0; index < len; index++) {
          this.columnlist.push(new Array(0))
        }
      }

      e.forEach((e: string, index: number) => {
        this.columnlist[index].push(e)
      })
    })
  }

  update(newval: any, i: number, j: number) {
    this.list[i][j] = newval
    this.$set(this.list, i, this.list[i])
  }

  deleteCell(i: number, j: number) {
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
    if (i != 0) {
      var split = text.split('\r\n')
      var originHeight = this.list.length
      var end = split.length - 1
      if (i + split.length >= originHeight) {
        end = split.length
      }

      for (let index = i, index1 = 0; index1 < end + 1; index++, index1++) {
        this.list[index] == null ? this.list.push(new Array(0)) : ''

        this.list[index][j] = split[index1]

        if (j == 0 && this.list[index][j + 3] === undefined) {
          this.list[index].push('')
          this.list[index].push('')
          this.list[index].push(false)
        }
        if (j == 1 && this.list[index][j + 2] === undefined) {
          this.list[index].push('')
          this.list[index].push(false)
        }
        if (j == 2 && this.list[index][j + 1] === undefined) {
          this.list[index].push(false)
        }
        this.$set(this.list, index, this.list[index])
      }
    }
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
