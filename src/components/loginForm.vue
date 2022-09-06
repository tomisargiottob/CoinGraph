<template >
  <div>
    <el-form
        ref="ruleFormRef"
        label-width="100px"
        :rules="rules"
        :model="formLabelAlign"
        style="max-width: 460px"
        @keyup.enter="submitAction(ruleFormRef)"
    >
        <el-form-item prop="username" >
            <el-input required="true" :placeholder="$t('loginCommon.email')" v-model="formLabelAlign.username" />
        </el-form-item>
        <el-form-item prop="password">
            <el-input required="true" type="password" :placeholder="$t('loginCommon.password')" v-model="formLabelAlign.password" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" 
                @click="submitAction(ruleFormRef)"                     
            >
              {{$t('loginForm.button')}}
            </el-button>
        </el-form-item>
    </el-form>
    <div>
        <span class="action-text" @click="onDisplayRecoverForm">{{$t('loginForm.forgotPassword')}}</span>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../store/authStore';
import { ref, reactive } from 'vue';
import { validateEmail, submitForm } from '../utils/utils';

const emit = defineEmits(['goHome', 'displayRecoverForm'])

const formLabelAlign = reactive({
  username: '',
  password: '',
})

const authStore = useAuthStore();
const onDisplayRecoverForm = () => {
  emit('displayRecoverForm')
}

const ruleFormRef = ref();

const rules = reactive({
  username: [
    { required: true, validator: validateEmail, trigger: 'blur' },
  ],
	password: [
    { required: true, message: 'Por favor ingrese su contraseña', trigger: 'blur' },
  ],
})

const submitAction = (form) => {
  const callback = async () => {
    await authStore.loginUser(formLabelAlign);
    emit('goHome');
  }
  submitForm(form, callback)
}

</script>