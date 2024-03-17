'use client'
import { useState } from 'react'

import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Typography,
  Toolbar,
} from '@mui/material'

import Image from 'next/image'

import MenuIcon from '@mui/icons-material/Menu'

import { NavDrawer } from './components/NavDrawer'

import { drawerWidth } from './utils/constants'

interface Props {
  children: React.ReactNode
}

export const ResponsiveDrawer: React.FC<Props> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const handleDrawerClose = () => {
    setIsClosing(true)
    setMobileOpen(false)
  }

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false)
  }

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            display: { sm: 'none' },
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar sx={{ display: 'flex' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Image alt="logo" height={40} src="/logo.svg" width={40} />
            <Typography variant="h6" noWrap component="div" ml={2}>
              Web Review Kit
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            <NavDrawer />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            <NavDrawer />
          </Drawer>
        </Box>
        <Box mt={8} mx={1} px={1} width="100%" minHeight="calc(100vh - 64px)">
          {children}
        </Box>
      </Box>
    </>
  )
}
