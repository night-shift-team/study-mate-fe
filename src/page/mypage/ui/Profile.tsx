'use client';

import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { userStore } from '@/state/userStore';
import axios from 'axios';
import Image from 'next/image';

const DEFAULT_PROFILE_IMG = '/default-profile.png';

const Profile = () => {
  const { user, setUser } = userStore();
  const [imageUrl, setImageUrl] = useState<string>(
    user?.profileImg || DEFAULT_PROFILE_IMG
  );
  const [isHovered, setIsHovered] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('profileImg', file);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      const updatedProfileImg = response.data?.profileImg;
      if (updatedProfileImg) {
        setImageUrl(updatedProfileImg);
        if (user) {
          setUser({
            ...user,
            profileImg: updatedProfileImg,
            userId: user.userId || '',
            loginType: user.loginType,
            loginId: user.loginId,
            nickname: user.nickname,
            status: user.status,
            role: user.role,
            registeredAt: user.registeredAt,
            userScore: user.userScore,
          });
        }
      }
    } catch (error) {
      console.error('프로필 이미지 업데이트 실패:', error);
    }
  };
  return (
    <div
      className="h-[15vh] w-[15vh] cursor-pointer rounded-full bg-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <label htmlFor="profile-upload" className="block h-full w-full">
        {imageUrl === 'default' ? (
          <div className="flex h-full w-full items-center justify-center rounded-full">
            <Camera className="h-8 w-8 text-gray-400" />
          </div>
        ) : (
          <Image
            src={imageUrl}
            alt="Profile"
            className="h-full w-full rounded-full object-cover"
            onError={() => setImageUrl(DEFAULT_PROFILE_IMG)}
          />
        )}
      </label>
      <p className="text-[1.5vh]">닉네임: {user?.nickname}</p>
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
