import Table from "./Table"
import AppHeader from "./AppHeader"
import Login from "./Login"
import Signup from "./Signup"
import { List, ListItem, Box, Drawer, Button, Container, Typography, Stack, Divider, Collapse, useMediaQuery, createTheme, CssBaseline} from "@mui/material";
import { useEffect, useState } from "react";
import "./styles/AppHeader.css"
import logo from "./styles/logo.jpeg"
import { ThemeProvider } from "@emotion/react";

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openLoginDrawer, setOpenLoginDrawer] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(false);

  const darkTheme = createTheme({
    breakpoints: {
      values: {
        xs: 10,
        sm: 10,
        md: 1595,
        lg: 2000,
        xl: 2000
      },
    },
    palette: {
      mode: "dark",
      background: {
        default: '#750B0D'
      }
    }
  });
  
  const lightTheme = createTheme({
    breakpoints: {
      values: {
        xs: 10,
        sm: 10,
        md: 1595,
        lg: 2000,
        xl: 2000
      },
    },
    palette: {
      mode: "light",
      background: {
        default: '#FFFFFF'
      }
    }
  });

  const theme = isDark ? darkTheme : lightTheme;
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [openLogo, setOpenLogo] = useState(true);
  const [openBox, setOpenBox] = useState(true);
  
  useEffect(() => {
    if (!isMdScreen) {
      setOpenLogo(false);
      setOpenBox(false);
    }
    else {
      setOpenLogo(true);
      setOpenBox(true);
    }
  }, [isMdScreen])

  const SettingsDrawer = () => (
    <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
      <List>
        <ListItem>
          <Button variant="outlined" color="error" sx={{left: 0, width: 175, top: 825}} onClick={() => {
            setIsDark(!isDark);
          }}>{isDark ? 'Light Mode' : 'Dark Mode'}</Button>
        </ListItem>
        <ListItem>
          <Button variant="outlined" color="error" sx={{left: 0, width: 175, top: 825}} onClick={() => {
            setOpenDrawer(false);
          }}>Cancel</Button>
        </ListItem>
      </List>
    </Box>
  );

  const LoginDrawer = () =>  {
    if (user != null && loggedIn) {
      console.log(user, 'drawer success?');
      return (
      <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
        <List>
          <ListItem>
            <Box sx={{ border: '1px solid grey', padding: 0.5, borderRadius: 1, width: 165 }}>
              <Divider orientation="horizontal" component="li" flexItem={true} sx={{display: "flex", justifyContent: "left"}}>
                <Typography style={{color: isDark ? 'white' : 'black'}}>
                  Account Info
                </Typography>
              </Divider>
            </Box>
          </ListItem>
          <ListItem>
            <Typography style={{color: isDark ? 'white' : 'black'}}>
              Username: { user.userName }
            </Typography>
          </ListItem>
          <ListItem>
            <Typography style={{color: isDark ? 'white' : 'black'}}>
              Name: {user.firstName + ' ' + user.lastName}
            </Typography>
          </ListItem>
          <ListItem>
            <Button variant="outlined" color="error" sx={{left:0, width: 175, top:750}} onClick={() => {
              setLoggedIn(false);
            }}>
              Sign Out
            </Button>
          </ListItem>
          <ListItem>
            <Button variant="outlined" color="error" sx={{left:0, width: 175, top: 650}} onClick={() => {
              setOpenLoginDrawer(false);
              console.log("cancel!");
            }}>Cancel</Button>
          </ListItem>
        </List>
      </Box>)
    }
    else {
      return (
        <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
          <List>+
          <ListItem>
            <Button variant="outlined">
              Log In
            </Button>
          </ListItem>
            <ListItem>
              <Button variant="outlined" onClick={() => {
                setOpenLoginDrawer(false);
                console.log("cancel!");
              }}>Cancel</Button>
            </ListItem>
          </List>
        </Box>)
    }
  }

  const Main = () => {
    if (loggedIn) {
      return ( <> 
        <Drawer open={openDrawer} anchor='right' PaperProps={{sx:{width: 200}}}>
          <SettingsDrawer/>
        </Drawer>
        <Drawer open={openLoginDrawer} anchor='right' PaperProps={{sx:{width: 200}}}>
          <LoginDrawer/>
        </Drawer>
        <AppHeader handleClick={setOpenDrawer} handleLoginClick={setOpenLoginDrawer}/>
        <Table firstName={user.firstName} lastName={user.lastName}/>
        </>);
    }
    else {
      return (
        <>
        <Collapse in={openBox}>
            <Box sx={{
              borderRadius: 0,
              width: 600,
              height: 1020,
              bgcolor: 'primary.main',
              backgroundColor: '#D84040'
          }}></Box>
        </Collapse>
        <Collapse in={openLogo}>
            <Box sx={{
              width: 500,
              height: 800,
              backgroundImage: `url(${logo})`,
              backgroundSize: 500,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'white',
              border: 10,
              borderColor: 'grey.500',
              zIndex: 1, 
              position: 'absolute',
              top: '200px',
              left: '125px'
          }}></Box>
        </Collapse>
          <Box id="homePage" sx={{ borderColor: 'primary.main'}}>
            <Stack direction="row" spacing={2} sx={{alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
              <Container component="main" maxWidth="xs">
                <Login setter={setUser} logger={setLoggedIn}/>
              </Container>
              <Divider orientation="vertical" component="li" flexItem={true}>
                <Typography style={{color: isDark ? 'white' : 'black'}}>
                  OR
                </Typography>
              </Divider>
              <Container component="main" maxWidth="xs">
                <Signup setter={setUser} logger={setLoggedIn}/>
              </Container>
            </Stack>
          </Box>
        </>
      );
    }
  }

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline/>
      <Main/>
    </ThemeProvider>
  )
}

export default App;