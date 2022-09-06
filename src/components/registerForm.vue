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
            <el-input required="true"  :placeholder="$t('registerForm.firstName')"  v-model="registerInfo.firstName" />
        </el-form-item>
        <el-form-item prop="surname"  v-if="secondPage">
            <el-input required="true" :placeholder="$t('registerForm.surname')" v-model="registerInfo.surname" />
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
                @click="submitRegister(ruleFormRef)"                     
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

<script setup>
  import { useAuthStore } from "../store/authStore";
  import { validateEmail, submitForm } from '../utils/utils';
  import { ref, reactive } from 'vue'

  const emit = defineEmits(['goHome, displayLogin'])

  const authStore = useAuthStore();
  const registerInfo = reactive({
    username: '',
    password: '',
    firstName: '',
    surname: '',
    passwordControl:'',
    birthDate:'',
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
  const validateBirthDate = (rule, value, callback) => {
    const age = new Date(value).getFullYear() - new Date().getFullYear()
    if (value === '') {
      callback(new Error('Por favor ingrese una fecha de nacimiento valida'))
    } else if(100 > age  > 17 ) {
      callback(new Error('La edad indicada es menor a 18 años'))
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
          { min: 8, message: 'La contraseña debe tener al menos 8 caracteres', trigger: 'blur' },
      ],
      passwordControl: [{ validator: validatePass, trigger: 'blur' }],
      birthDate: [{ validator: validateBirthDate, trigger: 'blur' }],
  })

  let secondPage = ref(false)
  const goBack = () => {
    secondPage.value = false;
  }

  const submitRegister = async (form) => {
    if (!secondPage.value) {
      secondPage.value= true;
      return;
    }
    await submitForm(form, async () => {
      delete registerInfo.passwordControl
      await authStore.registerUser(registerInfo);
      emit('goHome');
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