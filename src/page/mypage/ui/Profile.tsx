'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';

const Profile = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  return (
    <div
      className="relative h-[100px] w-[100px] cursor-pointer rounded-full bg-gray-200 md:absolute md:left-[10%] md:h-[120px] md:w-[120px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <label htmlFor="profile-upload" className="block h-full w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Profile"
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full">
            <Camera className="h-8 w-8 text-gray-400" />
          </div>
        )}
      </label>

      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default Profile;
