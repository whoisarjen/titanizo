export const useTheme = () => {
  const colorMode = useState<'light' | 'dark'>('color-mode', () => 'dark')

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
      }
      // Default is already 'dark', so only need to update if saved was 'light'
      updateTheme()
    }
  }

  return {
    colorMode,
    toggleTheme,
    initTheme,
  }
}
