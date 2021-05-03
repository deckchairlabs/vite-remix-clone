import React from 'react'
import {
  defaultTheme,
  ThemeProvider,
  Preflight,
  x,
  createGlobalStyle,
} from '@xstyled/emotion'

const theme = {
  ...defaultTheme,
}

const GlobalStyle = createGlobalStyle`
  :root {
    --theme-color-primary: darkblue;
  }
`

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <Preflight />
      <GlobalStyle />
      <Layout>
        <Header>
          <Nav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/posts">Blog</NavLink>
          </Nav>
        </Header>
        <Content>{children}</Content>
        <Footer>My cool footer</Footer>
      </Layout>
    </ThemeProvider>
  )
}

function Nav(props: any) {
  return <x.nav display="flex" flexDirection="row" gap={2} {...props} />
}

function NavLink(props: any) {
  return (
    <x.a
      padding={{ _: 2, sm: 3 }}
      display="block"
      backgroundColor="var(--theme-color-primary, #333)"
      textDecoration="none"
      hoverBackgroundColor="#777"
      color="white"
      {...props}
    />
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <x.div display="flex" flexDirection="column" minHeight="100vh">
      {children}
    </x.div>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <x.main flex={1} padding={3}>
      {children}
    </x.main>
  )
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <x.header backgroundColor="#AAA" padding={{ _: 2, sm: 3 }}>
      {children}
    </x.header>
  )
}

function Footer({ children }: { children: React.ReactNode }) {
  return (
    <x.footer backgroundColor="#DDD" padding={3}>
      {children}
    </x.footer>
  )
}
