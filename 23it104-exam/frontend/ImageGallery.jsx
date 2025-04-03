import React from 'react';

const ImageGallery = ({ images, onDelete }) => {
  if (images.length === 0) {
    return <div className="no-images">No images found</div>;
  }

  return (
    <div className="image-gallery">
      {images.map((image) => (
        <div key={image._id} className="image-card">
          <img 
            src={image.imageUrl} 
            alt={image.title} 
            className="gallery-image" 
          />
          
          <div className="image-info">
            <h3>{image.title}</h3>
            <div className="image-tags">
              {image.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <button 
              className="delete-btn" 
              onClick={() => onDelete(image._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;