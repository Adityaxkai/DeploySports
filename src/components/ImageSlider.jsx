import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import "./ImageSlider.css";
import AdmissionForm from '../pages/AdmissionForm'

export const ImageSlider = () => {
  const navigate=useNavigate();
  const slides = [
    { 
      src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", 
      alt: "Badminton court action" 
    },
    { 
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", 
      alt: "Badminton training session" 
    },
    { 
      src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", 
      alt: "Badminton tournament" 
    },
    { 
      src: "assets/images/img21.jpg", 
      alt: "Badminton court action" 
    },
    { 
      src: "assets/images/img22.jpg", 
      alt: "Badminton court action" 
    },
    { 
      src: "assets/images/img23.jpg", 
      alt: "Badminton court action" 
    },
  ];
    const OverlayContent=()=>(
        <div className="overlay">
            <div className="content-wrapper">
              <img 
                className="logo" 
                src="assets/Picture2.png" 
                alt="Bijoy Institute Logo" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x200/2c3e50/ffffff?text=Bijoy+Institute';
                  e.target.alt = 'Bijoy Institute Logo';
                }}
              />
              <h1>Bijoy Institute</h1>
                  <p>
                    Empowering champions since 1938, Bijoy Institute stands at the forefront of badminton excellence. 
                    For over eighty years, our commitment to world-class coaching and athlete development has shaped 
                    future stars and inspired a legacy of sporting achievement at both national and international levels.
                  </p>
                  <button className="cta-button" onClick={()=>navigate('/admission')}>Join Our Academy</button>
            </div>
          </div>

    );

  return (
    <div className="slider-wrapper">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        className="image-control"
      >
        {slides.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="slider-slide">
              <img 
                src={img.src} 
                alt={img.alt}  
                className="slider-image py-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
                  e.target.alt = 'Badminton court action';
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
        <OverlayContent/>
          </div>
  );
};
