import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 240

export const useStyles = makeStyles((theme) => ({
  deleteButton: {
    marginLeft: '1rem',
    fontSize: '1.2rem',
  },
  divider: {
    border: 1,
    width: 'calc(100% - 0.4rem)',
    margin: '0.4rem',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  hide: {
    display: 'none',
  },
  menuList: {
    padding: 0,
  },
  projectMenu: {
    padding: '0.5rem',
  },
  projectMenuIcon: {
    position: 'relative',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  taskModalContent: {
    padding: '1rem',
    marginBottom: '2rem',
    backgroundColor:
      theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)',
  },
}))
