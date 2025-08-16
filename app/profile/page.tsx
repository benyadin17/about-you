'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import loveAnimation from '@/public/assets/love floating.json';

export default function ProfilePage() {
  const router = useRouter();
  const [likeAnim, setLikeAnim] = useState(false);
  const [dislikeAnim, setDislikeAnim] = useState(false);
  const swiperRef = useRef<any>(null);

  const slides = [
    {
      name: 'Alex Johnson',
      age: 28,
      pronouns: 'He/Him',
      photo: '/profile-photo.jpg',
      hobbies: 'Loves hiking • Coffee addict',
      info: [
        { title: 'My ideal Sunday', text: 'Sunrise hike followed by brunch at a cozy local spot.' },
        { title: 'Best concert ever', text: 'Coldplay live under the stars.' },
        { title: 'Extra info', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { title: 'Extra info 2', text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { title: 'Extra info 3', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.' },
      ],
    },
    {
      name: 'Text Slide',
      text: 'Sudah banyak profile yg kutemui. Kadang aku like, kadang aku skip. Sisanya menunggu keajaiban..',
    },
  ];

  const handleLike = () => {
    setLikeAnim(true);
    setTimeout(() => {
      setLikeAnim(false);
      if (swiperRef.current && swiperRef.current.activeIndex < slides.length - 1) {
        swiperRef.current.slideNext();
      } else {
        router.push('/match');
      }
    }, 800);
  };

  const handleDislike = () => {
    setDislikeAnim(true);
    setTimeout(() => {
      setDislikeAnim(false);
      if (swiperRef.current && swiperRef.current.activeIndex < slides.length - 1) {
        swiperRef.current.slideNext();
      } else {
        router.push('/match');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards]}
        className="w-full max-w-sm h-[85vh] mx-auto"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        touchEventsTarget="container"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white shadow-md overflow-hidden w-full h-full mx-2 my-2 flex flex-col rounded-3xl relative">
              {/* Slide 1 scrollable */}
              {index === 0 ? (
                <div className="flex-1 overflow-y-auto">
                  {/* Foto */}
                  {slide.photo && (
                    <div className="relative flex-shrink-0 h-80">
                      <img src={slide.photo} alt={slide.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                          {slide.age}
                        </span>
                        <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                          {slide.pronouns}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Konten */}
                  <div className="p-4 flex flex-col space-y-4">
                    {slide.name && (
                      <>
                        <h1 className="text-2xl font-semibold">{slide.name}</h1>
                        <p className="text-sm text-gray-500">{slide.hobbies}</p>
                      </>
                    )}

                    {slide.info &&
                      slide.info.map((item, i) => (
                        <div key={i} className="bg-gray-50 p-3 rounded-lg">
                          <strong className="text-sm">{item.title}</strong>
                          <p className="text-sm text-gray-700">{item.text}</p>
                        </div>
                      ))}

                    {/* Tombol */}
                    <div className="flex justify-center mt-2 space-x-2">
                      <button
                        onClick={handleDislike}
                        className="bg-red-500 text-white py-2 px-6 rounded-lg font-semibold"
                      >
                        X
                      </button>
                      <button
                        onClick={handleLike}
                        className="bg-yellow-500 text-white py-2 px-6 rounded-lg font-semibold"
                      >
                        Like
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Slide 2 tanpa scroll
                <div className="flex-1 flex flex-col justify-between p-4">
                  {slide.text && (
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-gray-700 text-lg text-center">{slide.text}</p>
                    </div>
                  )}
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={handleLike}
                      className="bg-yellow-500 text-white py-2 px-6 rounded-lg font-semibold"
                    >
                      Like
                    </button>
                  </div>
                </div>
              )}

              {/* Like animation */}
              {likeAnim && (
                <div className="absolute inset-0 z-10">
                  <Lottie animationData={loveAnimation} loop={false} className="w-full h-full" />
                </div>
              )}

              {/* Dislike X overlay sederhana */}
              {dislikeAnim && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-red-500 bg-opacity-30">
                  <span className="text-white text-6xl font-bold">X</span>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
