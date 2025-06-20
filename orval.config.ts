import { defineConfig } from 'orval';

export default defineConfig({
  myApi: {
    input: {
      target: 'https://api-dev.study-mate.academy/api/v1/v3/api-docs',
      filters: {
        mode: 'exclude',
        tags: ['Question History API'], // 해당 태그가 달린 endpoint 제외
      },
    },
    output: {
      schemas: './src/shared/api/autoGenerateTypes', // 타입(모델) 파일 위치
    },
  },
});
