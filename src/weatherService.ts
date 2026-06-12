import axios from 'axios';

const API_KEY =
  process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;

export const getWeather = async (
  latitude: number,
  longitude: number
) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );

  return response.data;
};