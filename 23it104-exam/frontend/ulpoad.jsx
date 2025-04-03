import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = ({ onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('tags', tags);
    formData.append('image', file);

    try {
      setUploading(true);
      setError('');
      
      await axios.post('http://localhost:5000/api/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setTitle('');
      setTags('');
      setFile(null);
      document.getElementById('file-input').value = '';
      setUploading(false);
      onUploadSuccess();
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image');
      setUploading(false);
    }
  };

  return (
    <div className="upload-form">
      <h2>Upload Image</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            placeholder="nature, landscape, animals"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="file-input">Select Image</label>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="upload-btn" 
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
    </div>
  );
};

export default ImageUploadForm;