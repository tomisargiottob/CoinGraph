<template>
    <div class="login-form">
        <div id="login-panel">
            <el-image src="./coinGraphMin.png"/>
            <h1 class="call-action">Registrate para poder hacer seguimiento a tu cartera de inversion</h1>
            <el-form
                ref="ruleFormRef"
                label-width="100px"
                :rules="rules"
                :model="registerInfo"
                style="max-width: 460px"
            >
                <el-form-item prop="username" v-if="!secondPage">
                    <el-input required="true" placeholder="Correo electrónico" v-model="registerInfo.username" />
                </el-form-item>
                <el-form-item prop="password" v-if="!secondPage">
                    <el-input required="true" type="password" placeholder="Contraseña" v-model="registerInfo.password" />
                </el-form-item>
                <el-form-item prop="passwordControl" v-if="!secondPage">
                    <el-input required="true" type="password" placeholder="Repite tu contraseña" v-model="registerInfo.passwordControl" />
                </el-form-item>
                <el-form-item prop="firstName" v-if="secondPage">
                    <el-input required="true"  placeholder="Introduzca su nombre" v-model="registerInfo.firstName" />
                </el-form-item>
                <el-form-item prop="secondName"  v-if="secondPage">
                    <el-input required="true" placeholder="Introduzca su apellido" v-model="registerInfo.secondName" />
                </el-form-item>
                <el-form-item prop="birthDate"  v-if="secondPage" class="date-picker">
                  <el-date-picker
                    class="date-picker"
                    v-model="registerInfo.birthDate"
                    type="date"
                    placeholder="Seleccione fecha de nacimiento"
                    size="default"
                  />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-if="secondPage"
                        @click="goBack"                     
                    >
                        Atras
                    </el-button>
                    <el-button type="primary" 
                        @click="submitForm(ruleFormRef)"                     
                    >
                        Registrarme
                    </el-button>
                </el-form-item>
                <hr>	
                <div class="register">
                    <p>¿Ya tienes cuenta?</p>
                    <RouterLink to="/login">Iniciar sesión</RouterLink>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup>
  import { useAuthStore } from "../store/authStore";
  import { validateEmail } from '../utils/utils';
  import { useRouter, RouterLink } from 'vue-router'
  import { ref, reactive } from 'vue'
  import { ElNotification } from 'element-plus'

  const router = useRouter();
  const authStore = useAuthStore();
  const registerInfo = reactive({
    username: '',
    password: '',
    passwordControl: '',
  })
  const ruleFormRef = ref();
  const validatePass= (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Por favor ingrese una contraseña valida'))
    } else if(registerInfo.password !== value) {
      callback(new Error('Las contraseñas no coinciden'))
    }else {
      callback()
    }
  }
  const rules = reactive({
      username: [
        { validator: validateEmail, trigger: 'blur' },
      ],
      password: [
          { required: true, message: 'Please input password', trigger: 'blur' },
          { min: 6, message: 'La contraseña debe tener al menos 6 caracteres', trigger: 'blur' },
      ],
      passwordControl: [{ validator: validatePass, trigger: 'blur' }],
  })

  let secondPage = ref(false)
  const goBack = () => {
    secondPage.value = false;
  }

  const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {	
      if (valid) {
        if (!secondPage.value) {
          secondPage.value= true;
          return;
        }
        try {
          await authStore.registerUser(registerInfo);
          router.push({ name: 'Home' });
        } catch (err) {
          ElNotification({
            title: 'Error',
            message: err.message,
            type: 'error',
          })
        }
      } else {
        console.log('error submit!', fields)
      }
    })
  }

</script>

<style scoped>
  .call-action{
    color: gray;
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 20px
  }
  :deep(.el-image__inner){
      height: 100px;
      margin-bottom: 10px;
  }
  .login-form{
      background-image: url("../assets/login-bg.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      min-height: 90vh;
      width: 100%;
      padding: 100px 40px;
  }

  #login-panel {
      width:20%;
      min-width: 300px;
      max-width: 300px;
      background:white;
      border-radius: 15px;
      padding: 25px;
      min-height: 40vh;
      margin: 0 auto;
      margin-top: 50px;
  }

  .login-form h2{
      font-weight: 700;
      margin-bottom: 40px;
      background-color: none;
  }
  .login-form :is(button, a){
    margin-top: 20px;
  }
  :deep(.el-form-item__content){
    margin-left: 0px !important;
  }
  :deep(.el-input){
    width: 100% !important;
  }
  .el-button{
    width:100%;
  }
  .el-button+.el-button {
    margin-left:0px;
  }
  .el-button:focus{
    border-color: #409eff;
    background-color: #409eff;
  }
  :deep(.el-input__inner){
    font-size: 1rem !important;
  }
  .register{
      display: flex;
      place-content: center;
  }
  hr {
      margin-top:20px;
      margin-bottom:20px;
  }
  a{
      margin-left: 10px;
      margin-block-start: 1em !important;
      margin-block-end: 1em !important;
  }
</style>