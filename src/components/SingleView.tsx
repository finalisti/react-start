import type {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import Likes from './Likes';
import Comments from './Comments';
import {Button} from './ui/button';
import {X} from 'lucide-react';

const SingleView = (props: {
  item: MediaItemWithOwner | undefined;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex h-full w-full items-start justify-center overflow-y-auto bg-black/60 p-4 pt-12 md:pt-4"
    >
      {item && (
        <article className="bg-card text-card-foreground relative h-fit w-full max-w-4xl rounded-md shadow-xl transition-all">
          <Button
            className="absolute top-2 right-2 z-10"
            onClick={() => {
              setSelectedItem(undefined);
            }}
            variant={'secondary'}
          >
            <X />
          </Button>
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
            <div className="border-input my-2 rounded-md border p-2">
              <p>
                Uploaded at {new Date(item.created_at).toLocaleString('fi-FI')}{' '}
                by user id {item.user_id}
              </p>
            </div>

            <Comments mediaId={item.media_id} />
          </div>
        </article>
      )}
    </dialog>
  );
};
export default SingleView;
