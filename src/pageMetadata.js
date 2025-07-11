const baseUrl = 'https://developer-dev.study-mate.academy';

export const pageMetadata = {
  home: {
    title: 'StudyMate - 개발자를 위한 문제풀이 플랫폼',
    description:
      'StudyMate는 개발자를 위한 문제 풀이 기반 학습 플랫폼입니다. 네트워크, 운영체제, 데이터베이스, 알고리즘 같은 CS 기초를 자연스럽게 익히고 실력을 쌓아보세요. 푼 문제와 오답, 스크랩까지 나의 공부 이력도 함께 정리해보세요.',
    openGraph: {
      title: 'StudyMate - 개발자를 위한 문제풀이 플랫폼',
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
  },
  solve: {
    title: '문제 풀기 - 카테고리별 실전 연습',
    description:
      'Network, OS, DB, 알고리즘 문제를 직접 풀어보며 실력을 쌓아보세요.',
    openGraph: {
      title: '문제 풀기',
      description:
        '카테고리별 실전 문제를 풀며 면접 대비와 기본기 점검을 동시에!',
      url: `${baseUrl}/solve`,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/assets/backgroundImages/main/noticeBg.svg`,
          alt: '문제 풀기 페이지 대표 이미지',
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/solve`,
    },
  },
  suggestion: {
    title: '건의 사항',
    description:
      '더 나은 서비스를 위한 아이디어나 피드백이 있다면 자유롭게 남겨주세요.',
    openGraph: {
      title: '건의 사항',
      description: '작은 의견도 StudyMate에게는 큰 힘이 됩니다.',
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
  rank: {
    title: '랭킹 - 다른 개발자들과 함께 성장해보세요',
    description:
      '문제를 얼마나 풀었는지, 얼마나 꾸준히 했는지 랭킹으로 확인해보세요.',
    openGraph: {
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
  store: {
    title: '상점 - 학습을 더 즐겁게!',
    description: '아이템을 사용하여 학습을 더 진행하고 순위를 올려 보세요!',
    openGraph: {
      title: 'StudyMate 상점',
      description: '아이템을 사용하여 학습을 더 진행하고 순위를 올려 보세요!',
      url: `${baseUrl}/store`,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/assets/backgroundImages/store/storePanel2.svg`,
          alt: '상점 페이지 이미지',
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/store`,
    },
  },
  announcement: {
    title: '공지 사항 - 새로운 기능과 소식을 확인하세요',
    description:
      '업데이트, 신규 기능, 이벤트 등 StudyMate의 새로운 소식을 전해드립니다.',
    openGraph: {
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
};
