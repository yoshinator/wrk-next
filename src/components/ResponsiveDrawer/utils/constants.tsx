import ContactsIcon from '@mui/icons-material/Contacts'
import CopyAll from '@mui/icons-material/CopyAll'
import MailIcon from '@mui/icons-material/Mail'
import EventRepeatIcon from '@mui/icons-material/EventRepeat'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import SettingsIcon from '@mui/icons-material/Settings'

export const drawerWidth = 240

export const listItems = [
  { text: 'Contacts', icon: <ContactsIcon />, link: '/dashboard/contacts' },
  { text: 'Templates', icon: <CopyAll />, link: '/dashboard/templates' },
  { text: 'Lists', icon: <MailIcon />, link: '/dashboard/lists' },
  {
    text: 'Auto Contact',
    icon: <EventRepeatIcon />,
    link: '/dashboard/auto-contact',
  },
  {
    text: 'Profile',
    icon: <AccountBoxIcon />,
    link: '/dashboard/profile',
    divider: true,
  },
  { text: 'Settings', icon: <SettingsIcon />, link: '/dashboard/settings' },
]
