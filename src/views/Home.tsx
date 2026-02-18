import type {MediaItem} from 'hybrid-types/DBTypes';
import {useState} from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import {useMedia} from '../hooks/apiHooks';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | undefined>(
    undefined,
  );

  const {mediaArray} = useMedia();

  return (
    <>
      {/* Debug
       <p>Selected item: {selectedItem?.title}</p> */}
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mediaArray.map((item) => (
          <MediaRow
            key={item.media_id}
            item={item}
            setSelectedItem={setSelectedItem}
          />
        ))}
      </section>
    </>
  );
};

export default Home;
