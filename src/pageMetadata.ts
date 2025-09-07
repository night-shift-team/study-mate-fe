import { Metadata } from 'next';

const baseUrl = 'https://developer-dev.study-mate.academy';
export const pageMetadata: Record<
  'home' | 'suggestion' | 'announcement' | 'login' | 'signup' | 'store',
  Metadata
> = {
  home: {
    applicationName: 'StudyMate',
    title: '스터디메이트',
    description:
      '스터디메이트는 개발자를 위한 문제 풀이 기반 학습 플랫폼입니다. CS 지식을 자연스럽게 익히고 개발 실력을 쌓아보세요. 푼 문제와 오답, 스크랩까지 나의 공부 이력도 함께 정리해보세요.',
    openGraph: {
      siteName: '스터디메이트',
      title: '스터디메이트 데브',
      description:
        '문제를 풀면서 자연스럽게 CS 기초를 익히고, 실무 감각도 함께 키워보세요. 푼 문제와 오답, 스크랩까지 나의 공부 이력도 함께 정리해보세요.',
      url: baseUrl,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/assets/backgroundImages/main/studyMate_logo.png`,
          alt: 'StudyMate 메인 페이지 이미지',
        },
      ],
    },
    alternates: {
      canonical: baseUrl,
    },
  },
  suggestion: {
    applicationName: 'StudyMate',
    title: '건의 사항',
    description:
      '스터디 메이트에 아이디어나 피드백이 있다면 자유롭게 남겨주세요.',
    openGraph: {
      siteName: '스터디메이트',
      title: '건의 사항',
      description:
        '더 나은 서비스를 위한 아이디어나 피드백이 있다면 자유롭게 남겨주세요.',
      url: `${baseUrl}/suggestion`,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/assets/icons/header/suggestion.png`,
          alt: '건의사항 페이지 이미지',
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/suggestion`,
    },
  },
  announcement: {
    applicationName: 'StudyMate',
    title: '공지 사항',
    description:
      '업데이트, 신규 기능, 이벤트 등 스터디메이트의 새로운 소식을 전해드립니다.',
    openGraph: {
      siteName: '스터디메이트',
      title: '공지 사항',
      description: 'StudyMate에 무슨 일이 일어나고 있는지 한눈에 확인하세요.',
      url: `${baseUrl}/announcement`,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/assets/backgroundImages/main/noticeFoxBg.svg`,
          alt: '공지 사항 페이지 이미지',
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/announcement`,
    },
  },
  login: {
    applicationName: 'StudyMate',
    title: '로그인',
    description:
      '스터디메이트에 오신 것을 환영합니다! 구글로그인 또는 이메일로 간편하게 로그인하세요.',
    openGraph: {
      siteName: '스터디메이트',
      title: '로그인',
      description:
        '스터디메이트에 오신 것을 환영합니다! 구글로그인 또는 이메일로 간편하게 로그인하세요!',
      url: `${baseUrl}/login`,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/assets/backgroundImages/main/studyMate_logo.png`,
          alt: 'StudyMate 로고',
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/login`,
    },
  },
  signup: {
    applicationName: 'StudyMate',
    title: '회원 가입',
    description:
      '스터디메이트에 오신 것을 환영합니다! 구글로그인 또는 이메일로 간편하게 회원가입하세요.',
    openGraph: {
      siteName: '스터디메이트',
      title: '회원 가입',
      description:
        '스터디메이트에 오신 것을 환영합니다! 구글로그인 또는 이메일로 간편하게 회원가입하세요!',
      url: `${baseUrl}/signup`,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/assets/backgroundImages/main/studyMate_logo.png`,
          alt: 'StudyMate 로고',
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/signup`,
    },
  },
  store: {
    applicationName: 'StudyMate',
    title: '상점',
    description:
      '스터디메이트 상점에서 다양한 아이템을 구매하고, 학습 동기부여를 높여보세요!',
    openGraph: {
      siteName: '스터디메이트',
      title: '상점',
      description:
        '스터디메이트 상점에서 다양한 아이템을 구매하고, 학습 동기부여를 높여보세요!',
      url: `${baseUrl}/store`,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/assets/backgroundImages/store/storePanel2.svg`,
          alt: 'StudyMate 상점 로고',
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/store`,
    },
  },
};
