import Slider from '../../components/slider/Slider';
import Map from '../../components/map/Map';
import './singlePage.scss';
import DOMPurify from 'dompurify';

import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import apiRequest from '../../lib/apiRequest';

const SinglePage = () => {
  const singlePostData = useLoaderData();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [saved, setSaved] = useState(false);

  // Kiểm tra trạng thái bài đăng đã được lưu
  const checkSavedStatus = async () => {
    if (currentUser) {
      try {
        const response = await apiRequest.get(
          `/saved-posts/is-saved?postId=${singlePostData.id}&userId=${currentUser.id}`
        );
        setSaved(response.data.isSaved);
      } catch (err) {
        console.log('Error checking saved status', err);
      }
    }
  };

  useEffect(() => {
    checkSavedStatus(); // Gọi checkSavedStatus khi component được mount
  }, [currentUser, singlePostData.id]);

  // Xử lý sự kiện lưu bài đăng
  const handleSave = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    try {
      // Thực hiện lưu bài đăng nếu chưa lưu
      if (!saved) {
        await apiRequest.post('/saved-posts', {
          userId: currentUser.id,
          postId: singlePostData.id,
        });
        setSaved((prev) => !prev);
      } else {
        // Xóa bài đăng khỏi danh sách đã lưu nếu đã lưu
        await apiRequest.delete(`/saved-posts/${singlePostData.id}`, {
          data: { userId: currentUser.id },
        });
        setSaved((prev) => !prev);
      }
    } catch (err) {
      console.log('Error saving post', err);
    }
  };

  return (
    <div className='singlePage'>
      <div className='details'>
        <div className='wrapper'>
          <Slider images={singlePostData.images} />
          <div className='info'>
            <div className='top'>
              <div className='post'>
                <h1>{singlePostData.title}</h1>
                <div className='address'>
                  <img src='/pin.png' alt='' />
                  <span>{singlePostData.address}</span>
                </div>
                <div className='price'>${singlePostData.price}</div>
              </div>
              <div className='user'>
                <img
                  src={singlePostData.user.avatar || '/noavatar.png'}
                  alt=''
                />
                <span>{singlePostData.user.username}</span>
              </div>
            </div>
            <div className='bottom'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    singlePostData.postDetail.description
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='features'>
        <div className='wrapper'>
          <p className='title'>General</p>
          <div className='listVertical'>
            <div className='feature'>
              <img src='/utility.png' alt='' />
              <div className='featureText'>
                <span>Utilities</span>
                {singlePostData.postDetail.utilities === 'owner' ? (
                  <p>Owner is responsible</p>
                ) : singlePostData.postDetail.utilities === 'tenant' ? (
                  <p>Tenant is responsible</p>
                ) : (
                  <p>Shared responsibility</p>
                )}
              </div>
            </div>
            <div className='feature'>
              <img src='/pet.png' alt='' />
              <div className='featureText'>
                <span>Pet Policy</span>
                {singlePostData.postDetail.petPolicy === 'allowed' ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets Not Allowed</p>
                )}
              </div>
            </div>
            <div className='feature'>
              <img src='/fee.png' alt='' />
              <div className='featureText'>
                <span>Income Policy</span>
                <p>{singlePostData.postDetail.incomeRequirement}</p>
              </div>
            </div>
          </div>
          <p className='title'>Sizes</p>
          <div className='sizes'>
            <div className='size'>
              <img src='/size.png' alt='' />
              <span>{singlePostData.postDetail.size} sqft</span>
            </div>
            <div className='size'>
              <img src='/bed.png' alt='' />
              {singlePostData.postDetail.bedroom > 1 ? (
                <span>{singlePostData.bedroom} beds</span>
              ) : (
                <span>{singlePostData.bedroom} bed</span>
              )}
            </div>
            <div className='size'>
              <img src='/bath.png' alt='' />
              {singlePostData.bathroom > 1 ? (
                <span>{singlePostData.bathroom} bathrooms</span>
              ) : (
                <span>{singlePostData.bathroom} bathroom</span>
              )}
            </div>
          </div>
          <p className='title'>Nearby Places</p>
          <div className='listHorizontal'>
            <div className='feature'>
              <img src='/school.png' alt='' />
              <div className='featureText'>
                <span>School</span>
                <p>
                  {singlePostData.postDetail.nearbySchools > 999
                    ? singlePostData.postDetail.nearbySchools / 1000 + 'km'
                    : singlePostData.postDetail.nearbySchools + 'm'}{' '}
                  away
                </p>
              </div>
            </div>
            <div className='feature'>
              <img src='/pet.png' alt='' />
              <div className='featureText'>
                <span>Bus Stop</span>
                <p>
                  {singlePostData.postDetail.nearbyBusStops > 999
                    ? singlePostData.postDetail.nearbyBusStops / 1000 + 'km'
                    : singlePostData.postDetail.nearbyBusStops + 'm'}{' '}
                  away
                </p>
              </div>
            </div>
            <div className='feature'>
              <img src='/fee.png' alt='' />
              <div className='featureText'>
                <span>Restaurant</span>
                <p>
                  {singlePostData.postDetail.nearbyRestaurants > 999
                    ? singlePostData.postDetail.nearbyRestaurants / 1000 + 'km'
                    : singlePostData.postDetail.nearbyRestaurants + 'm'}{' '}
                  away
                </p>
              </div>
            </div>
          </div>
          <p className='title'>Location</p>
          <div className='mapContainer'>
            <Map items={[singlePostData]} isListPage={false} />
          </div>
          <div className='buttons'>
            <button>
              <img src='/chat.png' alt='' />
              Send a Message
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? '#fece51' : 'white',
              }}
            >
              <img src='/save.png' alt='' />
              {saved ? 'Place Saved' : 'Save the Place'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
