export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index of correct answer
  explanation: string;
}

export const csQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: '프로세스(Process)와 스레드(Thread)의 주요 차이점은 무엇인가?',
    options: [
      '프로세스는 멀티태스킹을 지원하지 않고, 스레드는 지원한다',
      '프로세스는 독립된 메모리 공간을 가지고, 스레드는 메모리 공간을 공유한다',
      '프로세스는 운영체제에서만 실행되고, 스레드는 어플리케이션에서만 실행된다',
      '프로세스는 단일 작업만 가능하고, 스레드는 다중 작업이 가능하다',
    ],
    correctAnswer: 1,
    explanation:
      '프로세스는 독립된 메모리 공간을 할당받아 실행되는 프로그램의 인스턴스이며, 스레드는 프로세스 내에서 실행되는 작업 단위로 같은 프로세스 내의 스레드들은 메모리 공간을 공유합니다.',
  },
  {
    id: 2,
    question: 'TCP/IP 프로토콜에서 3-way handshake가 수행되는 목적은?',
    options: [
      '데이터 암호화를 위해',
      '네트워크 대역폭을 측정하기 위해',
      '신뢰성 있는 연결을 설정하기 위해',
      'IP 주소를 할당하기 위해',
    ],
    correctAnswer: 2,
    explanation:
      '3-way handshake는 TCP 연결을 설정할 때 신뢰성 있는 연결을 보장하기 위해 사용되는 프로세스입니다. SYN, SYN-ACK, ACK 단계를 거쳐 양쪽 호스트가 서로를 확인합니다.',
  },
  {
    id: 3,
    question: '다음 중 REST API의 특징이 아닌 것은?',
    options: [
      'Stateless(무상태성)',
      'Cacheable(캐시 가능)',
      'Session-based(세션 기반)',
      'Uniform Interface(인터페이스 일관성)',
    ],
    correctAnswer: 2,
    explanation:
      'REST API는 Stateless를 특징으로 하며, 각 요청이 독립적으로 처리됩니다. 세션 기반은 REST의 특징이 아닙니다.',
  },
  {
    id: 4,
    question: '시간 복잡도가 O(n log n)인 정렬 알고리즘은?',
    options: [
      '버블 정렬(Bubble Sort)',
      '삽입 정렬(Insertion Sort)',
      '퀵 정렬(Quick Sort)',
      '선택 정렬(Selection Sort)',
    ],
    correctAnswer: 2,
    explanation:
      '퀵 정렬은 평균적으로 O(n log n)의 시간 복잡도를 가지며, 분할 정복 방식을 사용하는 효율적인 정렬 알고리즘입니다.',
  },
  {
    id: 5,
    question: '다음 중 관계형 데이터베이스(RDBMS)의 특징이 아닌 것은?',
    options: [
      '데이터는 테이블 형태로 저장된다',
      'SQL을 사용하여 데이터를 조작한다',
      '스키마가 유동적이다',
      'ACID 특성을 보장한다',
    ],
    correctAnswer: 2,
    explanation:
      '관계형 데이터베이스는 고정된 스키마를 사용합니다. 스키마가 유동적인 것은 NoSQL 데이터베이스의 특징입니다.',
  },
  {
    id: 6,
    question:
      '다음 중 객체지향 프로그래밍의 4가지 주요 특징에 포함되지 않는 것은?',
    options: [
      '상속성(Inheritance)',
      '동시성(Concurrency)',
      '캡슐화(Encapsulation)',
      '다형성(Polymorphism)',
    ],
    correctAnswer: 1,
    explanation:
      '객체지향 프로그래밍의 4가지 주요 특징은 캡슐화, 상속성, 다형성, 추상화(Abstraction)입니다. 동시성은 객체지향의 주요 특징이 아닙니다.',
  },
  {
    id: 7,
    question: 'HTTP 상태 코드 403이 의미하는 것은?',
    options: [
      '요청한 리소스를 찾을 수 없음',
      '서버 내부 오류',
      '접근이 금지됨',
      '잘못된 요청',
    ],
    correctAnswer: 2,
    explanation:
      'HTTP 403 Forbidden은 서버가 요청을 이해했지만 승인을 거부했다는 것을 의미합니다. 주로 권한이 없는 리소스에 접근할 때 발생합니다.',
  },
  {
    id: 8,
    question: '다음 중 메모리 관리 기법의 페이지 교체 알고리즘이 아닌 것은?',
    options: [
      'LRU (Least Recently Used)',
      'FIFO (First In First Out)',
      'LIFO (Last In First Out)',
      'OPT (Optimal Page Replacement)',
    ],
    correctAnswer: 2,
    explanation:
      'LIFO는 페이지 교체 알고리즘이 아닙니다. 일반적인 페이지 교체 알고리즘으로는 LRU, FIFO, OPT, LFU 등이 있습니다.',
  },
];
