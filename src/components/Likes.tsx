import {useEffect, useReducer} from 'react';
import type {Like, MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useLike} from '../hooks/apiHooks';
import {Button} from './ui/button';
import {ThumbsUp} from 'lucide-react';

type LikesType = {
  item: MediaItemWithOwner | undefined;
};

type LikeState = {
  count: number;
  userLike: Like | null;
};

type LikeAction = {
  type: 'setLikeCount' | 'like';
  like?: Like | null;
  count?: number;
};

const likeInitialState: LikeState = {
  count: 0,
  userLike: null,
};

const Likes = ({item}: LikesType) => {
  const [likeState, likeDispatch] = useReducer(likeReducer, likeInitialState);

  const {postLike, deleteLike, getCountByMediaId, getUserLike} = useLike();

  const getLikes = async () => {
    const token = localStorage.getItem('token');

    if (!item || !token) {
      return;
    }

    try {
      const userLike = await getUserLike(item.media_id, token);
      likeDispatch({type: 'like', like: userLike});
    } catch (error) {
      likeDispatch({type: 'like', like: null});
      console.log('get user like error', (error as Error).message);
    }
  };

  const getLikeCount = async () => {
    if (!item) {
      return;
    }

    try {
      const {count} = await getCountByMediaId(item.media_id);
      likeDispatch({type: 'setLikeCount', count});
    } catch (error) {
      console.log('get user like error', (error as Error).message);
    }
  };

  useEffect(() => {
    getLikes();
    getLikeCount();
  }, []);

  function likeReducer(state: LikeState, action: LikeAction): LikeState {
    switch (action.type) {
      case 'setLikeCount':
        return {...state, count: action.count ?? 0};
      case 'like':
        if (action.like !== undefined) {
          return {...state, userLike: action.like};
        }
        return state; // no change if action.like is undefined
      default:
        return state; // Return the unchanged state if the action type is not recognized
    }
  }

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!item || !token) {
        return;
      }
      // If user has liked the media, delete the like. Otherwise, post the like.
      if (likeState.userLike) {
        await deleteLike(likeState.userLike.like_id, token);
        getLikes();
        getLikeCount();
      } else {
        await postLike(item.media_id, token);
        getLikes();
        getLikeCount();
      }
    } catch (e) {
      console.log('like error', (e as Error).message);
    }
  };

  return (
    <>
      <Button variant="ghost" onClick={handleLike}>
        {likeState.userLike ? (
          <ThumbsUp fill="white" stroke="black" />
        ) : (
          <ThumbsUp />
        )}
      </Button>
      <p>Likes: {likeState.count}</p>
    </>
  );
};

export default Likes;
