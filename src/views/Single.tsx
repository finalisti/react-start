import type {MediaItem} from 'hybrid-types/DBTypes';
import {useLocation, useNavigate} from 'react-router';

const Single = () => {
  const navigate = useNavigate();
  const {state} = useLocation();

  const item = state.item as MediaItem;

  return (
    <dialog open>
      {item && (
        <>
          <button onClick={() => navigate(-1)}>Go back</button>
          <h2>{item.title}</h2>
          {item.media_type.split('/')[0] === 'image' && (
            <img src={item.filename} alt={item.description || item.title} />
          )}
          {item.media_type.split('/')[0] === 'video' && (
            <video src={item.filename} controls />
          )}
          <p>{item.description}</p>
          <p>
            Uploaded at {new Date(item.created_at).toLocaleString('en-fi')} by
            user id {item.user_id}
          </p>
        </>
      )}
    </dialog>
  );
};
export default Single;
