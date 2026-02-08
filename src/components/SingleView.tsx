import type {MediaItem} from 'hybrid-types/DBTypes';

const SingleView = (props: {
  item: MediaItem | undefined;
  setSelectedItem: (item: MediaItem | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  return (
    <dialog open>
      {item && (
        <>
          <h2>{item.title}</h2>
          {item.media_type.split('/')[0] === 'image' && (
            <img src={item.filename} alt={item.description || item.title} />
          )}
          {item.media_type.split('/')[0] === 'video' && (
            <video src={item.filename} controls />
          )}
          <p>{item.description}</p>
          <p>
            Uploaded at {new Date(item.created_at).toLocaleString('fi-FI')} by
            user id {item.user_id}
          </p>
          <button
            onClick={() => {
              setSelectedItem(undefined);
            }}
          >
            Close
          </button>
        </>
      )}
    </dialog>
  );
};
export default SingleView;
