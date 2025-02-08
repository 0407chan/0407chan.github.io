import AppBar from 'components/AppBar/AppBar'
import Dock from 'components/Dock/Dock'
import Vertical from 'components/Vertical'
import { IMAGES } from 'constants/image'
import { darkTheme, lightTheme } from 'constants/themes'
import { ModalProvider } from 'contexts/modal/ModalProvider'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { useDarkMode } from 'hooks/useDarkMode'
import { ThemeProvider } from 'styled-components'
import styles from './App.module.scss'

dayjs.locale('ko')

export default function App() {
  const { theme, themeToggler } = useDarkMode()

  return (
    <ModalProvider>
      <ThemeProvider theme={theme === 'LIGHT' ? lightTheme : darkTheme}>
        <div
          className={styles.app}
          style={{ backgroundImage: `url(${IMAGES.BACKGROUND.DEAD_SEA})` }}
        >
          <AppBar />
          <Vertical className={styles.content}> </Vertical>
          <Dock />
        </div>
      </ThemeProvider>
    </ModalProvider>
  )
}
