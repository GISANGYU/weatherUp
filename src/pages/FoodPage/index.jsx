import Masonry from 'react-masonry-css';
import WeatherBanner from '../../components/WeatherBanner';
import FoodCard      from '../../components/FoodCard';
import weatherData   from '../../data/weatherData';

const BREAKPOINTS = { default: 4, 1280: 3, 900: 2 };

function FoodPage({ weatherMode }) {
  const items = weatherData[weatherMode].food;

  return (
    <div className="container">
      <WeatherBanner weatherMode={weatherMode} category="food" />
      <Masonry
        breakpointCols={BREAKPOINTS}
        className="masonry-grid"
        columnClassName="masonry-column"
      >
        {items.map(item => (
          <FoodCard key={item.id} item={item} weatherMode={weatherMode} />
        ))}
      </Masonry>
    </div>
  );
}

export default FoodPage;
