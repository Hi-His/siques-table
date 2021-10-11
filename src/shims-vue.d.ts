declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'jquery' {
  declare module 'vue/types/vue' {
    interface Vue {
      $jquery: any
    }
  }
}
