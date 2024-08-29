import React from 'react'

export const Merch = () => {
  return (
    <div className='merchpage flex justify-center'>
        <Carousel></Carousel>
    </div>
  )
}


const Carousel = () => {
    return (
        <div id="carouselExample" className="carousel slide w-3/4">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://picsum.photos/800/400?random=1" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://picsum.photos/800/400?random=2" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://picsum.photos/800/400?random=3" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
  };