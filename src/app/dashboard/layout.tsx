import { ResponsiveDrawer } from '@/components/ResponsiveDrawer'
import { userInit } from '@/data-access/User'
interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  userInit()
  return <ResponsiveDrawer>{children}</ResponsiveDrawer>
}

export default Layout
