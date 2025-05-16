import Image from 'next/image';
import { useState } from 'react';
import DefaultUserProfileImage from '@public/assets/icons/header/user.png';

interface ProfileImageProps {
  src: string | null;
  width?: number;
  height?: number;
  alt?: string;
  fill?: boolean;
}

export const ProfileImage = ({
  src,
  width,
  height,
  alt = 'user profile',
  fill = false,
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
          fill={fill}
        />
      ) : (
        <></>
      )}
    </>
  );
};
