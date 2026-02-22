import type {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useUserContext} from '../hooks/ContextHooks';
import {Button} from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

const MediaRow = (props: {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  const {user} = useUserContext();

  return (
    <Card className="w-full overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 z-10 bg-black/20 transition-colors hover:bg-black/0" />
        <img
          className="h-72 w-full object-cover"
          src={item.thumbnail}
          alt={item.title}
        />
      </div>
      <CardHeader>
        <CardTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {item.title}
        </CardTitle>
        <CardDescription className="max-w-full overflow-hidden text-nowrap text-ellipsis">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border-input text-muted-foreground rounded-md border p-2 text-sm">
          <p>
            Created at: <br />{' '}
            {new Date(item.created_at).toLocaleString('fi-FI')}
          </p>
          <p>Filesize: {(item.filesize / 1024 / 1024).toFixed(2)} MB</p>
          <p>Mime-type: {item.media_type}</p>
          <p>Owner: {item.username}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full"
          onClick={() => {
            setSelectedItem(item);
          }}
        >
          View
        </Button>
        {/* User exists and owns the media item or is an admin */}
        {user &&
          (user.user_id === item.user_id || user?.level_name === 'Admin') && (
            <>
              <Button
                className="w-full"
                onClick={() => {
                  console.log('edit media item', item, 'current user', user);
                }}
              >
                Edit
              </Button>

              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  console.log('delete media item');
                }}
              >
                Delete
              </Button>
            </>
          )}
      </CardFooter>
    </Card>
  );
};

export default MediaRow;
