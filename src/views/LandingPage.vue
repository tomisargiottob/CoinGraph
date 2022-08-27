<template>
  <div class="body">
    <el-row>
      <el-col class="main">
        <el-row justify="center">
          <el-col :xs="22" :sm="22" :md="18" :lg="16" :xl="14">
            <h1 class="primary-title">
              Controlá el rendimiento de tus carteras crypto
            </h1>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :xs="20" :sm="20" :md="12" :lg="10" :xl="8">
            <p class="secondary-title">
              Monitorizá tus inversiones en crypto desde un mismo lugar. Consulta el historico de rendimientos y composicion de tu cartera en cada momento. 
            </p>
          </el-col>
          <el-col :span="18">
            <el-button type="primary" class="call-action" @click="redirectTo('Register')">
              Crear cuenta
            </el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row justify="center" v-if="innerWidth > 999">
      <el-col class="image-section" :span="14">
        <div class="image-container">
          <el-image src="./dashboard.JPG">
            <template #placeholder>
              <div class="image-slot">Loading<span class="dot">...</span></div>
            </template>
          </el-image>
        </div>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col class="app-benefits" :span="22">
        <el-row justify="center" class="benefit-columns">
          <el-col class="benefit-column" :xs="22" :sm="22" :md="8" :lg="8" :xl="8">
            <el-icon class="benefit-icon"><Refresh /></el-icon>
            <h2>
              Actualización diaria del valor global de tus inversiones. 
            </h2> 
            <p>
              Puedes agregar todas las cuentas de Exchange que quieras controlar de tu cartera de inversión y también de forma manual aquellas cryptomonedas que se encuentren en otras billeteras no trackeables.
            </p>
          </el-col>
          <el-col class="benefit-column" :xs="22" :sm="22" :md="8" :lg="8" :xl="8">
            <el-icon class="benefit-icon"><Money /></el-icon>
             <h2>
              Analiza las rentabilidades de tus cryptomonedas. 
            </h2> 
            <p>
              Controla desde un mismo punto todas tus inversiones para que puedas medir donde se encuentran tus jugadas ganadoras y donde debes cortar las perdidas.
            </p>
          </el-col>
          <el-col class="benefit-column"  :xs="22" :sm="22" :md="8" :lg="8" :xl="8">
            <el-icon class="benefit-icon"><DataLine /></el-icon>
             <h2>
              Navega las graficas y viajá por el historico de registros.
            </h2> 
            <p>
              Revisá el historico de inversiones de forma grafica en un mismo lugar y ahorrate el tiempo de revisar cada una de tus cuentas.
            </p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="app-features" :span="22">
        <el-row class="">
          <el-col :span="12">

          </el-col>
          <el-col :span="12">

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">

          </el-col>
          <el-col :span="12">

          </el-col>
        </el-row>

      </el-col>
    </el-row>
    <el-row justify="center" class="action-steps">
      <el-col class="image-section" :span="14">
        <el-row>
          <span class="dot-line" v-if="innerWidth > 992"></span>
          <el-col class="action-column" :xs="22" :sm="22" :md="8" :lg="8" :xl="8">
            <el-row>
              <el-col>
                <div class="icon-container">
                  <el-icon class="action-icon" ><Avatar /></el-icon>
                </div>
              </el-col>
              <el-col>
                <div class="action-text">
                  <span class="progress-number">01</span>
                  <p> Creá tu cuenta </p>
                </div>
              </el-col>
            </el-row> 
          </el-col>
          <el-col class="action-column" :xs="22" :sm="22" :md="8" :lg="8" :xl="8">
            <el-row>
              <el-col>
                <div class="icon-container">
                  <el-icon class="action-icon"><Tools /></el-icon>
                </div>
              </el-col>
              <el-col>
                <div class="action-text">
                  <span class="progress-number">02</span>
                  <p> Conectá la billetera de tus exchanges </p>
                </div>
              </el-col>
            </el-row> 
          </el-col>
          <el-col class="action-column" :xs="22" :sm="22" :md="8" :lg="8" :xl="8">
            <el-row>
              <el-col>
                <div class="icon-container">
                  <el-icon class="action-icon"><TrendCharts /></el-icon> 
                </div>
              </el-col>
              <el-col>
                <div class="action-text">
                  <span class="progress-number">03</span>
                  <p> Analizá el resultado de tus inversiones </p>
                </div>
              </el-col>
            </el-row>     
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
	import { router } from '../router/router'

  export default {
    name: "landingPage",
    data() {
      return {
        innerWidth: 1000,
      }
    },
    mounted() {
      window.addEventListener('resize', () => {
        this.innerWidth = window.innerWidth
      })
    },
    methods: {
      redirectTo(page) {
        router.push({ name: page });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/variables.scss';
  .body{
    padding: 0px 20px;
    line-height: 32.4px;
    .el-row{
      width:100%;
    }
    .main{
      .primary-title{
        line-height: 60.4px;
        font-size: 3.5rem;
        font-weight: 550;
      }
      .secondary-title{
        line-height: 32.4px;
        font-size: 1.3rem;
        margin-top: 0px;
        color: $grayText;
      }
      button{
        width: 150px;
        margin-bottom: 60px;
        font-weight: 500;
        font-size: 1rem;
      }
    }
    .image-section {
      margin-bottom: 40px;
      .image-container{
        padding: 20px;
        background:$graphElements;
        border-radius: 20px;
        box-shadow: $graphShadow 5px 5px 15px;
      }
      .dot {
        animation: dot 2s infinite steps(3, start);
        overflow: hidden;
      }
    }
    .app-benefits{
      margin-bottom:60px;
      .benefit-columns{
        width:100%;
        .benefit-column{
          padding: 20px;
          p{
            font-size: 18px;
          }
        }
      }
      .benefit-icon{
        color: $buttonColor;
        font-size: 5rem;
      }
    }
    .action-steps{
      .dot-line{
        margin-top: 45px;
        position: absolute;
        width: 36vw;
        left: calc(-18vw + 50%);
        border: none;
        border-top: dotted 7px;
      }
      .icon-container{
        background-color: white;
        width: 6rem;
        height: 100%;
        border-radius: 50px;
        margin: 0 auto;
        .action-icon{
          padding-top: 7px;
          font-size: 5rem;
          color: $buttonColor;
        }
      }
      .action-text {
        position: relative;
        margin-top: 50px;
        font-weight: 600;
        color: gray;
        margin-bottom: 50px;
        .progress-number {
          color: $buttonColor;

          font-size: 100px;
          font-weight: 700;
          position: absolute;
          top: 0px;
          left: 0;
          right: 0;
          text-align: center;
          opacity: 0.15;            
        }
      }
    }
  }

</style>