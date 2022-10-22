import {  ActionIcon, UnstyledButton, Drawer, Group, MediaQuery, Button, Stack } from '@mantine/core'
import React, { useState } from 'react'
import Left from './Left'
import MainLinks from './MainLinks'
import Right from './Right'
import { LayoutNavbarExpand } from 'tabler-icons-react';
import {BrowserRouter as Router , Link } from 'react-router-dom';




function NavContainer() {
  const [opened ,setOpened] = useState()
  const [active , setActive] = useState(window.location.pathname)

  const data = [
    {'text' : 'Home' , 'route' : '/'},
    {'text' : 'Dummy' , 'route' : '/dummy'},
    {'text' : 'Dummy 2' , 'route' : '/dummy2'},
]
  
  return (
    <Group sx={{
      backgroundColor :'#2facd0'
    }}>
      <MediaQuery largerThan='sm' styles={{display : 'none'}}>
        <ActionIcon ml='sm' onClick={()=>setOpened(!opened)}><LayoutNavbarExpand
    size={28}
    strokeWidth={2}
    color={'white'}/>
        </ActionIcon>
      </MediaQuery>
      
    <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Navbar"
        padding="xl"
        size="md"
      >
      {/* <Router> */}
        <Stack>
        { data.map((ele) => { return (
            <UnstyledButton component={Link} key={`${ele.text}B`} to={ele.route} sx={{ '&:hover' : {
              fontSize : '1.2rem'
          }}}
          onClick = {()=> setActive(ele.route )}
          style = {
            active == ele.route ? {
                color : '#C63939'
            } : {}
        }
          >{ele.text}</UnstyledButton>
        )
    } )}
    </Stack>

    {/* </Router> */}

  </Drawer>
      <Left/>
      <MainLinks/>
      <Right/>
      
    </Group>
  )
}

export default NavContainer