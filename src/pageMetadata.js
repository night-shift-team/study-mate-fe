const baseUrl = 'https://developer-dev.study-mate.academy';
export const pageMetadata = {
  home: {
    title: 'StudyMate - 개발자를 위한 학습 플랫폼',
    description: '개발자를 위한 학습 플랫폼, StudyMate에 오신 것을 환영합니다.',
    openGraph: {
      title: 'StudyMate - 개발자를 위한 학습 플랫폼',
      description:
        '개발자를 위한 학습 플랫폼, StudyMate에 오신 것을 환영합니다.',
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
    title: '문제 풀기',
    description: '카테고리별 문제를 풀고 실력을 향상하세요.',
    openGraph: {
      title: '문제 풀기',
      description: '카레고리별 문제를 실시간으로 풀어보세요.',
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
    description: 'StudyMate에 대한 의견을 들려주세요.',
    openGraph: {
      title: '건의 사항',
      description: '서비스 개선을 위해 의견을 남겨주세요.',
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
    title: '랭킹',
    description: '실시간으로 사용자들의 순위를 확인하고 지표를 확인해 보세요.',
    openGraph: {
      title: '랭킹',
      description:
        '실시간으로 사용자들의 순위를 확인하고 지표를 확인해 보세요.',
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
  mypage: {
    title: '마이 페이지',
    description: '나의 학습 기록과 활동 현황을 확인하고 관리하세요.',
    openGraph: {
      title: '마이페이지',
      description: '나의 학습 기록과 활동 현황을 확인하고 관리하세요.',
      url: `${baseUrl}/mypage`,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/assets/icons/header/user.png`,
          alt: '마이 페이지 아이콘',
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/mypage`,
    },
  },
  store: {
    title: '상점',
    description: '아이템을 구매하여 학습을 계속하고 순위를 높여 보세요.',
    openGraph: {
      title: '상점',
      description: '아이템을 구매하여 학습을 계속하고 순위를 높여 보세요.',
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
    title: '공지 사항',
    description: 'StudyMate의 최신 소식을 확인하세요.',
    openGraph: {
      title: '공지 사항',
      description: 'StudyMate의 최신 소식을 확인하세요.',
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
