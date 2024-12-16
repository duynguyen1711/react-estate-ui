import { Await, useLoaderData } from 'react-router-dom';
import Card from '../../components/card/Card';
import Filter from '../../components/filter/Filter';
import List from '../../components/list/List';
import Map from '../../components/map/Map';
import './listPage.scss';
import { Suspense } from 'react';

const ListPage = () => {
  const postRespone = useLoaderData();

  // Parse latitude and longitude

  return (
    <div className='listPage'>
      <div className='listContainer'>
        <div className='wrapper'>
          <Filter />
          <Suspense fallback={<div>Loading...</div>}>
            <Await
              resolve={postRespone}
              errorElement={<div>Could not load posts 😬</div>}
            >
              {(resolvedData) => {
                const data = Array.isArray(resolvedData.postRespone)
                  ? resolvedData.postRespone.map((item) => ({
                      ...item,
                      latitude: parseFloat(item.latitude) || 0,
                      longitude: parseFloat(item.longitude) || 0,
                    }))
                  : [];
                return data.length > 0 ? (
                  <List data={data} />
                ) : (
                  <p>No data available</p>
                );
              }}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className='mapContainer'>
        <Suspense fallback={<div>Loading...</div>}>
          <Await
            resolve={postRespone}
            errorElement={<div>Could not load posts 😬</div>}
          >
            {(resolvedData) => {
              const data = Array.isArray(resolvedData.postRespone)
                ? resolvedData.postRespone.map((item) => ({
                    ...item,
                    latitude: parseFloat(item.latitude) || 0,
                    longitude: parseFloat(item.longitude) || 0,
                  }))
                : [];
              return data.length > 0 ? (
                <Map items={data} />
              ) : (
                <p>No data available</p>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default ListPage;
