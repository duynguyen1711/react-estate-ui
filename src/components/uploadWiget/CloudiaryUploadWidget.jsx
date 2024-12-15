import { useEffect, useState } from 'react';

function CloudinaryUploadWidget({ uwConfig, setAvatar }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Kiểm tra nếu script đã tồn tại
    const scriptExists = document.getElementById('uw');
    if (!scriptExists) {
      // Nếu script chưa tồn tại, tạo và thêm vào
      const script = document.createElement('script');
      script.setAttribute('async', '');
      script.setAttribute('id', 'uw');
      script.src = 'https://upload-widget.cloudinary.com/global/all.js';
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);
    } else {
      // Nếu script đã tồn tại, set loaded là true
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    let myWidget;

    if (loaded) {
      // Khởi tạo widget khi script đã tải
      myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === 'success') {
            const newImage = result.info.secure_url;

            // Kiểm tra trùng lặp và thêm ảnh mới vào state
            setAvatar((prevImages) => {
              if (!prevImages.includes(newImage)) {
                return [...prevImages, newImage];
              }
              return prevImages;
            });
          }
        }
      );

      const uploadButton = document.getElementById('upload_widget');

      // Gắn sự kiện vào nút
      const handleClick = () => myWidget.open();
      uploadButton.addEventListener('click', handleClick);

      // Cleanup để loại bỏ sự kiện khi component unmount hoặc re-render
      return () => {
        uploadButton.removeEventListener('click', handleClick);
      };
    }
  }, [loaded, uwConfig, setAvatar]);

  return (
    <button id='upload_widget' className='cloudinary-button'>
      Upload
    </button>
  );
}

export default CloudinaryUploadWidget;
