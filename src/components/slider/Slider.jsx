import { useEffect, useState } from 'react';
import './slider.scss';

const Slider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(null);
  const changSlide = (direction) => {
    if (direction === 'left') {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setImageIndex(null); // Đóng slider
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown); // Dọn dẹp sự kiện
    };
  }, []);
  return (
    <div className='slider'>
      {imageIndex !== null && (
        <div className='fullSlider'>
          <div className='arrow' onClick={() => changSlide('left')}>
            <img src='/arrow.png' />
          </div>
          <div className='imgContainer'>
            <img src={images[imageIndex]} />
          </div>
          <div className='arrow' onClick={() => changSlide('right')}>
            <img src='/arrow.png' className='right' />
          </div>
          <div className='close' onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}

      <div className='bigImage'>
        <img src={images[0]} onClick={() => setImageIndex(0)} />
      </div>
      <div className='smallImages'>
        {images.slice(1).map((image, index) => (
          <img
            src={image}
            key={index}
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
