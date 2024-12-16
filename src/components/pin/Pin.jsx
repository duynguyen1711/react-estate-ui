import { Marker, Popup } from 'react-leaflet';

import './pin.scss';
import { Link } from 'react-router-dom';

const Pin = ({ item, isListPage }) => {
  const lat = parseFloat(item.latitude);
  const lng = parseFloat(item.longitude);
  return (
    <Marker position={[lat, lng]}>
      <Popup>
        <div className='popupContainer'>
          {isListPage && <img src={item.img} alt='' />}

          <div className='textContainer'>
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default Pin;
