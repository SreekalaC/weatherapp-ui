<template>
  <link rel="stylesheet" src="../../src/style.css" />
  <div class="weather-app">
    <h1 class="app-title">Weather App</h1>
    <label for="zipCode" class="zip-code-label">Enter Zip Code:</label>
    <input type="text" id="zipCode" v-model="zipCode" class="zip-code-input" />
    <button @click="getWeather" class="get-weather-btn"><b>Get Weather</b></button>

    <!-- Display Weather Data -->
    <div v-if="weatherData" class="weather-info">
      <h2>Weather Information</h2>
      <div class="weather-cards" v-if="weatherData.current && weatherData.location">
        <div class="weather-card">
          <h3>Wind</h3>
          <h1>{{ weatherData.current.wind_kph }} km/h</h1>
          <p>{{ formatLocalTime(weatherData.location.localtime) }}</p>
        </div>
        <div class="weather-card">
          <h2>{{ weatherData.location.region }}, {{ weatherData.location.country }}</h2>
          <h1>{{ weatherData.current.temp_c }} °C</h1>
        </div>
        <div class="weather-card">
          <h3>Temprature</h3>
          <h1>{{ weatherData.current.temp_f }} °F</h1>
          <img id="icon_weather" :src="'https:' + weatherData.current.condition.icon" alt="Weather Icon" /> 
          <h3>{{ weatherData.current.condition.text }}</h3>
        </div>
      </div>
    </div>

    <!-- Display Error Message -->
    <div v-if="weatherData" class="error-message">
      <h3 v-if="weatherData.error">{{ weatherData.error.message}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zipCode: '',
      weatherData: null,
      error: null,
    };
  },
  methods: {
    getWeatherIconUrl(icon) {
      return icon.startsWith('https://') ? icon : `https://${icon}`;
    },
    formatLocalTime(localtime) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
      const formattedTime = new Date(localtime).toLocaleDateString('en-US', options);
      return `${formattedTime}`;
    },
    async getWeather() {
      try {
        const response = await fetch(`https://localhost:7164/Weather?zipCode=${this.zipCode}`);
        console.log(response);
        if (!response.ok) {
          throw new Error(`Failed to fetch weather data: ${response.statusText}`);
        }

        this.error = null;
        this.weatherData = await response.json();
      } catch (error) {
        this.error = `Error: ${error.message}`;
        this.weatherData = null;
      }
    },
  },
};

</script>

<style scoped>
@import url('../../src/style.css');

.weather-app {
  background-color: #1761a1;
  color: white;
  padding: 20px;
  text-align: center;
}

.app-title {
  font-size: 24px;
}

.zip-code-label {
  font-size: 20px;
  margin: 10px;
}

.zip-code-input {
  padding: 5px;
  margin: 10px;
}

.get-weather-btn {
  background-color: #2196F3;
  color: white;
  padding: 12px 16px;
  border: none;
  cursor: pointer;
}

.weather-info {
  margin-top: 20px;
}

.error-message {
  margin-top: 20px;
  color:rgb(238, 139, 139);
}

.weather-cards {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.weather-card {
  background-color: #2196F3;
  color: white;
  padding: 10px;
  text-align: center;
  border-radius: 8px;
  flex: 1;
  margin: 0 10px;
}

.weather-card h3 {
  font-size: 18px;
  margin-bottom: 5px;
}

#icon_weather
{
 margin:-20px;
}
</style>
