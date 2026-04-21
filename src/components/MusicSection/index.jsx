import MusicCard          from '../MusicCard';
import { useMusicContext } from '../../context/MusicContext';
import { useMusicCovers }  from '../../hooks/useMusicCovers';

function MusicSection({ items, limit, className }) {
  const { play, playingId } = useMusicContext();
  const { covers }          = useMusicCovers(items);

  const displayItems = limit != null ? items.slice(0, limit) : items;

  return (
    <div className={className}>
      {displayItems.map(item => (
        <MusicCard
          key={item.id}
          item={item}
          cover={covers[item.id]}
          isPlaying={playingId === item.id}
          onPlay={() => play(item.id, item.link, {
            title:  item.title,
            artist: item.artist,
            emoji:  item.emoji,
          })}
        />
      ))}
    </div>
  );
}

export default MusicSection;
