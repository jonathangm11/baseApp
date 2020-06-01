import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles, Drawer, AppBar, CssBaseline, Toolbar, Grid, Avatar, Badge } from '@material-ui/core';
import Header from '../header';
import SideMenu from '../sideBarMenu'
import Content from '../content';
import Footer from '../footer';
import './index.scss';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#49166d"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#49166d",
    color: "white",
    '& a': { color: 'white' },
    '& .sidebar-item:hover': {
      backgroundColor: 'purple',
    }
  },
  largeAvatarContainer:{
    marginTop: '25%',
    margin: 'auto',
    display:'table'
  },
  largeAvatar:{    
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: 'auto'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Header />
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <Grid container direction="column" spacing={5}>
              <Grid style={{ minHeight: "230px" }} item xs={12}>                
                  <Badge badgeContent={4} overlap="circle" color="primary" className={classes.largeAvatarContainer}>
                    <Avatar alt="Jonathan Guardado" className={classes.largeAvatar} />
                  </Badge>        
               
              </Grid>
              <Grid style={{ minHeight: "730px" }} item xs={12}>
                <SideMenu />
              </Grid>
              <Grid item xs={12}>
                <div className="footer-logo" >Company Logo</div>
              </Grid>
            </Grid>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          <Grid container direction="column" spacing={5}>
            <Grid style={{ minHeight: "900px" }} item xs={12}>
              <Content />
            </Grid>
            <Grid item xs={12}>
              <Footer />
            </Grid>
          </Grid>
        </main>
      </Router>
    </div>
  );
}