<template>
  <div>
    <h1 class="call-action">{{$t('recoverForm.title')}}</h1>
    <el-form
        ref="recoverForm"
        label-width="100px"
        :rules="rules"
        :model="recoverData"
        style="max-width: 460px"
    >
      <el-form-item prop="email">
        <el-input required="true" :placeholder="$t('loginCommon.email')" v-model="recoverData.email" />
      </el-form-item>
        <el-form-item>
          <el-button type="primary" 
              @click="recoverAccount(recoverForm)"                     
          >
            {{$t('recoverForm.sendButton')}}
          </el-button>
      </el-form-item>
   
      <el-form-item>
        <el-button type="primary" 
            @click="goBack()"                     
        >
          {{$t('recoverForm.goBack')}}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { validateEmail, submitForm } from '../utils/utils';

const emit = defineEmits(['goBack'])
const recoverData = reactive({
  email: '',
})
const recoverForm = ref();
const rules = reactive({
  email: [
    { required: true, validator: validateEmail, trigger: 'blur' },
  ],
})

const goBack= () => {
  emit('goBack');
}

const recoverAccount = async (form) => {
  await submitForm(form, () => console.log('se ha enviado un codigo al correo'));
}

</script>

<style scoped>
  .call-action{
    color: gray;
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 20px
  }
  :deep(.el-form-item) {
    margin-bottom:0px !important;
  }
</style>