import {useEffect, useRef} from 'react';
import {useUserContext} from '../hooks/ContextHooks';
import useForm from '../hooks/formHooks';
import {useCommentStore} from '../stores/commentStore';
import {useComment} from '../hooks/apiHooks';
import {Button} from './ui/button';

const Comments = ({mediaId}: {mediaId: number}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {comments, setComments} = useCommentStore();
  const {user} = useUserContext();
  const {postComment, getCommentsByMediaId} = useComment();

  const initValues = {comment_text: ''};
  const doComment = async () => {
    const token = localStorage.getItem('token');
    if (!user || !token) {
      return;
    }
    // eslint-disable-next-line react-hooks/immutability
    console.log('adding comment:', inputs.comment_text);
    const commentResponse = await postComment(
      inputs.comment_text,
      mediaId,
      token,
    );

    if (!commentResponse) {
      return;
    }
    const comments = await getCommentsByMediaId(mediaId);

    if (comments.length > 0) {
      setComments(comments);
    }

    // eslint-disable-next-line react-hooks/immutability
    setInputs(initValues);
    // clear comment input with useRef() hook
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const {handleInputChange, handleSubmit, inputs, setInputs} = useForm(
    doComment,
    initValues,
  );

  useEffect(() => {
    const main = async () => {
      console.log('Moro!!!!!');
      const comments = await getCommentsByMediaId(mediaId);

      if (comments.length > 0) {
        setComments(comments);
      }
    };

    main();
  }, [mediaId]);

  return (
    <>
      <h3>Comments</h3>

      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.comment_id}>
              {comment.created_at?.toLocaleString('fi-FI')}{' '}
              <b>{comment.username}:</b> {comment.comment_text}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}

      {user && (
        <form
          onSubmit={handleSubmit}
          className="bg-card text-card-foreground mx-auto mt-4 flex w-full max-w-2xl flex-col gap-4 rounded-md p-6 shadow"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold" htmlFor="title">
              Write comment
            </label>
            <input
              className="border-input bg-background text-foreground focus:border-ring focus:ring-ring rounded-md border px-3 py-2 transition outline-none focus:ring-2"
              name="comment_text"
              type="text"
              id="comment_text"
              onChange={handleInputChange}
              ref={inputRef}
            />
          </div>
          <Button
            className="w-full font-semibold"
            type="submit"
            disabled={inputs.comment_text.length > 0 ? false : true}
          >
            Add comment
          </Button>
        </form>
      )}
    </>
  );
};

export default Comments;
