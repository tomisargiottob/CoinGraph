<template>
  <el-row>
    <el-col :offset="1" :span="22">
      <el-descriptions
      direction="vertical"
      :column="4"
      size="large"
      border
    >
      <el-descriptions-item label="Email">{{user.username}}</el-descriptions-item>
      <el-descriptions-item label="Nombre">{{user.firstName}}</el-descriptions-item>
      <el-descriptions-item label="Apellido">{{user.surname}}</el-descriptions-item>
      <el-descriptions-item label="Fecha de nacimiento" :span="2">{{new Date(user.birthDate).toLocaleDateString("es-ES")}}</el-descriptions-item>
      <el-descriptions-item label="Cuentas activas">
        <el-tag v-for="apiKey in apiKeys" :key="apiKey.id" size="small">{{apiKey.account}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Seguimiento activado"
        >{{user.active ? 'Si': 'No'}}
      </el-descriptions-item>
    </el-descriptions>
    </el-col>

  </el-row>
</template>

<script>
export default {
  name:'userData',
  props: ['user', 'apiKeys']
}
</script>

<style lang="scss" scoped>
  .el-tag{
    margin-left: 10px !important;
  }
</style>