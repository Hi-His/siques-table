<template>
  <div>
    <!-- <button @click="generate" type="text">点击生成</button> -->
    <div v-html="showModel"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
@Component({})
export default class Model extends Vue {
  @Prop() content!: Array<Array<string>>

  @Prop()
  index: any

  private showModel = ''

  @Watch('content')
  generate(newval: any, oldval: any) {
    this.showModel = ''
    this.content.forEach((e: Array<string>, index: number) => {
      if (index != 0) {
        this.showModel +=
          '<pre >' +
          `<span class='annotation'>@ApiProperty</span>(value = <span class='green'>"` +
          `</span><span class='green'>${
            e[this.index.findIndex((v: string) => v === '0')] || ''
          }"` +
          `</span><span class='orange'>,</span>example = "<span class='green'>${
            e[this.index.findIndex((v: string) => v === '2')] || ''
          }"</span>` +
          `<span class='orange'>${
            e[3] || false ? ",</span>required = <span class='orange'>true" : ''
          }</span>)<br>` +
          `${
            e[3] || false
              ? `<span class='annotation'>@NotNull</span>(message = <span class='green>'</span><span  class='green' >"不能为空"</span><span class='green'></span>)<br>`
              : ''
          }` +
          `<span class='orange'>private </span>String <span class='purple'>${this.toHump(
            e[this.index.findIndex((v: string) => v === '1')] || ''
          )}</span><span class='orange'>;<br>` +
          "</span><span class='orange'><br></span>"
      }
    })
  }

  toHump(name: string) {
    name = name.replaceAll(' ', '_')
    return name.replace(/_(\w)/g, function (all, letter) {
      return letter.toUpperCase()
    })
  }
}
</script>

<style>
pre {
  background-color: #2b2b2b;
  color: #a9b7c6;
  font-family: 'Source Code Pro', monospace;
  font-size: 12pt;
}
.purple {
  color: #9876aa;
}
.orange {
  color: #cc7832;
}
.green {
  color: #6a8759;
}
.blank {
}
.annotation {
  color: #bbb529;
}
</style>
