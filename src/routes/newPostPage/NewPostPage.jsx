import { useState } from 'react';
import CloudinaryUploadWidget from '../../components/uploadWiget/CloudiaryUploadWidget';
import './newPostPage.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NewPostPage = () => {
  const uwConfig = {
    cloudName: 'duy1711',
    uploadPreset: 'estate',
    multiple: true,
    maxImageFileSize: 2000000,
    folder: 'posts',
  };
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const handleCreate = () => {};

  return (
    <div className='newPostPage'>
      <div className='formContainer'>
        <h1>Add New Post</h1>
        <div className='wrapper'>
          <form>
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
              <label htmlFor='latitude'>Latitude</label>
              <input id='latitude' name='latitude' type='text' />
            </div>
            <div className='item'>
              <label htmlFor='longitude'>Longitude</label>
              <input id='longitude' name='longitude' type='text' />
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
            <button className='sendButton' onClick={handleCreate}>
              Add
            </button>
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