<template>
  <div>
    <button
      @click="deleteCell"
      v-if="type !== 'checkBox' && i != 0"
      class="off"
    >
      x
    </button>
    <input
      v-if="type === 'checkBox'"
      type="checkBox"
      :value="contentCopy"
      @click="change"
    />
    <input
      v-else
      @paste.prevent="cellPaste"
      class="cell_hori"
      type="text"
      v-model="contentCopy"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Cell extends Vue {
  @Prop()
  content!: string

  @Prop()
  i: any

  @Prop()
  j: any

  @Prop()
  type: any

  contentCopy = {}

  change() {
    this.contentCopy = !this.contentCopy
  }
  mounted() {
    this.contentCopy = this.content
  }

  @Watch('content')
  onContentChanged(newval: any, oldval: any) {
    this.contentCopy = newval
  }

  @Watch('contentCopy')
  onValueChanged(newval: any, oldval: any) {
    if (newval === 'true') {
      newval = true
    }

    if (newval === 'false') {
      newval = false
    }

    this.$emit('update', newval)
  }

  cellPaste(e: ClipboardEvent) {
    if (this.type !== 'checkBox') {
      var text = e.clipboardData!.getData('text')

      this.$emit('cellPaste', text)
    }
  }
  deleteCell() {
    this.$emit('deleteCell', this.i, this.j)
  }

  cancle(e: any) {
    console.log(e)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.off {
  position: absolute;
  left: inherit;
  font-size: 12px;
  margin-left: 184px;
}
.cell_hori {
  width: 200px;
  height: 50px;
  border: 1px solid black;
}
</style>
