'use client';

import { useEffect, useState } from 'react';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // localStorage에서 설치 상태 확인
    const checkIfInstalled = () => {
      const installed = localStorage.getItem('pwa-installed') === 'true';
      setIsInstalled(installed);

      // PWA로 실행 중인지 확인 (standalone 모드)
      const isStandalone = window.matchMedia(
        '(display-mode: standalone)'
      ).matches;
      const isIOSInstalled =
        'standalone' in window.navigator &&
        (window.navigator as any).standalone;

      // PWA로 실행 중이면 localStorage에 설치 상태 저장
      if (isStandalone || isIOSInstalled) {
        localStorage.setItem('pwa-installed', 'true');
        setIsInstalled(true);
      }
    };

    checkIfInstalled();

    // beforeinstallprompt 이벤트 리스너
    const handleBeforeInstallPrompt = (e: Event) => {
      // 브라우저 기본 설치 프롬프트 방지
      e.preventDefault();
      // 이벤트 저장
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // display-mode 변경 감지 (앱이 설치되고 실행될 때)
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        localStorage.setItem('pwa-installed', 'true');
        setIsInstalled(true);
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  async function installApp() {
    if (!deferredPrompt) return;

    // 설치 프롬프트 표시
    deferredPrompt.prompt();

    // 사용자 응답 대기
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`사용자 선택: ${outcome}`);

    // 사용자가 설치를 수락한 경우
    if (outcome === 'accepted') {
      localStorage.setItem('pwa-installed', 'true');
      setIsInstalled(true);
    }

    // 프롬프트는 한 번만 사용 가능
    setDeferredPrompt(null);
    setIsInstallable(false);
  }

  // iOS 사용자를 위한 수동 설치 안내
  function showIOSInstallInstructions() {
    alert(
      'iOS에서 설치하려면:\n1. Safari 브라우저의 공유 버튼을 탭하세요\n2. "홈 화면에 추가"를 선택하세요\n3. "추가"를 탭하세요'
    );
  }

  // iOS 기기 확인
  const isIOS = () => {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  // 이미 설치된 경우 메시지 표시
  if (isInstalled) {
    return null;
  }

  // iOS 기기인 경우 수동 설치 안내 버튼 표시
  if (isIOS()) {
    return (
      <button
        onClick={showIOSInstallInstructions}
        className="rounded-xl border bg-pointcolor-coral px-2 py-1 text-[0.7rem] text-white md:h-[2.5rem] md:w-[10rem] md:px-4 md:py-2 md:text-base"
      >
        iOS에 앱 설치하기
      </button>
    );
  }

  // 설치 가능한 경우에만 버튼 표시 (Android/데스크톱)
  if (!isInstallable) {
    return <div className="pr-1 text-sm text-gray-500">Not PWA Env </div>;
  }

  return (
    <button
      onClick={installApp}
      className="rounded-xl border bg-pointcolor-coral px-2 py-1 text-[0.7rem] text-white md:h-[2.5rem] md:w-[10rem] md:px-4 md:py-2 md:text-base"
    >
      앱 설치하기
    </button>
  );
}
