export const useTheme = () => {
  const colorMode = useState<'light' | 'dark'>('color-mode', () => 'light')

  const toggleTheme = () => {
    colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
    updateTheme()
  }

  const updateTheme = () => {
    if (import.meta.client) {
      if (colorMode.value === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('theme', colorMode.value)
    }
  }

  const initTheme = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
      if (saved) {
        colorMode.value = saved
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        colorMode.value = 'dark'
      }
      updateTheme()
    }
  }

  return {
    colorMode,
    toggleTheme,
    initTheme,
  }
}
