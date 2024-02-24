import ResponsiveDrawer from '@/app/components/ResponsiveDrawer/ResponsiveDrawer'
interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return <ResponsiveDrawer>{children}</ResponsiveDrawer>
}

export default Layout
