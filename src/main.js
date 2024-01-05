import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.config.globalProperties.zipCode = '';
app.config.globalProperties.weatherData = null;
app.config.globalProperties.error = null;

app.config.globalProperties.getWeather = async function () {
    try {
        // Assume you have an API endpoint for weather data
        const response = await fetch(`/api/weather?zipCode=${this.zipCode}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.statusText}`);
        }

        this.error = null;
        this.weatherData = await response.json();
    } catch (error) {
        this.error = `Error: ${error.message}`;
        this.weatherData = null;
    }
};

app.mount('#app');
