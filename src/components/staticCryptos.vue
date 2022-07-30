<template>
  <div>
   <el-row>
      <el-col :span="4" :offset="18" @click="addStaticCrypto">
        <el-button type="primary">
          Agregar crypto
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="staticCryptos" style="width: 100%">
          <el-table-column fixed prop="crypto" label="Crypto" width="150" />
          <el-table-column prop="amount" label="Cantidad" width="120" />
          <el-table-column prop="status" label="Estado" width="120" />
          <el-table-column fixed="right" label="Operations" width="120">
            <template #default>
              <el-button link type="primary" size="small" @click="editStaticCrypto"
                >Editar</el-button
              >
              <el-button link type="primary" size="small">Eliminar</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>  
  </div>
</template>

<script>
export default {
  name: 'staticCrypto',
  props: ['staticCryptos'],
  methods: {
    editStaticCrypto(crypto) {
      console.log(crypto)
    },
    addStaticCrypto() {
      console.log('agregar')
    }
  },
}
</script>

<style lang="scss" scoped>

</style>