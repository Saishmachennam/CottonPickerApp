// utils/weather.ts

export const mockWeather = {
  Akola: {
    tempC: 32,
    condition: "Sunny",
    humidity: 40,
  },
  Wardha: {
    tempC: 29,
    condition: "Cloudy",
    humidity: 55,
  },
  Yavatmal: {
    tempC: 27,
    condition: "Rain",
    humidity: 68,
  }
};

export function getWeather(city: string) {
  return mockWeather[city] || null;
}
