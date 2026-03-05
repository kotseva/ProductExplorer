export const Colors = {
  primary: '#f20d80',
  white: '#ffffff',

  light: {
    background: '#F1F5F9',
    surface: '#ffffff',
    text: '#0f172a',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    headerBorder: 'rgba(242, 13, 128, 0.1)',
    skeleton: '#e2e8f0',
    favoriteButton: 'rgba(255, 255, 255, 0.8)',
    favoriteDefault: '#94a3b8',
    imagePlaceholder: '#f1f5f9',
  },

  dark: {
    background: '#221019',
    surface: '#2f1b25',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    border: '#334155',
    headerBorder: 'rgba(242, 13, 128, 0.2)',
    skeleton: '#1e293b',
    favoriteButton: 'rgba(0, 0, 0, 0.5)',
    favoriteDefault: '#94a3b8',
    imagePlaceholder: '#1e293b',
  },
} as const;

export type ThemeColors = (typeof Colors)['light'] | (typeof Colors)['dark'];
