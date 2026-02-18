import {useUserContext} from '../hooks/ContextHooks';

const Profile = () => {
  const {user} = useUserContext();

  return (
    <>
      {user && (
        <article className="w-full rounded-md bg-stone-600">
          <div className="p-4">
            <h3 className="text-center text-2xl">{user.username}</h3>
            <div className="my-2 rounded-md border border-stone-400 p-2">
              <p>Email: {user.email}</p>
              <p>User level: {user.level_name}</p>
              <p>
                Registered: {new Date(user.created_at).toLocaleString('fi-FI')}
              </p>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default Profile;
