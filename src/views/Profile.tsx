import {useUserContext} from '../hooks/ContextHooks';

const Profile = () => {
  const {user} = useUserContext();

  return (
    <>
      {user && (
        <article className="bg-card border-border w-full rounded-md border">
          <div className="p-4">
            <h3 className="text-center text-2xl">{user.username}</h3>
            <div className="border-input my-2 rounded-md border p-2">
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
