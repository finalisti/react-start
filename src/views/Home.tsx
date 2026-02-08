import {MediaItem} from 'hybrid-types/DBTypes';
import {useState, useEffect} from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import {fetchData} from '../utils/fetch-data';



const Home = () => {
  const [mediaArray, setMediaArray] = useState<MediaItem[]>([]);

  const getMedia = async () => {
    try {
      const json = await fetchData<MediaItem[]>('test.json');
      setMediaArray(json);
      console.log(json);
    } catch (error) {
      console.error('Failed to fetch media:', error);
    }
  };
  useEffect(() => {
    getMedia();
  }, []);
  const [selectedItem, setSelectedItem] = useState<MediaItem | undefined>();
  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
    </>
  );
};
export default Home;
