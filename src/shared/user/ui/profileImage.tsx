import Image from 'next/image';
import { useState } from 'react';
import DefaultUserProfileImage from '@/assets/icons/user.png';

interface ProfileImageProps {
  src: string | null;
  width: number;
  height: number;
  alt?: string;
}

export const ProfileImage = ({
  src,
  width,
  height,
  alt = 'user profile',
}: ProfileImageProps) => {
  const [hasError, setHasError] = useState(!src);

  return (
    <>
      {src ? (
        <Image
          src={hasError ? DefaultUserProfileImage.src : src}
          alt={alt}
          width={width}
          height={height}
          onError={() => {
            if (!hasError) {
              setHasError(true);
            }
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};
