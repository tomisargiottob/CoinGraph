<template >
  <div>
    <el-form
        ref="loginFormRef"
        label-width="100px"
        :rules="rules"
        :model="formData"
        style="max-width: 460px"
        @keyup.enter="submitAction('loginFormRef')"
    >
        <el-form-item prop="username" >
            <el-input required="true" :placeholder="$t('loginCommon.email')" v-model="formData.username" />
        </el-form-item>
        <el-form-item prop="password">
            <el-input required="true" type="password" :placeholder="$t('loginCommon.password')" v-model="formData.password" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" 
                @click="submitAction('loginFormRef')"                     
            >
              {{$t('loginForm.button')}}
            </el-button>
        </el-form-item>
    </el-form>
    <div>
        <span class="action-text" @click="$emit('displayRecoverForm')">{{$t('loginForm.forgotPassword')}}</span>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../store/authStore';
import { validateEmail, submitForm } from '../utils/utils';

export default {
  name: 'loginForm',
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, validator: validateEmail, trigger: 'blur' },
        ],
        password: [
          { required: true, message: this.$t('loginView.validation.password'), trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    submitAction(form) {
      const formElement = this.$refs[form]
      const callback = async () => {
        const authStore = useAuthStore();
        await authStore.loginUser(this.formData);
        this.$emit('goHome');
      }
      submitForm(formElement, callback)
    }
  },
}


</script>