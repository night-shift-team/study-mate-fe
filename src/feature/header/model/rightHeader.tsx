'use client';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { userStore } from '@/state/userStore';
import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';

const RightHeaderComponents = () => {
  const routePath = usePathname();
  const router = useRouter();

  const { setUser } = userStore();
  switch (routePath) {
    case RouteTo.AdminDashboard:
    case RouteTo.AdminManagementUser:
    case RouteTo.AdminManagementProblem:
      return (
        <Flex gapX={2}>
          <Button
            variant={'ghost'}
            rounded={'2xl'}
            paddingX={2}
            className="hover:bg-gray-100 active:cursor-grabbing"
            onClick={() => router.push(RouteTo.AdminDashboard)}
          >
            <Text fontSize={'sm'}>대시보드</Text>
          </Button>
          <Button
            variant={'ghost'}
            rounded={'2xl'}
            paddingX={2}
            className="px-[0.5rem] py-[0.2rem] hover:bg-gray-100 active:cursor-grabbing"
            onClick={() => {
              setUser(null);
              router.push(RouteTo.Home);
            }}
          >
            <Text fontSize={'sm'}>로그아웃</Text>
          </Button>
        </Flex>
      );
    case RouteTo.Solve:
      return (
        <>
          <button
            className="flex h-fit w-fit items-center justify-center rounded-2xl hover:bg-gray-100 active:cursor-grabbing"
            onClick={() => {
              setUser(null);
              router.push(RouteTo.Login);
            }}
          >
            로그아웃
          </button>
        </>
      );
    default:
      return <></>;
  }
};
export default RightHeaderComponents;
