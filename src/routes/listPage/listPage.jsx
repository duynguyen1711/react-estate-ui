import { useLoaderData } from 'react-router-dom';
import Card from '../../components/card/Card';
import Filter from '../../components/filter/Filter';
import List from '../../components/list/List';
import Map from '../../components/map/Map';
import { listData } from '../../lib/dummydata';
import './listPage.scss';

const ListPage = () => {
  const rawData = useLoaderData();

  // Parse latitude and longitude
  const data = rawData.map((item) => ({
    ...item,
    latitude: parseFloat(item.latitude) || 0,
    longitude: parseFloat(item.longitude) || 0,
  }));
  console.log(data);
  return (
    <div className='listPage'>
      <div className='listContainer'>
        <div className='wrapper'>
          <Filter />
          {data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className='mapContainer'>
        <Map items={data} />
      </div>
    </div>
  );
};

export default ListPage;
