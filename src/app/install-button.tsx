'use client';

import { useEffect, useState } from 'react';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // 브라우저 기본 설치 프롬프트 방지
      e.preventDefault();
      // 이벤트 저장
      setDeferredPrompt(e);
      setIsInstallable(true);
    });
  }, []);

  async function installApp() {
    if (!deferredPrompt) return;

    // 설치 프롬프트 표시
    deferredPrompt.prompt();

    // 사용자 응답 대기
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`사용자 선택: ${outcome}`);

    // 프롬프트는 한 번만 사용 가능
    setDeferredPrompt(null);
    setIsInstallable(false);
  }

  if (!isInstallable) return null;

  return (
    <button
      onClick={installApp}
      className="rounded bg-green-500 px-4 py-2 text-white"
    >
      앱 설치하기
    </button>
  );
}
