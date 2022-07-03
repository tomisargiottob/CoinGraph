import { ElNotification } from 'element-plus';

function validateEmail(rule, value, callback) {
  const valid = value.toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (value === '' || !valid) {
    callback(new Error('Por favor ingrese un correo valida'))
  }else {
    callback()
  }
}

async function submitForm(formEl, callback,timeout) {
	if (!formEl) return
	await formEl.validate(async (valid, fields) => {	
		if (valid) {
      try {
        await callback();
      } catch (err) {
          ElNotification({
            title: 'Error',
            message: err.message,
            type: 'error',
        })
      }
		} else {
			console.log('error submit!', fields);
      if(timeout) {
        setTimeout(()=> {
          formEl.clearValidate();
        }, timeout);
      }
		}
	})
}

export { validateEmail, submitForm };