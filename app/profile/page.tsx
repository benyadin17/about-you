'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import loveAnimation from '@/public/assets/love floating.json';

export default function ProfilePage() {
  const router = useRouter();
  const [likeAnim, setLikeAnim] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
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
      // next slide or navigate
      if (slideIndex < slides.length - 1) {
        setSlideIndex(slideIndex + 1);
        setLikeAnim(false);
      } else {
        router.push('/match');
      }
    }, 1000);
  };

  const slide = slides[slideIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden relative w-full max-w-sm">
        {slide.photo && (
          <div className="relative">
            <img src={slide.photo} alt={slide.name} className="w-full h-80 object-cover" />
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

        {likeAnim && (
          <div className="absolute inset-0">
            <Lottie animationData={loveAnimation} loop={false} className="w-full h-full" />
          </div>
        )}

        <div className="p-4 space-y-4">
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

          {slide.text && <p className="text-gray-700 text-lg">{slide.text}</p>}

          <div className="flex justify-center mt-4">
            <button
              onClick={handleLike}
              className="bg-yellow-500 text-white py-2 px-6 rounded-lg font-semibold"
            >
              Like
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
