import { defineStore } from 'pinia';

export const useConfigStore = defineStore("ConfigStore", {
	state: () => {
		return {
			language: '',
		}
	},
	actions: {
    getUserLanguage() {
      const language = sessionStorage.getItem('selectedLanguage')
      if (language) {
        this.language = language;
      }
      return this.language;
    },
    setUserLanguage(language) {
      sessionStorage.setItem('selectedLanguage', language)
      this.language = language; 
    }
	}
})

