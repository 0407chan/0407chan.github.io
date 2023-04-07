import { Container } from 'App.style'
import DarkModeButton from 'components/DarkModeButton'
import Vertical from 'components/Vertical/Vertical'
import { darkTheme, lightTheme } from 'constants/themes'
import { useDarkMode } from 'hooks/useDarkMode'
import { ThemeProvider } from 'styled-components'

export default function App() {
  const { theme, themeToggler } = useDarkMode()

  return (
    <ThemeProvider theme={theme === 'LIGHT' ? lightTheme : darkTheme}>
      <Container>
        <Vertical style={{ alignItems: 'center' }}>
          <h1>반가워요</h1>
          <h1>저는 이찬호입니다.</h1>
          <DarkModeButton theme={theme} onThemeToggler={themeToggler} />
        </Vertical>
      </Container>
    </ThemeProvider>
  )
}
