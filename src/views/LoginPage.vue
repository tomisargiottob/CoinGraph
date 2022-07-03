<template>
    <div class="login-form">
        <div id="login-panel">
            <el-image src="./coinGraphMin.png"/>
            <login-form v-if="login" @goHome="redirectHome" @displayRecoverForm="displayForm('forgotPassword')"></login-form>
            <recover-account v-if="forgotPassword" @goBack="displayForm('login')"></recover-account>
            <register-form v-if="register" @displayLogin="displayForm('login')"></register-form>
            <hr v-if="!register">	
            <div class="register" v-if="!register">
                <p>¿No tienes cuenta?</p>
                <span class="action-text" @click="displayForm('register')">Regístrate</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router'
import { ref } from 'vue';
import recoverAccount from '../components/recoverAccount.vue';
import loginForm from '../components/loginForm.vue';
import registerForm from '../components/registerForm.vue';


const router = useRouter();
const authStore = useAuthStore();

const redirectHome = () => {
  router.push({ name: 'Home' });
}
if (router.meta && router.meta.show) {
  displayForm('register');
}
const token = localStorage.getItem('x-access-token');
if (token) {
  authStore.setAuthenticated();
  redirectHome();
}

const login = ref(true);
const forgotPassword = ref(false);
const register = ref(false);

const displayForm = (form) => {
  forgotPassword.value = 'forgotPassword' === form ? true : false
  login.value = 'login' === form ? true : false
  register.value = 'register' === form ? true : false
}

</script>
<style>
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
    
    .el-button{
        width:100%;
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
    .action-text{
      cursor:pointer;
      margin-left: 10px;
      margin-top:1rem;
      color: rgba(0,149,246,1);

    }
</style>
<style scoped>
  :deep(.el-image__inner){
    height: 100px;
    margin-bottom: 30px;
  }
  :deep(.el-form-item__content){
    margin-left: 0px !important;
  }
 :deep(.el-input__inner){
    font-size: 1rem !important;
  }
</style>