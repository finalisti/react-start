import type {MediaItem} from 'hybrid-types/DBTypes';
import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

const Single = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = (location.state as {item?: MediaItem} | null) ?? null;
  const item = state?.item;

  useEffect(() => {
    if (!item) navigate(-1);
  }, [item, navigate]);

  if (!item) return null;

  return (
    <dialog open>
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
          Uploaded at {new Date(item.created_at).toLocaleString('en-fi')} by user id {item.user_id}
        </p>
      </>
    </dialog>
  );
};

export default Single;
