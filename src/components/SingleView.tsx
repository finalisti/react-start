import {MediaItem} from '../types/DBTypes';

const SingleView = (props: {
  item: MediaItem | undefined;
  setSelectedItem: (item: MediaItem | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  if (!item) return null;
  const isImage = item.media_type?.startsWith('image');
  const isVideo = item.media_type?.startsWith('video');
  return (
    <dialog open style={{padding: 0, border: 'none'}}>
      <div>
        <div>
          <button onClick={() => setSelectedItem(undefined)}>Close</button>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {isImage ? (
            <img src={item.filename} alt={item.title} />
          ) : isVideo ? (
            <video controls src={item.filename} />
          ) : (
            <a href={item.filename} target="_blank" rel="noopener noreferrer">
              Open file
            </a>
          )}
        </div>
        <h3>{item.title}</h3>
        {item.description && <p>{item.description}</p>}
      </div>
    </dialog>
  );
};
export default SingleView;
