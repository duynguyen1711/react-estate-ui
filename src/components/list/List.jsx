import './list.scss';
import Card from '../card/Card';
const List = ({ data }) => {
  return (
    <div className='list'>
      {data && data.length > 0 ? (
        data.map((item) => <Card item={item} key={item.id} />)
      ) : (
        <p>No data available.</p> // Hiển thị khi không có bài viết
      )}
    </div>
  );
};

export default List;
