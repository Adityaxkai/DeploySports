import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause, FaExpand, FaCompress, FaThumbsUp } from 'react-icons/fa';
import './Gallery.css';

export const Gallery = () => {
    const [mouseDownAt, setMouseDownAt] = useState(0);
    const [prevPercentage, setPrevPercentage] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [loadedImages, setLoadedImages] = useState(0);
    const [imageErrors, setImageErrors] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showThumbnails, setShowThumbnails] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const trackRef = useRef(null);
    const isDraggingRef = useRef(false);
    const lastTimeRef = useRef(0);
    const containerRef = useRef(null);

    const images = [
        { src: 'assets/images/gallery1.jpg', alt: 'Established', category: 'History', title: 'Club Foundation', description: 'The beginning of our legacy in 1938' },
        { src: 'assets/images/gallery2.jpg', alt: 'Established', category: 'History', title: 'Early Years', description: 'Building the foundation of excellence' },
        { src: 'assets/images/gallery3.jpg', alt: 'Established', category: 'History', title: 'Legacy Building', description: 'Creating champions through dedication' },
        { src: 'assets/images/gallery4.jpg', alt: 'Award Ceremony', category: 'Achievements', title: 'Championship Victory', description: 'Celebrating our triumphs' },
        { src: 'assets/images/gallery5.jpg', alt: 'Established', category: 'History', title: 'Milestone Celebration', description: 'Marking significant achievements' },
        { src: 'assets/images/gallery6.jpg', alt: 'Established', category: 'History', title: 'Historical Moment', description: 'Preserving our rich heritage' },
        { src: 'assets/images/gallery7.jpg', alt: 'Training Session', category: 'Training', title: 'Professional Coaching', description: 'Expert guidance for success' },
        { src: 'assets/images/gallery8.jpg', alt: 'Tournament Action', category: 'Events', title: 'Tournament Action', description: 'High-intensity competitive play' },
        { src: 'assets/images/gallery9.jpg', alt: 'Coaching Workshop', category: 'Training', title: 'Skill Development', description: 'Enhancing player capabilities' },
        { src: 'assets/images/gallery10.jpg', alt: 'Alumni meet', category: 'Community', title: 'Alumni Gathering', description: 'Connecting past and present' },
        { src: 'assets/images/gallery11.jpg', alt: 'Alumni meet', category: 'Community', title: 'Community Event', description: 'Building strong relationships' },
        { src: 'assets/images/gallery12.jpg', alt: 'Alumni meet', category: 'Community', title: 'Member Meetup', description: 'Fostering camaraderie' },
        { src: 'assets/images/gallery13.jpg', alt: 'Achievements', category: 'Achievements', title: 'Trophy Collection', description: 'Displaying our accomplishments' },
        { src: 'assets/images/gallery14.jpg', alt: 'Achievements', category: 'Achievements', title: 'Medal Ceremony', description: 'Honoring our champions' },
        { src: 'assets/images/gallery15.jpg', alt: 'Achievements', category: 'Achievements', title: 'Success Celebration', description: 'Rejoicing in victory' },
        { src: 'assets/images/gallery16.jpg', alt: 'Team Practice', category: 'Training', title: 'Team Training', description: 'Building cohesive units' },
        { src: 'assets/images/gallery17.jpg', alt: 'Championship Match', category: 'Events', title: 'Championship Match', description: 'Peak competitive moments' },
        { src: 'assets/images/gallery18.jpg', alt: 'Junior Players', category: 'Training', title: 'Junior Development', description: 'Nurturing young talent' },
        { src: 'assets/images/img21.jpg', alt: 'Facility Tour', category: 'Facilities', title: 'World-Class Facilities', description: 'State-of-the-art infrastructure' },
        { src: 'assets/images/img22.jpg', alt: 'Guest Coach', category: 'Training', title: 'Expert Coaching', description: 'Learning from the best' },
        { src: 'assets/images/img23.jpg', alt: 'Equipment Showcase', category: 'Facilities', title: 'Premium Equipment', description: 'Professional-grade gear' },
        { src: 'assets/images/img24.jpg', alt: 'Summer Camp', category: 'Events', title: 'Summer Training Camp', description: 'Intensive skill development' },
    ];

    const categories = ['All', 'History', 'Achievements', 'Training', 'Events', 'Community', 'Facilities'];

    const filteredImages = selectedCategory === 'All' 
        ? images 
        : images.filter(img => img.category === selectedCategory);

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle image loading
    const handleImageLoad = useCallback(() => {
        setLoadedImages(prev => prev + 1);
    }, []);

    // Handle image errors
    const handleImageError = useCallback((src) => {
        setImageErrors(prev => prev + 1);
    }, []);

    // Navigation functions
    const goToImage = useCallback((index) => {
        if (index < 0 || index >= filteredImages.length) return;
        
        const newPercentage = index * -100;
        setPercentage(newPercentage);
        setPrevPercentage(newPercentage);
        setCurrentImageIndex(index);
        
        if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${newPercentage}%)`;
        }
    }, [filteredImages.length]);

    const nextImage = useCallback(() => {
        goToImage(currentImageIndex + 1);
    }, [currentImageIndex, goToImage]);

    const prevImage = useCallback(() => {
        goToImage(currentImageIndex - 1);
    }, [currentImageIndex, goToImage]);

    // Toggle auto-play
    const toggleAutoPlay = useCallback(() => {
        setIsAutoPlaying(prev => !prev);
    }, []);

    // Toggle thumbnails
    const toggleThumbnails = useCallback(() => {
        setShowThumbnails(prev => !prev);
    }, []);

    // Reset to first image when category changes
    useEffect(() => {
        setCurrentImageIndex(0);
        setPercentage(0);
        setPrevPercentage(0);
        if (trackRef.current) {
            trackRef.current.style.transform = 'translateX(0%)';
        }
    }, [selectedCategory]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false);
            } else if (e.key === ' ') {
                e.preventDefault();
                toggleAutoPlay();
            } else if (e.key === 't' || e.key === 'T') {
                toggleThumbnails();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [prevImage, nextImage, isFullscreen, toggleAutoPlay, toggleThumbnails]);

    // Auto-advance gallery
    useEffect(() => {
        if (isDraggingRef.current || !isAutoPlaying) return;
        
        const interval = setInterval(() => {
            if (currentImageIndex < filteredImages.length - 1) {
                nextImage();
            } else {
                goToImage(0);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentImageIndex, filteredImages.length, nextImage, goToImage, isAutoPlaying]);

    const handleStart = useCallback((clientX) => {
        isDraggingRef.current = true;
        setMouseDownAt(clientX);
        if (trackRef.current) {
            trackRef.current.style.transition = 'none';
        }
    }, []);
    
    const handleEnd = useCallback(() => {
        isDraggingRef.current = false;
        setMouseDownAt(0);
        setPrevPercentage(percentage);
        
        const imageIndex = Math.round(Math.abs(percentage) / 100);
        const clampedIndex = Math.max(0, Math.min(imageIndex, filteredImages.length - 1));
        setCurrentImageIndex(clampedIndex);
        
        // Snap to the nearest image
        const snapPercentage = clampedIndex * -100;
        setPercentage(snapPercentage);
        
        if (trackRef.current) {
            trackRef.current.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            trackRef.current.style.transform = `translateX(${snapPercentage}%)`;
        }
    }, [percentage, filteredImages.length]);
    
    const handleMove = useCallback((clientX) => {
        if (!isDraggingRef.current) return;

        const now = performance.now();
        if (now - lastTimeRef.current < 16) return;
        lastTimeRef.current = now;

        const mouseDelta = mouseDownAt - clientX;
        const maxDelta = window.innerWidth / 2;
        const newPercentage = (mouseDelta / maxDelta) * -100;
        let nextPercentage = prevPercentage + newPercentage;

        // Limit to the range of images
        const maxPercentage = (filteredImages.length - 1) * -100;
        nextPercentage = Math.min(nextPercentage, 0);
        nextPercentage = Math.max(nextPercentage, maxPercentage);

        setPercentage(nextPercentage);

        if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${nextPercentage}%)`;
        }
    }, [mouseDownAt, prevPercentage, filteredImages.length]);

    // Mouse event handlers
    const handleMouseDown = useCallback((e) => handleStart(e.clientX), [handleStart]);
    const handleMouseMove = useCallback((e) => handleMove(e.clientX), [handleMove]);
    const handleMouseUp = useCallback(() => handleEnd(), [handleEnd]);

    // Touch event handlers
    const handleTouchStart = useCallback((e) => handleStart(e.touches[0].clientX), [handleStart]);
    const handleTouchMove = useCallback((e) => handleMove(e.touches[0].clientX), [handleMove]);
    const handleTouchEnd = useCallback(() => handleEnd(), [handleEnd]);

    // Event listeners
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener("mousedown", handleMouseDown);
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseup", handleMouseUp);
        container.addEventListener("touchstart", handleTouchStart);
        container.addEventListener("touchmove", handleTouchMove);
        container.addEventListener("touchend", handleTouchEnd);

        return () => {
            container.removeEventListener("mousedown", handleMouseDown);
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseup", handleMouseUp);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
            container.removeEventListener("touchend", handleTouchEnd);
        };
    }, [handleMouseDown, handleMouseMove, handleMouseUp, handleTouchStart, handleTouchMove, handleTouchEnd]);

    return (
        <section className="gallery-section">
            <div className="gallery-container">
                {/* Gallery Header */}
                <div className="gallery-header">
                    <h2 className="section-title">Gallery</h2>
                    <p className="section-subtitle">Capturing moments of excellence and achievement</p>
                </div>

                {/* Category Filter */}
                <div className="gallery-filters">
                    <div className="filter-buttons">
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Gallery Display */}
                <div className="gallery-display">
                    {/* Main Gallery */}
                    <div className="main-gallery">
                <div className="imgBody" ref={containerRef}>
                    <div id="image-track" ref={trackRef}>
                                {filteredImages.map((image, index) => (
                                    <div key={index} className="image-container">
                            <img
                                src={image.src}
                                alt={image.alt}
                                loading="lazy"
                                draggable="false"
                                className="image"
                                            onLoad={handleImageLoad}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/400x300/f0f0f0/999999?text=Image+Not+Found';
                                                e.target.alt = 'Image not available';
                                                handleImageError(image.src);
                                            }}
                                        />
                                        <div className="image-overlay">
                                            <div className="overlay-content">
                                                <h3 className="image-title">{image.title}</h3>
                                                <p className="image-description">{image.description}</p>
                                                <span className="image-category">{image.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Navigation Controls */}
                            <div className="gallery-controls">
                                <button 
                                    className="gallery-btn control-btn" 
                                    onClick={prevImage}
                                    disabled={currentImageIndex === 0}
                                    aria-label="Previous image"
                                >
                                    <FaChevronLeft />
                                </button>
                                <button 
                                    className="gallery-btn control-btn" 
                                    onClick={nextImage}
                                    disabled={currentImageIndex === filteredImages.length - 1}
                                    aria-label="Next image"
                                >
                                    <FaChevronRight />
                                </button>
                            </div>

                            {/* Control Panel */}
                            <div className="gallery-control-panel">
                                <button 
                                    className="control-panel-btn auto-btn"
                                    onClick={toggleAutoPlay}
                                    aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
                                >
                                    {isAutoPlaying ? <FaPause /> : <FaPlay />}
                                </button>
                                <button 
                                    className="control-panel-btn thumbnails-btn"
                                    onClick={toggleThumbnails}
                                    aria-label={showThumbnails ? 'Hide thumbnails' : 'Show thumbnails'}
                                >
                                    <FaThumbsUp />
                                </button>
                            </div>
                        </div>
                        
                        {/* Navigation Dots */}
                        <div className="gallery-nav">
                            {filteredImages.map((_, index) => (
                                <button
                                    key={index}
                                    className={`gallery-dot ${index === currentImageIndex ? 'active' : ''}`}
                                    onClick={() => goToImage(index)}
                                    aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                        </div>
                    </div>

                    {/* Thumbnails Panel */}
                    {showThumbnails && (
                        <div className="thumbnails-panel">
                            <div className="thumbnails-container">
                                {filteredImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`thumbnail-item ${index === currentImageIndex ? 'active' : ''}`}
                                        onClick={() => goToImage(index)}
                                    >
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/100x75/f0f0f0/999999?text=Image';
                                            }}
                                        />
                                        <div className="thumbnail-overlay">
                                            <span className="thumbnail-title">{image.title}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Image Info */}
                    <div className="image-info">
                        <div className="info-content">
                            <h3 className="current-image-title">{filteredImages[currentImageIndex]?.title}</h3>
                            <p className="current-image-description">{filteredImages[currentImageIndex]?.description}</p>
                            <div className="info-details">
                                <span className="image-category-badge">{filteredImages[currentImageIndex]?.category}</span>
                                <span className="image-counter">{currentImageIndex + 1} of {filteredImages.length}</span>
                            </div>
                        </div>
                        {loadedImages > 0 && (
                            <div className="loading-status">
                                <span>Loaded: {loadedImages}/{filteredImages.length}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};