import React, { useState, useEffect } from 'react';
import '../styles/components.css';

const ImageSlider = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback gradients if no images are provided
  const placeholders = [
    { id: 1, color: 'linear-gradient(135deg, var(--burgundy), var(--indigo))', title: 'Empowering Excellence' },
    { id: 2, color: 'linear-gradient(135deg, var(--indigo), var(--brass))', title: 'Future Leaders' },
    { id: 3, color: 'linear-gradient(135deg, var(--brass), var(--burgundy))', title: 'Innovation & Growth' }
  ];

  const slides = images.length > 0 ? images : placeholders;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="image-slider">
      <div 
        className="slide-container" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id || index} className="slide">
            {slide.url ? (
              <img src={slide.url} alt={slide.title} />
            ) : (
              <div className="placeholder-slide" style={{ background: slide.color }}>
                <h2>{slide.title}</h2>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="slider-controls">
        <button className="slider-btn prev" onClick={() => setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)}>❮</button>
        <div className="slider-dots">
          {slides.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
        <button className="slider-btn next" onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}>❯</button>
      </div>
    </div>
  );
};

export default ImageSlider;
