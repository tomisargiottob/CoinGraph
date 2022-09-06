<template>
  <el-row justify="center">  
    <el-col :span="24">
      <el-dropdown @command="changeLanguage" trigger="click" class="select-language">
        <div class="el-dropdown-link">
          <span class="active-language">
            {{language.toUpperCase()}}
          </span>
          <earth-icon />
          <el-icon class="el-icon--right"><arrow-down /></el-icon>  
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="es">
              <el-row>
                <el-col :span="18">Español</el-col>
                <el-col :span="6">&nbsp;ES</el-col>
              </el-row>
            </el-dropdown-item>
            <el-dropdown-item command="en">
              <el-row>
                <el-col :span="18">English</el-col>
                <el-col :span="6">&nbsp;EN</el-col>
              </el-row>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import EarthIcon from 'vue-material-design-icons/Earth.vue';
import { mapState } from 'pinia';
import { useConfigStore } from '../store/configStore'

export default {
  name:'toggleLanguage',
  components: { EarthIcon },
  computed: {
    ...mapState(useConfigStore, ['language'])
  },
  methods: {
    changeLanguage(value) {
      this.$i18n.locale=value;
      const configStore = useConfigStore();
      configStore.setUserLanguage(value);
    }
  }
}
</script>
<style lang="scss">
  .el-dropdown-menu{
    font-family: $projectFont ;
  }
  .select-language{
    font-family: $projectFont;
    &:hover{
      background-color: $blueHover;
      border-radius: 5px;
      color: $buttonColor
    }
    margin: 11px 8px 8px 8px;
    padding: 0px 10px 7px 10px;
    .active-language{
      margin-right: 10px;
    }
    .material-design-icon__svg{
      position: relative;
      top: 6px;
    }
  }
</style>