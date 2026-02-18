import type {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useUserContext} from '../hooks/ContextHooks';

const MediaRow = (props: {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  const {user} = useUserContext();

  return (
    <article className="w-full rounded-md bg-stone-600">
      <img
        className="h-72 w-full rounded-t-md object-cover"
        src={item.thumbnail}
        alt={item.title}
      />
      <div className="p-4">
        <h3 className="text-center text-2xl">{item.title}</h3>
        <p className="max-w-full overflow-clip font-bold text-nowrap text-ellipsis text-stone-300">
          {item.description}
        </p>
        <div className="my-2 rounded-md border border-stone-400 p-2">
          <p>
            Created at: <br />{' '}
            {new Date(item.created_at).toLocaleString('fi-FI')}
          </p>
          <p>Filesize: {(item.filesize / 1024 / 1024).toFixed(2)} MB</p>
          <p>Mime-type: {item.media_type}</p>
          <p>Owner: {item.username}</p>
        </div>
        <p>
          <button
            className="block w-full bg-stone-500 p-2 text-center transition-all duration-500 ease-in-out hover:bg-stone-700"
            onClick={() => {
              setSelectedItem(item);
            }}
          >
            View
          </button>
          {/* User exists and owns the media item or is an admin */}
          {user && (user.user_id === item.user_id || user?.level_name === 'Admin') && (
            <>
              <button
                className="block w-full bg-stone-500 p-2 text-center transition-all duration-500 ease-in-out hover:bg-stone-700"
                onClick={() => {
                  console.log('edit media item', item, 'current user', user);
                }}
              >
                Edit
              </button>
              <button
                className="block w-full bg-stone-500 p-2 text-center transition-all duration-500 ease-in-out hover:bg-stone-700"
                onClick={() => {
                  console.log('delete media item');
                }}
              >
                Delete
              </button>
            </>
          )}
        </p>
      </div>
    </article>
  );
};

export default MediaRow;
