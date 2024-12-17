import { Await, useLoaderData } from 'react-router-dom';
import Filter from '../../components/filter/Filter';
import List from '../../components/list/List';
import Map from '../../components/map/Map';
import './listPage.scss';
import { Suspense } from 'react';

const ListPage = () => {
  const { postResponse } = useLoaderData(); // Lấy postResponse từ loader
  return (
    <div className='listPage'>
      <div className='listContainer'>
        <div className='wrapper'>
          <Filter />

          <Suspense fallback={<p>🌀 Loading posts...</p>}>
            <Await
              resolve={postResponse} // Dữ liệu trả về từ loader
              errorElement={<div>Could not load posts 😬</div>}
            >
              {(resolvedData) => {
                const data = Array.isArray(resolvedData.data)
                  ? resolvedData.data.map((item) => ({
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
        <Suspense fallback={<div>🗺️ Loading map...</div>}>
          <Await
            resolve={postResponse}
            errorElement={<div>Could not load map 😬</div>}
          >
            {(resolvedData) => {
              const data = Array.isArray(resolvedData.data)
                ? resolvedData.data.map((item) => ({
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
