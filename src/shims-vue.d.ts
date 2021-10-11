declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'js-md5' {
  declare module 'vue/types/vue' {
    interface Vue {
      $md5: any
    }
  }
}
