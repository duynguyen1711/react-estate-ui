import { Link, useNavigate } from 'react-router-dom';
import './card.scss';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';

const Card = ({ item }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false); // Thêm trạng thái loading để hiển thị khi thao tác lưu

  // Kiểm tra trạng thái đã lưu của bài đăng
  const checkSavedStatus = async () => {
    if (currentUser) {
      try {
        const response = await apiRequest.get(
          `/saved-posts/is-saved?postId=${item.id}&userId=${currentUser.id}`
        );
        setSaved(response.data.isSaved);
      } catch (err) {
        console.log('Error checking saved status', err);
        // Có thể hiển thị thông báo lỗi cho người dùng ở đây
      }
    }
  };

  useEffect(() => {
    checkSavedStatus();
  }, [currentUser, item.id]);

  // Xử lý sự kiện lưu bài đăng
  const handleSave = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setLoading(true); // Bắt đầu loading khi người dùng nhấn vào nút
    try {
      if (!saved) {
        // Lưu bài đăng
        await apiRequest.post('/saved-posts', {
          userId: currentUser.id,
          postId: item.id,
        });
        setSaved(true);
      } else {
        // Xóa bài đăng khỏi danh sách lưu
        await apiRequest.delete(`/saved-posts/${item.id}`, {
          data: { userId: currentUser.id },
        });
        setSaved(false);
      }
    } catch (err) {
      console.log('Error saving post', err);
      // Hiển thị thông báo lỗi cho người dùng nếu cần
    } finally {
      setLoading(false); // Dừng loading sau khi xử lý xong
    }
  };

  const hasImages = item.images && item.images.length > 0;

  return (
    <div className='card'>
      <Link to={`/${item.id}`} className='imgContainer'>
        <img
          src={hasImages ? item.images[0] : '/default-image.png'}
          alt={item.title}
        />
      </Link>
      <div className='textContainer'>
        <h2 className='title'>
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className='address'>
          <img src='/pin.png' alt='' />
          <span>{item.address}</span>
        </p>
        <p className='price'>$ {item.price}</p>
        <div className='bottom'>
          <div className='features'>
            <div className='feature'>
              <img src='/bed.png' alt='' />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className='feature'>
              <img src='/bath.png' alt='' />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className='icons'>
            <div className='icon'>
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: saved ? '#fece51' : 'white',
                }}
                disabled={loading} // Disable nút khi đang loading
              >
                {loading ? (
                  '' // Hiển thị chữ 'Saving...' khi đang loading
                ) : (
                  <img src='/save.png' alt='Save icon' /> // Hiển thị ảnh save icon khi không loading
                )}
              </button>
            </div>
            <div className='icon'>
              <button>
                <img src='/chat.png' alt='' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
