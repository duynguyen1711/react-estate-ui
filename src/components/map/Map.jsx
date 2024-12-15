import './map.scss';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Pin from '../pin/Pin';

const Map = ({ items, isListPage }) => {
  return (
    <MapContainer
      center={
        items.length > 0 ? [items[0].latitude, items[0].longitude] : [0, 0]
      }
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
