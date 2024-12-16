import './list.scss';
import { listData } from '../../lib/dummydata';
import Card from '../card/Card';
import apiRequest from '../../lib/apiRequest';
import { useEffect, useState } from 'react';
const List = ({ data }) => {
  return (
    <div className='list'>
      {data && data.length > 0 ? (
        data.map((item) => <Card item={item} key={item.id} />)
      ) : (
        <p>No posts available.</p> // Hiển thị khi không có bài viết
      )}
    </div>
  );
};

export default List;
