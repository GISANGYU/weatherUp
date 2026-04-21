import Masonry from 'react-masonry-css';
import WeatherBanner from '../../components/WeatherBanner';
import OutfitCard    from '../../components/OutfitCard';
import weatherData   from '../../data/weatherData';

const BREAKPOINTS = { default: 4, 1280: 3, 900: 2 };

function OOTDPage({ weatherMode }) {
  const { ootd: items } = weatherData[weatherMode];

  return (
    <div className="container">
      <WeatherBanner weatherMode={weatherMode} category="ootd" />
      <Masonry
        breakpointCols={BREAKPOINTS}
        className="masonry-grid"
        columnClassName="masonry-column"
      >
        {items.map(item => (
          <OutfitCard key={item.id} item={item} weatherMode={weatherMode} />
        ))}
      </Masonry>
    </div>
  );
}

export default OOTDPage;
