import { useEffect, useState } from 'react';

function CloudinaryUploadWidget({ uwConfig, setAvatar }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    const scriptExists = document.getElementById('uw');
    if (!scriptExists) {
      // If script is not loaded, create and load the script
      const script = document.createElement('script');
      script.setAttribute('async', '');
      script.setAttribute('id', 'uw');
      script.src = 'https://upload-widget.cloudinary.com/global/all.js';
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);
    } else {
      // If already loaded, just set loaded to true
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      // Initialize Cloudinary upload widget when script is loaded
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === 'success') {
            const newImage = result.info.secure_url;

            // Check if the image already exists in the state to prevent duplicates
            setAvatar((prevImages) => {
              if (!prevImages.includes(newImage)) {
                return [...prevImages, newImage]; // Add image if it's not already in the array
              }
              return prevImages; // Do nothing if the image is already in the array
            });
          }
        }
      );

      document.getElementById('upload_widget').addEventListener('click', () => {
        myWidget.open(); // Open the widget when button is clicked
      });
    }
  }, [loaded, uwConfig, setAvatar]);

  return (
    <button id='upload_widget' className='cloudinary-button'>
      Upload
    </button>
  );
}

export default CloudinaryUploadWidget;
