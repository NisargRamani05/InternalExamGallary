// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGallery from './components/ImageGallery';
import ImageUploadForm from './components/ImageUploadForm';
import TagFilter from './components/TagFilter';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchImages();
    fetchTags();
  }, [selectedTag]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const url = selectedTag 
        ? `${API_URL}/images?tag=${selectedTag}`
        : `${API_URL}/images`;
      
      const response = await axios.get(url);
      setImages(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get(`${API_URL}/images/tags`);
      setTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleUploadSuccess = () => {
    fetchImages();
    fetchTags();
  };

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
  };

  const handleDeleteImage = async (id) => {
    try {
      await axios.delete(`${API_URL}/images/${id}`);
      fetchImages();
      fetchTags();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Image Gallery</h1>
      </header>
      
      <main className="app-main">
        <div className="upload-container">
          <ImageUploadForm onUploadSuccess={handleUploadSuccess} />
        </div>
        
        <div className="filter-container">
          <TagFilter 
            tags={tags} 
            selectedTag={selectedTag} 
            onSelectTag={handleTagSelect} 
          />
        </div>
        
        {loading ? (
          <div className="loading">Loading images...</div>
        ) : (
          <ImageGallery images={images} onDelete={handleDeleteImage} />
        )}
      </main>
    </div>
  );
}

export default App;