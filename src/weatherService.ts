import axios from 'axios';

const API_KEY = 'a063c5421429d1ee6763d30811b49faa';

export const getWeather = async (
  latitude: number,
  longitude: number
) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );

  return response.data;
};