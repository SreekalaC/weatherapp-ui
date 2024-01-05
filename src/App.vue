<template>
  <img alt="weatherLogo" id="weatherapp_logo"  src="./assets/logo.png">
  <CurrentWeather msg="Current Weather"/>
</template>

<script>

import CurrentWeather from './components/CurrentWeather.vue'

export default {
  name: 'App',
  components: {
    CurrentWeather
  }
}
</script>
