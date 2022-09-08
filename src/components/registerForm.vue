<template>
  <div>
    <h1 class="call-action">{{$t('registerForm.title')}}</h1>
    <el-form
        ref="ruleFormRef"
        label-width="100px"
        :rules="rules"
        :model="registerInfo"
        style="max-width: 460px"
    >
        <el-form-item prop="username" v-if="!secondPage">
            <el-input required="true" :placeholder="$t('loginCommon.email')" v-model="registerInfo.username" />
        </el-form-item>
        <el-form-item prop="password" v-if="!secondPage">
            <el-input required="true" type="password" :placeholder="$t('loginCommon.password')" v-model="registerInfo.password" />
        </el-form-item>
        <el-form-item prop="passwordControl" v-if="!secondPage">
            <el-input required="true" type="password" :placeholder="$t('registerForm.checkPassword')"  v-model="registerInfo.passwordControl" />
        </el-form-item>
        <el-form-item prop="firstName" v-if="secondPage">
            <el-input :placeholder="$t('registerForm.firstName')"  v-model="registerInfo.firstName" />
        </el-form-item>
        <el-form-item prop="surname"  v-if="secondPage">
            <el-input :placeholder="$t('registerForm.surname')" v-model="registerInfo.surname" />
        </el-form-item>
        <el-form-item prop="birthDate"  v-if="secondPage" class="date-picker">
          <el-date-picker
            class="date-picker"
            v-model="registerInfo.birthDate"
            type="date"
            :placeholder="$t('registerForm.birthDate')" 
            size="default"
          />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" v-if="secondPage"
                @click="goBack"                     
            >
                {{$t('commonButtons.goBack')}}
            </el-button>
            <el-button type="primary" 
                @click="submitRegister('ruleFormRef')"                     
            >
                {{$t('registerForm.submitRegister')}}
            </el-button>
        </el-form-item>
        <hr>	
        <div class="register">
            <p>{{$t('registerForm.existentAccount')}}</p>
            <span class="action-text" @click="emit('displayLogin','login')">{{$t('commonButtons.logIn')}}</span>
        </div>
    </el-form>
  </div>
</template>

<script>
  import { useAuthStore } from "../store/authStore";
  import { validateEmail, submitForm } from '../utils/utils';

  export default {
    name: 'registerForm',
    data() {
      return {
        registerInfo: {
          username: '',
          password: '',
          firstName: '',
          surname: '',
          passwordControl:'',
          birthDate:'',
        },
        correctErrors: '',
        ruleFormRef: '',
        rules: {
          username: [
            { validator: validateEmail, trigger: 'blur' },
          ],
          password: [
            { required: true, message: this.$t('registerForm.validate.noPassword'), trigger: 'blur' },
            { min: 8, message: this.$t('registerForm.validate.password'), trigger: 'blur' },
          ],
          passwordControl: [{ validator: this.validatePassword, trigger: 'blur' }],
        },
        secondPage: false,
      }
    },
    methods: {
      validatePassword(rule, value, callback) {
        if (value === '') {
          callback(new Error(this.$t('registerForm.validate.noControlPassword')))
        } else if(this.registerInfo.password !== value) {
          callback(new Error(this.$t('registerForm.validate.controlPassword')))
        }else {
          callback()
        }
      },
      validateBirthDate(rule, value, callback) {
        const age = new Date(value).getFullYear() - new Date().getFullYear()
        if (value === '') {
          callback(new Error(this.$t('registerForm.validate.validBirthDate')))
        } else if(100 > age  > 12 ) {
          callback(new Error(this.$t('registerForm.validate.minimunAge')))
        }else {
          callback()
        }
      },
      goBack() {
        this.secondPage = false;
        delete this.rules['birthDate']
      },
      async submitRegister(form) {
        const formToSend = this.$refs[form];
        try {
          if (this.secondPage) {
            this.rules['birthDate'] = [{ validator: this.validateBirthDate, trigger: 'blur'}]
          }
          await formToSend.validate();
        } catch {
          return;
        }
        if (!this.secondPage) {
          this.secondPage= true;
          return;
        }
        await submitForm(formToSend, async () => {
          const authStore = useAuthStore();
          delete this.registerInfo.passwordControl
          await authStore.registerUser(this.registerInfo);
          this.$emit('goHome');
        })
      }
    },
  }


</script>

<style scoped>
  .call-action{
    color: gray;
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 20px
  }
  :deep(.el-input){
    width: 100% !important;
  }
  .el-button+.el-button {
    margin-left:0px;
  }
  .el-button:focus{
    border-color: #409eff;
    background-color: #409eff;
  }
</style>