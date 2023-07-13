<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import bdmap from './components/bdmap.vue'

export default {
  name: 'App',
  components: {
    bdmap
  },
  mounted() {
  }
}
</script>

<style>
</style>
