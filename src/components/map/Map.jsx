import './map.scss';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Pin from '../pin/Pin';
import { useRef } from 'react';

const Map = ({ items, isListPage }) => {
  const mapRef = useRef(null);
  console.log(items);

  // Reset map when items change
  const mapKey = Math.random();
  console.log(mapKey);

  return (
    <MapContainer
      center={
        items.length > 0 ? [items[0].latitude, items[0].longitude] : [0, 0]
      }
      ref={mapRef} // Reference for map
      key={mapKey}
      zoom={7}
      scrollWheelZoom={true}
      className='map'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {items.map((item) => (
        <Pin item={item} isListPage={isListPage} key={item.id} />
      ))}
    </MapContainer>
  );
};

export default Map;
