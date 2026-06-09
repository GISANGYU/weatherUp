import WeatherBanner from '../../components/WeatherBanner';
import FoodCard      from '../../components/FoodCard';
import weatherData   from '../../data/weatherData';

function FoodPage({ weatherMode }) {
  const items = weatherData[weatherMode].food;

  return (
    <div className="container">
      <WeatherBanner weatherMode={weatherMode} category="food" />
      <div className="card-grid">
        {items.map(item => (
          <FoodCard key={item.id} item={item} weatherMode={weatherMode} />
        ))}
      </div>
    </div>
  );
}

export default FoodPage;
