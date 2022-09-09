import { ElNotification } from 'element-plus';
import i18n from '../localization'

const { t } = i18n.global

function validateEmail(rule, value, callback) {
  const valid = value.toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (value === '' || !valid) {
    callback(new Error(t('loginView.validation.email')))
  }else {
    callback()
  }
}

async function submitForm(formEl, callback,timeout) {
	if (!formEl) return
	await formEl.validate(async (valid) => {	
		if (valid) {
      try {
        await callback();
      } catch (err) {
          ElNotification({
            title: 'Error',
            message: err.response.data?.message,
            type: 'error',
        })
      }
		} else {
      if(timeout) {
        setTimeout(()=> {
          formEl.clearValidate();
        }, timeout);
      }
		}
	})
}

export { validateEmail, submitForm };