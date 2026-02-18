import {useRef, useState} from 'react';
import useForm from '../hooks/formHooks';
import {useFile, useMedia} from '../hooks/apiHooks';

const Upload = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const initValues = {title: '', description: ''};

  const doUpload = async () => {
    const token = localStorage.getItem('token');
    if (!file || !token) {
      console.log('doUpload file or token falsy');
      return;
    }
    setUploading(true);
    try {
      const uploadResponse = await postFile(file, token);
      console.log('file upload response', uploadResponse);
      const mediaResponse = await postMedia(uploadResponse, inputs, token);
      console.log('postMedia response', mediaResponse);
      // reset form (or redirect to home view)
      resetForm();
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const {handleInputChange, handleSubmit, inputs, setInputs} = useForm(
    doUpload,
    initValues,
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.files);
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const resetForm = () => {
    setInputs(initValues);
    setFile(null);
    console.log(fileRef.current?.value);
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  return (
    <>
      <h1 className="text-center text-2xl font-semibold">Upload</h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-4 flex w-full max-w-2xl flex-col gap-4 rounded-md bg-stone-600 p-6 text-stone-50 shadow"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="title">
            Title
          </label>
          <input
            className="rounded-md border border-stone-400 bg-stone-700/60 px-3 py-2 text-stone-50 transition outline-none focus:border-stone-200 focus:ring-2 focus:ring-stone-300/40"
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            value={inputs.title}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="description">
            Description
          </label>
          <textarea
            className="rounded-md border border-stone-400 bg-stone-700/60 px-3 py-2 text-stone-50 transition outline-none focus:border-stone-200 focus:ring-2 focus:ring-stone-300/40"
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            value={inputs.description}
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="file">
            File
          </label>
          <input
            className="block w-full text-sm text-stone-200 file:mr-4 file:rounded-md file:border-0 file:bg-stone-500 file:px-4 file:py-2 file:font-semibold file:text-stone-50 hover:file:bg-stone-700"
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            ref={fileRef}
          />
        </div>
        <img
          className="mx-auto h-48 w-48 rounded-md object-cover"
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://placehold.co/320x240?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button
          className="w-full rounded-md bg-stone-500 px-4 py-2 font-semibold transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={file && inputs.title.length > 3 ? false : true}
        >
          Upload
        </button>
      </form>
      <div className="mx-auto mt-4 w-full max-w-2xl">
        <button
          className="w-full rounded-md border border-stone-400 bg-transparent px-4 py-2 font-semibold text-stone-50 transition hover:bg-stone-700"
          onClick={resetForm}
        >
          Reset
        </button>
      </div>
      {uploading && (
        <p className="mt-3 text-center font-semibold text-stone-50">
          Uploading...
        </p>
      )}
    </>
  );
};

export default Upload;
