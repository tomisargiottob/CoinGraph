<template>
  <footer class="footer-section">
    <el-row justify="center">
      <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3">
        <el-row justify="center">
          <el-col :xs="12" :sm="9" :md="24" :lg="24" :xl="24">
            <el-image src="./coinGraphInverted.png"/>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="20" :sm="10" :md="5" :lg="4" :xl="4" class="footer-column">  
        <h3>
          Productos
        </h3>
        <ul class="footer-links">
          <li><RouterLink to="/" class="footer-link">Seguimiento</RouterLink></li>
          <li><RouterLink to="/" class="footer-link">Transacciones</RouterLink></li>
          <li><RouterLink to="/" class="footer-link">Precios</RouterLink></li>
        </ul>
      </el-col>
      <el-col :xs="20" :sm="10" :md="5" :lg="4" :xl="4" class="footer-column">
        <h3>
          Empresa
        </h3>
        <ul class="footer-links">
          <li><RouterLink to="/" class="footer-link">Sobre Nosotros</RouterLink></li>
          <li><RouterLink to="/" class="footer-link">Política de Privacidad</RouterLink></li>
          <li><RouterLink to="/" class="footer-link">Descargo de responsabilidad</RouterLink></li>
        </ul>
      </el-col>
      <el-col :xs="20" :sm="10" :md="5" :lg="4" :xl="4" class="footer-column">
        <h3>
          Soporte
        </h3>
        <ul class="footer-links">
          <li><RouterLink to="/" class="footer-link">Formulario de ayuda</RouterLink></li>
          <li><RouterLink to="/" class="footer-link">Contacto</RouterLink></li>
          <li><RouterLink to="/" class="footer-link">FAQ</RouterLink></li>
        </ul>
      </el-col>
      <el-col :xs="20" :sm="10" :md="5" :lg="4" :xl="4" class="footer-column">  
        <h3>
          Redes sociales
        </h3>
        <ul class="footer-links">
          <li><a href="https://instagram.com" target="_blank" class="footer-link">Instagram</a></li>
          <li><a href="https://Twitter.com" target="_blank" class="footer-link">Twitter</a></li>
          <li><a href="https://facebook.com"  target="_blank" class="footer-link">Facebook</a></li>
        </ul>
      </el-col>
    </el-row>
  </footer>
</template>

<script>
export default {
  name: 'footerComponent',
}
</script>

<style lang="scss">
.footer-section{
  width: 100%;
  background-color:#020f28;
  padding-top: 30px;
  padding-bottom:30px;
  .footer-column {
    text-align: left;
    padding-inline-start: 40px;
    color: white;
    .footer-links{
      padding-inline-start: 0px;
      li{
        .footer-link{
          color: white;
          margin-left: 0px;
          text-decoration: none;
          &:hover{
            cursor: pointer;
            color:$buttonColor;
          }
        }
        line-height: 25px;
        list-style-type: none;  
      }
    }
  }
}
</style>