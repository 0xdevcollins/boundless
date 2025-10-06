export interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

export const mockComments: Comment[] = [
  {
    id: '1',
    author: {
      name: 'User',
      avatar: '/user-icon.png',
    },
    content:
      'I think this project has a lot of potential 🚀 The idea of bringing blockchain into healthcare for transparency is brilliant 💡',
    timestamp: '2h',
    likes: 5,
    replies: [
      {
        id: '1-1',
        author: {
          name: 'User',
          avatar: '/user-icon.png',
        },
        content:
          'I think this project has a lot of potential 🚀 The idea of bringing blockchain into healthcare for transparency is brilliant 💡',
        timestamp: '2h',
        likes: 5,
      },
      {
        id: '1-2',
        author: {
          name: 'User',
          avatar: '/user-icon.png',
        },
        content:
          'I think this project has a lot of potential 🚀 The idea of bringing blockchain into healthcare for transparency is brilliant 💡',
        timestamp: '2h',
        likes: 5,
      },
      {
        id: '1-3',
        author: {
          name: 'User',
          avatar: '/user-icon.png',
        },
        content:
          'I think this project has a lot of potential 🚀 The idea of bringing blockchain into healthcare for transparency is brilliant 💡',
        timestamp: '2h',
        likes: 5,
      },
      {
        id: '1-4',
        author: {
          name: 'User',
          avatar: '/user-icon.png',
        },
        content:
          'I think this project has a lot of potential 🚀 The idea of bringing blockchain into healthcare for transparency is brilliant 💡',
        timestamp: '2h',
        likes: 5,
      },
      {
        id: '1-5',
        author: {
          name: 'User',
          avatar: '/user-icon.png',
        },
        content:
          'I think this project has a lot of potential 🚀 The idea of bringing blockchain into healthcare for transparency is brilliant 💡',
        timestamp: '2h',
        likes: 5,
      },
    ],
  },
  {
    id: '2',
    author: {
      name: 'User',
      avatar: '/user-icon.png',
    },
    content:
      'I think this project has a lot of potential 🚀 The idea of bringing blockchain into healthcare for transparency is brilliant 💡',
    timestamp: '2h',
    likes: 5,
  },
  {
    id: '3',
    author: {
      name: 'User',
      avatar: '/user-icon.png',
    },
    content:
      'I think this project has a lot of potential 🚀 The idea of bringing blockchain into healthcare for transparency is brilliant 💡',
    timestamp: '2h',
    likes: 5,
  },
];
