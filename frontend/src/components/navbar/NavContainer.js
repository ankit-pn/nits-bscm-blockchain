import {  ActionIcon, UnstyledButton, Drawer, Group, MediaQuery, Button, Stack } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import Left from './Left'
import MainLinks from './MainLinks'
import Right from './Right'
import { LayoutNavbarExpand } from 'tabler-icons-react';
import {BrowserRouter as Router , Link } from 'react-router-dom';




function NavContainer() {
  const [opened ,setOpened] = useState()
  const [active , setActive] = useState(window.location.pathname)

  const data = localStorage.getItem('uid') ?  [
    {'text' : 'Home' , 'route' : '/'},
    {'text' : 'Entries' , 'route' : '/db'},
    {'text' : 'Transactions' , 'route' : '/txn'},
  ] : [{'text' : 'Home' , 'route' : '/'},]
  
  useEffect(()=>{

  },[localStorage.getItem('uid')])

  return (
    <div>
    <Group sx={{
      backgroundColor :'#006e39',
      position : 'sticky' ,top: 0
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
    </div>
  )
}

export default NavContainer