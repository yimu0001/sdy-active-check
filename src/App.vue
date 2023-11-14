<template>
  <div id="app">
    <checkActiveModal :username="13966606666" />
  </div>
</template>

<script>
import checkActiveModal from './components/active'
export default {
  name: 'App',
  components: {
    checkActiveModal,
  },
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
