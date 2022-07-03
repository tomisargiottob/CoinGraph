<template>
  <div>
    {{currentWallet && currentWallet.wallet && currentWallet.wallet.value}}
  </div>
</template>

<script>

export default {
  setup() {
    
  },
  props:['currentWallet']
}
</script>