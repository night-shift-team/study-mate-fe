'use client';

import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { userStore } from '@/state/userStore';
import axios from 'axios';

const Profile = () => {
  const { user, setUser } = userStore();
  const [imageUrl, setImageUrl] = useState<string>(user?.profileImg || '');
  const [isHovered, setIsHovered] = useState(false);

  console.log(user);
  console.log(imageUrl);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.error('파일이 선택되지 않았습니다.');
      return;
    }

    const url = URL.createObjectURL(file);
    setImageUrl(url);

    if (setUser) {
      setUser({
        ...user,
        profileImg: url,
      });
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.data?.imageUrl) {
        const uploadedUrl = response.data.imageUrl;

        if (setUser) {
          setUser({
            ...user,
            profileImg: uploadedUrl,
          });
        }
        setImageUrl(uploadedUrl);
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  return (
    <>
      <div
        className="h-[15vh] w-[15vh] cursor-pointer rounded-full bg-gray-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <label htmlFor="profile-upload" className="block h-full w-full">
          {imageUrl.startsWith('blob:') ? (
            <img
              src={imageUrl}
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full">
              <Camera className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </label>
        <p className="text-[1.5vh]">닉네임 : {user?.nickname}</p>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </>
  );
};

export default Profile;
