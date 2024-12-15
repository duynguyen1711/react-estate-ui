import './list.scss';
import { listData } from '../../lib/dummydata';
import Card from '../card/Card';
import apiRequest from '../../lib/apiRequest';
import { useEffect, useState } from 'react';
const List = () => {
  const [data, setData] = useState([]); // State lưu dữ liệu từ API
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi
  const handleGetData = async () => {
    try {
      const res = await apiRequest.get('/posts');
      console.log(res.data);
      setData(res.data); // Lưu dữ liệu vào state
      setLoading(false);
    } catch (err) {
      setError('Failed to load posts'); // Xử lý lỗi nếu có
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className='list'>
      {data.map((item) => (
        <Card item={item} key={item.id} />
      ))}
    </div>
  );
};

export default List;
