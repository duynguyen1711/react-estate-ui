import { useState } from 'react';
import CloudinaryUploadWidget from '../../components/uploadWiget/CloudiaryUploadWidget';
import './newPostPage.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';

const NewPostPage = () => {
  const uwConfig = {
    cloudName: 'duy1711',
    uploadPreset: 'estate',
    multiple: true,
    maxImageFileSize: 2000000,
    folder: 'posts',
  };
  var navigate = useNavigate();
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    const coordinate = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${inputs.address},${inputs.city}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          return [data[0].lat, data[0].lon]; // Trả về tọa độ nếu tìm thấy
        } else {
          throw new Error('No coordinates found for the given address.');
        }
      })
      .catch((error) => {
        console.error('Error fetching coordinates:', error);
        return null; // Xử lý khi có lỗi và trả về null
      });

    console.log(coordinate); // In ra tọa độ hoặc null nếu lỗi

    const payload = {
      title: inputs.title,
      price: parseInt(inputs.price) || 0,
      images: images, // Giả sử `images` là một mảng chứa URL của hình ảnh
      address: inputs.address,
      city: inputs.city,
      bedroom: parseInt(inputs.bedroom),
      bathroom: parseInt(inputs.bathroom),
      latitude: coordinate[0],
      longitude: coordinate[1],
      type: inputs.type === 'rent' ? 0 : 1, // Chuyển "rent" -> 0, "buy" -> 1
      property:
        inputs.property === 'apartment'
          ? 0
          : inputs.property === 'house'
          ? 1
          : inputs.property === 'condo'
          ? 2
          : inputs.property === 'land'
          ? 3
          : 0, // Chuyển các giá trị "apartment", "house", v.v. thành số tương ứng
      postDetail: {
        description: value, // Giả sử `value` chứa mô tả bài đăng
        utilities: inputs.utilities,
        petPolicy: inputs.pet,
        incomeRequirement: inputs.income,
        size: parseInt(inputs.size),
        nearbySchools: parseInt(inputs.school),
        nearbyBusStops: parseInt(inputs.bus),
        nearbyRestaurants: parseInt(inputs.restaurant),
      },
    };
    console.log(payload);
    try {
      const res = await apiRequest.post('/posts', payload);
      console.log(res);
      if (res.data.status == 'success') {
        navigate('/profile');
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        // Handle generic error when response is undefined
        setError('An error occurred while submitting the post.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='newPostPage'>
      <div className='formContainer'>
        <h1>Add New Post</h1>
        <div className='wrapper'>
          <form onSubmit={handleSubmit}>
            <div className='item'>
              <label htmlFor='title'>Title</label>
              <input id='title' name='title' type='text' />
            </div>
            <div className='item'>
              <label htmlFor='price'>Price</label>
              <input id='price' name='price' type='number' />
            </div>
            <div className='item'>
              <label htmlFor='address'>Address</label>
              <input id='address' name='address' type='text' />
            </div>
            <div className='item description'>
              <label htmlFor='desc'>Description</label>
              <ReactQuill theme='snow' onChange={setValue} value={value} />
            </div>
            <div className='item'>
              <label htmlFor='city'>City</label>
              <input id='city' name='city' type='text' />
            </div>
            <div className='item'>
              <label htmlFor='bedroom'>Bedroom Number</label>
              <input min={1} id='bedroom' name='bedroom' type='number' />
            </div>
            <div className='item'>
              <label htmlFor='bathroom'>Bathroom Number</label>
              <input min={1} id='bathroom' name='bathroom' type='number' />
            </div>
            <div className='item'>
              <label htmlFor='type'>Type</label>
              <select name='type'>
                <option value='rent' defaultChecked>
                  Rent
                </option>
                <option value='buy'>Buy</option>
              </select>
            </div>
            <div className='item'>
              <label htmlFor='type'>Property</label>
              <select name='property'>
                <option value='apartment'>Apartment</option>
                <option value='house'>House</option>
                <option value='condo'>Condo</option>
                <option value='land'>Land</option>
              </select>
            </div>
            <div className='item'>
              <label htmlFor='utilities'>Utilities Policy</label>
              <select name='utilities'>
                <option value='owner'>Owner is responsible</option>
                <option value='tenant'>Tenant is responsible</option>
                <option value='shared'>Shared</option>
              </select>
            </div>
            <div className='item'>
              <label htmlFor='pet'>Pet Policy</label>
              <select name='pet'>
                <option value='allowed'>Allowed</option>
                <option value='not-allowed'>Not Allowed</option>
              </select>
            </div>
            <div className='item'>
              <label htmlFor='income'>Income Policy</label>
              <input
                id='income'
                name='income'
                type='text'
                placeholder='Income Policy'
              />
            </div>
            <div className='item'>
              <label htmlFor='size'>Total Size (sqft)</label>
              <input min={0} id='size' name='size' type='number' />
            </div>
            <div className='item'>
              <label htmlFor='school'>School</label>
              <input min={0} id='school' name='school' type='number' />
            </div>
            <div className='item'>
              <label htmlFor='bus'>bus</label>
              <input min={0} id='bus' name='bus' type='number' />
            </div>
            <div className='item'>
              <label htmlFor='restaurant'>Restaurant</label>
              <input min={0} id='restaurant' name='restaurant' type='number' />
            </div>
            <button disabled={isLoading} className='sendButton'>
              Add
            </button>

            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      <div className='sideContainer'>
        <div className='imgZone'>
          {images.map((image, index) => (
            <img src={image} key={index} alt='' />
          ))}
        </div>

        <CloudinaryUploadWidget uwConfig={uwConfig} setAvatar={setImages} />
      </div>
    </div>
  );
};

export default NewPostPage;
