<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class Table extends Vue {
  @Prop() columnlist!: string
}
</script>

<style lang="scss" scoped></style>
