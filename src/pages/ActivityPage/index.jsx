import WeatherBanner from '../../components/WeatherBanner';
import ActivityCard  from '../../components/ActivityCard';
import weatherData   from '../../data/weatherData';

function ActivityPage({ weatherMode }) {
  const items = weatherData[weatherMode].activity;

  return (
    <div className="container">
      <WeatherBanner weatherMode={weatherMode} category="activity" />
      <div className="card-grid">
        {items.map(item => (
          <ActivityCard key={item.id} item={item} weatherMode={weatherMode} />
        ))}
      </div>
    </div>
  );
}

export default ActivityPage;
