import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { userStore } from '@/shared/state/userStore/model';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useRightHeader = () => {
  const routePath = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const setUser = userStore.getState().setUser;

  useEffect(() => {
    const accessTokenWatcher = (e: StorageEvent) => {
      if (e.key === 'accessToken' && e.newValue === null) {
        setUser(null);
        router.push(RouteTo.Home);
      }
    };
    window.addEventListener('storage', accessTokenWatcher);
    return () => window.removeEventListener('storage', accessTokenWatcher);
  }, []);
  return {
    routePath,
    isOpen,
    setIsOpen,
    router,
    setUser,
  };
};
export default useRightHeader;
