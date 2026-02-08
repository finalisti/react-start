import type {
  MediaItem,
  MediaItemWithOwner,
  UserWithNoPassword,
} from 'hybrid-types/DBTypes';
import {useEffect, useState} from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import {fetchData} from '../utils/fetch-data';

const Home = () => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);
  const [selectedItem, setSelectedItem] = useState<MediaItemWithOwner | undefined>(
    undefined,
  );

  useEffect(() => {
    const getMedia = async () => {
      const media = await fetchData<MediaItem[]>(
        import.meta.env.VITE_MEDIA_API + '/media',
      );

      const mediaWithOwners = await Promise.all<MediaItemWithOwner>(
        media.map(async (item) => {
          const owner = await fetchData<UserWithNoPassword>(
            `${import.meta.env.VITE_AUTH_API}/users/${item.user_id}`,
          );
          const mediaItemWithOwner: MediaItemWithOwner = {
            ...item,
            username: owner.username,
          };
          return mediaItemWithOwner;
        }),
      );
      setMediaArray(mediaWithOwners);
      console.log(mediaWithOwners);
    };
    getMedia();
  }, []);

  return (
    <>
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Owner</th>
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
              setSelectedItem={setSelectedItem} selectedItem={undefined}            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
