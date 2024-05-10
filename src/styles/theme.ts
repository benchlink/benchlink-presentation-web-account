type Screen = 'mobile' | 'tablet' | 'laptop' | 'desktop';
export const breakPoints: Record<Screen, string> = {
  mobile: '400px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1280px',
};

export const themeColor = {
  white: '#ffffff',
  black: '#1F2024',
  blue: '#3269FF',
  red: '#ED394B',
  gray: {
    surface1: '#F7F8FA',
    surface2: '#F0F2F5',
    stroke: '#DCDFE3',
    placeholer: '#C3C5C9',
    subText: '#8B8D94',
    pageControl: '#666C77',
    backDrop: '#67676A',
    setting: '#B3B3B3',
  },
  pointColor: {
    100: '#ECFDA3',
    200: '#D9FE51',
  },
} as const;

const theme = {
  width: breakPoints,
  minWidth: breakPoints,
  maxWidth: breakPoints,
  minHeight: breakPoints,
  maxHeight: breakPoints,
  screens: breakPoints,
} as const;

export default theme;
