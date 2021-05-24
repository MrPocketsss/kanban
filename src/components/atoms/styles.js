import { fade, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  actionMenuItem: {
    width: '20rem',
  },
  activityRow: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
    '&:hover': {
      backgroundColor:
        theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    },
  },
  button: {
    margin: '1rem 0',
  },
  colorPicker: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  divider: {
    border: 1,
    width: 'calc(100% - 0.4rem)',
    margin: '0.4rem',
  },
  inputText: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: '1em',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  menuBody: {
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.5rem',
    zIndex: 1,
  },
  menuIcon: {
    position: 'relative',
  },
  root: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  taskModalContent: {
    padding: '1rem',
    marginBottom: '2rem',
    backgroundColor:
      theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)',
  },
  taskModalDescription: {
    marginBottom: '4rem',
  },
}))
