self.addEventListener('install', (event) => {
  console.log('서비스 워커가 설치되었습니다.');
});

self.addEventListener('activate', (event) => {
  console.log('서비스 워커가 활성화되었습니다.');
});

self.addEventListener('fetch', (event) => {
  // 네트워크 요청 처리
});
