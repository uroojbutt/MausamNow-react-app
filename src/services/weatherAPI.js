// const API_KEY = "36ef2f5ad087bca4950203a96d54f6ec"; // 🔁 Replace with your real OpenWeatherMap API key
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


// 🔁 FETCH CURRENT WEATHER WITH UNIT SUPPORT
export const fetchWeatherData = async (city, unit = "metric") => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    return {
      name: data.name,
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      wind: data.wind.speed,
      humidity: data.main.humidity,
      aqi: 111, // Placeholder
      rainfall: data.rain ? data.rain["1h"] || 0 : 0,
      uv: 2, // Placeholder
      icon: data.weather[0].icon,
      time: new Date().toLocaleString(),
    };
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    throw error;
  }
};

// 🔁 FETCH 6-DAY FORECAST WITH UNIT SUPPORT
export const fetchWeatherForecast = async (city, unit = "metric") => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const dailyForecasts = [];//empty array used to store forecast per day
    const processedDates = new Set();//set is builtin js obj like arr map that craates a collection of unique values used to avoid the same date twic

    data.list.forEach((item) => {//list is coming form api evry 3 hours
      const date = new Date(item.dt * 1000);//dt is timestamp in sec but js wants it ms
      const dateString = date.toDateString();//covert date into readbale string
      const hour = date.getHours();//get hours

      if (!processedDates.has(dateString) && hour >= 6 && hour <= 21) {
        processedDates.add(dateString);
        dailyForecasts.push({
          date: date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          temp: Math.round(item.main.temp),
          tempMin: Math.round(item.main.temp_min),
          tempMax: Math.round(item.main.temp_max),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          wind: item.wind.speed,
          rainfall: item.rain ? item.rain["3h"] || 0 : 0,
        });
      }
    });

    // Fill missing days with any other available data
    if (dailyForecasts.length < 6) {
      const additionalForecasts = [];
      const usedDates = new Set(dailyForecasts.map((f) => f.date));//set to store dates already used

      data.list.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const dateString = date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });

        if (
          !usedDates.has(dateString) &&
          additionalForecasts.length < 6 - dailyForecasts.length
        ) {
          usedDates.add(dateString);
          additionalForecasts.push({
            date: dateString,
            temp: Math.round(item.main.temp),
            tempMin: Math.round(item.main.temp_min),
            tempMax: Math.round(item.main.temp_max),
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            humidity: item.main.humidity,
            wind: item.wind.speed,
            rainfall: item.rain ? item.rain["3h"] || 0 : 0,
          });
        }
      });

      dailyForecasts.push(...additionalForecasts);
    }

    return dailyForecasts.slice(0, 6);
  } catch (error) {
    console.error("Error fetching weather forecast:", error.message);
    throw error;
  }
};
