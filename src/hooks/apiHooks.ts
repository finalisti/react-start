import type {
  MediaItem,
  MediaItemWithOwner,
  UserWithNoPassword,
} from 'hybrid-types/DBTypes';
import {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetch-data';
import type {Credentials, RegisterCredentials} from '../types/LocalTypes';
import type {LoginResponse, UserResponse} from 'hybrid-types/MessageTypes';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const media = await fetchData<MediaItem[]>(
          import.meta.env.VITE_MEDIA_API + '/media',
        );
        const mediaWithOwners = await Promise.all<MediaItemWithOwner>(
          media.map(async (item) => {
            try {
              const owner = await fetchData<UserWithNoPassword>(
                `${import.meta.env.VITE_AUTH_API}/users/${item.user_id}`,
              );
              const mediaItemWithOwner: MediaItemWithOwner = {
                ...item,
                username: owner.username,
              };
              return mediaItemWithOwner;
            } catch (error) {
              console.error(error);
              return {
                ...item,
                username: 'not found',
              };
            }
          }),
        );
        setMediaArray(mediaWithOwners);
        console.log(mediaWithOwners);
      } catch (error) {
        console.error(error);
      }
    };

    getMedia();
  }, []);
  return {mediaArray};
};

const useAuthentication = () => {
  const postLogin = async (inputs: Credentials) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData<LoginResponse>(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );
    return loginResult;
  };

  return {postLogin};
};

const useUser = () => {
  const resourceUrl = import.meta.env.VITE_AUTH_API + '/users';

  const postRegister = async (inputs: RegisterCredentials) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const registerResult = await fetchData(resourceUrl, fetchOptions);
    return registerResult;
  };

  const getUserByToken = async (token: string) => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return fetchData<UserResponse>(resourceUrl + '/token', options);
  };

  return {postRegister, getUserByToken};
};

export {useMedia, useAuthentication, useUser};
