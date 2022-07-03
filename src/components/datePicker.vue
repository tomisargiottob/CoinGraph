<template>
  <div>
    <el-form
      class="date-picker-form"
      ref="datePickerForm"
      type="inline"
      :rules="rules"
      :model="dates"
      @keyup.enter="searchDates($refs.datePickerForm)"
    >
      <el-form-item prop="from">
        <el-date-picker
            class="date-picker"
            v-model="dates.from"
            type="date"
            placeholder="Desde"
            size="default"
          />
      </el-form-item>
      <el-form-item prop="to">
        <el-date-picker
            class="date-picker"
            v-model="dates.to"
            type="date"
            placeholder="Hasta"
            size="default"
          />
      </el-form-item>
      <el-form-item>
        <el-button @click="searchDates($refs.datePickerForm)"> Buscar </el-button>
      </el-form-item>
       <el-form-item>
        <el-button @click="resetDates"> Reset </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { submitForm } from '../utils/utils'

  export default {
    name: 'datePicker',
    setup() {
    },
    data() {
      return {
        dates: {
          from: '',
          to: ''
        },
        rules: {
          from: [
            { required: true,  message: 'Por favor ingrese fecha de busqueda' }
          ],
          to: [
            { required: true, validator: this.controlDates }
          ]
        }
      }
    },
    methods: {
      resetDates() {
        const form = this.$refs.datePickerForm;
        form.resetFields();
        this.submitDates({})
      },
      submitDates(dates) {
        this.$emit('searchDates', dates)
      },
      searchDates(arg) {
        submitForm(arg, () => this.submitDates(this.dates), 3000)
      },
      controlDates(rule, value, callback) {
        if (!this.dates.from || !this.dates.to) {
          callback('Debe indicar fecha de fin de la busqueda')
        }
        const dateDiff = this.dates.to - this.dates.from;
        if(dateDiff > 3*60*60*1000*24*30){
          callback('El rango de busqueda no puede ser mayor a 90 días');
        }
        if (dateDiff < 0) {
          callback('Indique una fecha superior a Desde')
        }
        callback();
      }
    }
  }
</script>
<style lang="scss">
  .date-picker-form{
    display: flex;
    .el-input, .el-button {
      margin-top:10px;
    }
    .el-input, .el-button, .el-form-item__error {
      margin-left: 15px;
    }
  }
</style>