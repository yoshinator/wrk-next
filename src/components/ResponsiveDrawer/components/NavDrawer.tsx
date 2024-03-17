'use client'
import { Fragment, FC } from 'react'
import {
  Box,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { listItems } from '../utils/constants'

export const NavDrawer: FC = () => {
  const pathName = usePathname()
  return (
    <Box flex={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Image alt="logo" height={40} src="/logo.svg" width={40} />
        <Typography variant="h6" noWrap component="div">
          Web Review Kit
        </Typography>
      </Toolbar>
      <Box>
        <List
          sx={{
            height: 'calc(100vh - 64px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {listItems.map((item) => (
            <Fragment key={item.text}>
              <Link
                href={item.link}
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  marginTop: item.divider ? 'auto' : 0,
                }}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    component="span"
                    selected={pathName === item.link}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            </Fragment>
          ))}
        </List>
      </Box>
    </Box>
  )
}
