import App from 'App'
import { render, screen } from 'utils/test-utils'
import { describe, it } from 'vitest'

describe('App.tsx', () => {
  it('serial test', async () => {
    render(<App />)
    // userEvent.click(screen.getByText('로그인'))
    expect(screen.queryByText('반가워요')).not.toBeNull()
    expect(screen.queryByText('저는 이찬호입니다.')).not.toBeNull()
  })
})
