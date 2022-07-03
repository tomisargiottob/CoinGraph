<template>
  <div>
    {{wallets && wallets.length}}
  </div>
</template>

<script>

export default {
  setup() {
    
  },
  props:['wallets']
}
</script>