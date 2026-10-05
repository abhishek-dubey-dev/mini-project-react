import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CloudIcon from "@mui/icons-material/Cloud";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import "./InfoBox.css";

export default function InfoBox({ info }) {
  //const INIT_URL =
  //  "https://images.unsplash.com/photo-1765891597642-5351dad84d87?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGR1c3R5JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D";

    const HOT_URL="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdCUyMHdlYXRoZXJ8ZW58MHx8MHx8";
    const COLD_URL="https://images.unsplash.com/photo-1608889170590-1f3c5e7b6d8e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvbGQlMjB3ZWF0aGVyfGVufDB8fDB8fHw%3D";
    const RAIN_URL="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJhaW55JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D";
    const weatherDescription = info.weather.toLowerCase();
    let WeatherIcon = WbSunnyIcon;

    if (weatherDescription.includes("thunderstorm")) {
      WeatherIcon = ThunderstormIcon;
    } else if (
      weatherDescription.includes("rain") ||
      weatherDescription.includes("drizzle")
    ) {
      WeatherIcon = WaterDropIcon;
    } else if (
      weatherDescription.includes("snow") ||
      weatherDescription.includes("sleet")
    ) {
      WeatherIcon = AcUnitIcon;
    } else if (
      weatherDescription.includes("cloud") ||
      weatherDescription.includes("mist") ||
      weatherDescription.includes("fog") ||
      weatherDescription.includes("haze")
    ) {
      WeatherIcon = CloudIcon;
    }

  return (
    <div className="info-box">
      <div className="info-box-card">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 140 }} image={info.humidity > 80 ? RAIN_URL : info.temp > 15 ? HOT_URL : COLD_URL} title="green iguana" />
        <CardContent>
          <WeatherIcon
            className="weather-icon"
            aria-label={info.weather}
            fontSize="large"
          />
          <Typography gutterBottom variant="h5" component="div">
            {info.city}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} component={"span"}>
            <p>Temperature: {info.temp}°C</p>
            <p>The Weather can be described as <i>{info.weather}</i> and feels like: {info.feels_like}°C </p>
            <p>Min Temperature: {info.temp_min}°C</p>
            <p>Max Temperature: {info.temp_max}°C</p>
            <p>Humidity: {info.humidity}%</p>
          </Typography>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
