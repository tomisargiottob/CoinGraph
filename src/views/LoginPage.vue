<template>
    <div class="login-form">
        <div id="login-panel">
          <h1>{{ formTitle }}</h1>
            <login-form v-if="form === 'login'" @goHome="redirectHome" @displayRecoverForm="displayForm('forgotPassword')"></login-form>
            <recover-account v-if="form === 'forgotPassword'" @goBack="displayForm('login')"></recover-account>
            <register-form v-if="form === 'register'" @displayLogin="displayForm('login')" @goHome="redirectHome"></register-form>
            <hr v-if="form !== 'register'">	
            <div class="register" v-if="form !== 'register'">
                <p>{{$t('loginView.registerSugestion')}}</p>
                <span class="action-text" @click="displayForm('register')">{{$t('loginView.signUp')}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router'
import recoverAccount from '../components/recoverAccount.vue';
import loginForm from '../components/loginForm.vue';
import registerForm from '../components/registerForm.vue';

export default {
  name: 'loginPage',
  components: { recoverAccount, loginForm, registerForm },
  mounted() {
    const authStore = useAuthStore();
    const router = useRouter();
    const token = sessionStorage.getItem('x-access-token');
    if (token) {
      authStore.setAuthenticated();
      this.redirectHome();
    }
    if (router.currentRoute.value?.meta?.show === 'register') {
      this.displayForm('register');
    }
  },
  data() {
    return {
      formTitle: this.$t('loginView.loginFormTitle'),
      form: 'login'
    }
  },
  methods: {
    redirectHome() {
      this.$router.push({ name: 'Home' });
    },
    displayForm(selectedForm) {
      this.form = selectedForm;
      if (selectedForm === 'login') {
        this.formTitle = this.$t('loginView.loginFormTitle');
      } else if (selectedForm === 'forgotPassword') {
        this.formTitle = this.$t('loginView.recoverFormTitle');
      } else {
        this.formTitle = this.$t('loginView.registerFormTitle')
      }
    }
  },
}


</script>
<style>
  .login-form{
      min-height: 80vh;
      width: 100%;
      padding: 70px 0%;
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
      box-shadow: 5px 5px 10px 10px gray;
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