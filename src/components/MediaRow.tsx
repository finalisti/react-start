import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Link} from 'react-router';

const MediaRow = (props: {
  item: MediaItemWithOwner;
  selectedItem: MediaItemWithOwner | undefined;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  const onSelect = () => setSelectedItem(item);
  return (
    <tr onClick={onSelect} tabIndex={0} style={{cursor: 'pointer'}}>
      <td>
        <img src={item.thumbnail} alt={item.title} />
        <div>
          <Link to="/single" state={{item}}>Show</Link>
        </div>
      </td>
      <td>{item.title}</td>
      <td>{item.username}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
    </tr>
  );
};

export default MediaRow;
