import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
  // dark mode background
  background-color: ${({ theme }) => theme.background};

  // light mode background
  // background-color: #f5f5f5;

  // dark mode text
  color: ${({ theme }) => theme.text};

  // light mode text
  // color: #1e1e1e;
`
