import { getRoutePath } from '@/shared/model/getRoutePath';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect } from 'react';

export const useAddAuthListener = (
  setIsAuthSucess: Dispatch<SetStateAction<boolean>>
) => {
  const router = useRouter();
  useEffect(() => {
    let lazyLink: number | NodeJS.Timeout | undefined;
    const messageListener = (event: MessageEvent<any>) => {
      if (event.origin !== window.location.origin) return;

      const { authData } = event.data;
      if (!authData) return;
      console.log('Received authentication code:', authData);
      // 여기서 code를 사용하여 추가적인 처리를 수행합니다.
      setIsAuthSucess(true);
      lazyLink = setTimeout(() => {
        setIsAuthSucess(false);
        router.push('/solveproblem');
      }, 1500);
    };
    window.addEventListener('message', messageListener);
    return () => {
      removeEventListener('message', messageListener);
      clearTimeout(lazyLink);
    };
  }, []);
};
