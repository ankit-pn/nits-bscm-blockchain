import { Box, Button, Group, UnstyledButton } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'

function Right() {
    
    const isLoggedin = true

    const data = isLoggedin ?
        {'text' : 'Login' , 'route' : '/user/auth'}
        : {'text' : 'Logout' , 'route' : '/user/logout'} 
    // console.log(data)
    return (
    <Box ml='auto' mr={'md'}>
        <Group>
            <UnstyledButton component={Link} 
            key={data.route} 
            to={data.route}
            sx={{ '&:hover' : {
                fontSize : '1.3rem'
            },fontWeight : '500'}}>{data.text}</UnstyledButton>
        </Group>
    </Box>
  )
}

export default Right