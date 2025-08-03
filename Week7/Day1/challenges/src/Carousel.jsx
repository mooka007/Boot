import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import img1 from "./assets/HK.jpg"
import img2 from "./assets/JN.webp"
import img3 from "./assets/LV.webp"
import img4 from "./assets/MC.webp"

const CarouselPage = () => {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Carousel>
                <div>
                    <img src={img1} alt="Slide 1" />
                    <p className="legend">Hong Kong</p>
                </div>
                <div>
                    <img src={img2} alt="Slide 2" />
                    <p className="legend">Macao</p>
                </div>
                <div>
                    <img src={img3} alt="Slide 3" />
                    <p className="legend">Japan</p>
                </div>
                <div>
                    <img src={img4} alt="Slide 4" />
                    <p className="legend">Las Vegas</p>
                </div>
            </Carousel>
        </div>
    );
};

export default CarouselPage;