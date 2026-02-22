import type {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import Likes from './Likes';

const SingleView = (props: {
  item: MediaItemWithOwner | undefined;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  return (
    <dialog
      open
      className="fixed inset-0 m-0 grid h-screen w-screen place-items-center border-0 bg-black/60 p-4"
    >
      {item && (
        <article className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-md bg-stone-600 text-stone-50">
          {item.media_type.split('/')[0] === 'image' && (
            <img
              className="max-h-[60vh] w-full rounded-t-md object-contain"
              src={item.filename}
              alt={item.description || item.title}
            />
          )}
          {item.media_type.split('/')[0] === 'video' && (
            <video
              className="max-h-[60vh] w-full rounded-t-md object-contain"
              src={item.filename}
              controls
            />
          )}
          <div className="p-4">
            <h3 className="text-center text-2xl">{item.title}</h3>
            <Likes item={item} />
            <p>Owner: {item.username}</p>
            <p className="max-w-full">{item.description}</p>
            <div className="my-2 rounded-md border border-stone-400 p-2">
              <p>
                Uploaded at {new Date(item.created_at).toLocaleString('fi-FI')}{' '}
                by user id {item.user_id}
              </p>
            </div>
            <button
              className="block w-full bg-stone-500 p-2 text-center transition-all duration-500 ease-in-out hover:bg-stone-700"
              onClick={() => {
                setSelectedItem(undefined);
              }}
            >
              Close
            </button>
          </div>
        </article>
      )}
    </dialog>
  );
};
export default SingleView;
