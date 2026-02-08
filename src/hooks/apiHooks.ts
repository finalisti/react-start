import {useEffect, useState} from 'react';
import type {
  MediaItem,
  MediaItemWithOwner,
  UserWithNoPassword,
} from 'hybrid-types/DBTypes';
import {fetchData} from '../utils/fetch-data';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);

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
          return {...item, username: owner.username};
        }),
      );
      setMediaArray(mediaWithOwners);
    };

    getMedia();
  }, []);

  return {mediaArray};
};

export {useMedia};
