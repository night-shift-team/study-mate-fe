import { Metadata } from 'next';

const baseUrl = 'https://developer-dev.study-mate.academy';
export const pageMetadata = {
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
  } as Metadata,
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
  } as Metadata,
  rank: {
    applicationName: 'StudyMate',
    title: '랭킹',
    description:
      '문제를 얼마나 풀었는지, 얼마나 꾸준히 했는지 랭킹으로 확인해보세요.',
    openGraph: {
      siteName: '스터디메이트',
      title: '랭킹 - 함께 공부하는 동료들을 만나보세요',
      description:
        '같은 목표를 향해 가는 다른 개발자들의 학습 상황을 확인해보세요.',
      url: `${baseUrl}/rank`,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/assets/backgroundImages/trophy/goldTrophy.jpeg`,
          alt: '랭킹 페이지 이미지',
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/rank`,
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
  } as Metadata,
};
