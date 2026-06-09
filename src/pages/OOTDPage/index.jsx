import WeatherBanner from '../../components/WeatherBanner';
import OutfitCard    from '../../components/OutfitCard';
import weatherData   from '../../data/weatherData';

function OOTDPage({ weatherMode }) {
  const { ootd: items } = weatherData[weatherMode];

  return (
    <div className="container">
      <WeatherBanner weatherMode={weatherMode} category="ootd" />
      <div className="card-grid">
        {items.map(item => (
          <OutfitCard key={item.id} item={item} weatherMode={weatherMode} />
        ))}
      </div>
    </div>
  );
}

export default OOTDPage;
