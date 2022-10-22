import { Box, Button, Group, Text, UnstyledButton } from '@mantine/core'
import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { Logout ,Login } from 'tabler-icons-react';
function Right() {
    
    const navigate = useNavigate()
    
    const handelLogout = ()=>{
        if(localStorage.getItem('isLoggedIn')){
            localStorage.removeItem('isLoggedIn')
            localStorage.removeItem('uid')
            navigate(-1)

        }
    }

    const data = !localStorage.getItem('isLoggedIn') ?
        {'text' : 'Login' , 'route' : '/user/auth'}
        : {'text' : 'Logout' , 'route' : '/user/logout'} 
    // console.log(data)
    return (
    <Box ml='auto' mr={'md'}>
        
            <UnstyledButton component={Link} 
            mx={0}
            key={data.route} 
            to={data.route}
            sx={{'&:hover' : {
                zIndex : 2,
                zoom : '1.3'
            }}}
            
            onClick={()=>{handelLogout()}}>
                <Group spacing={0}>
                    <Text m={0} sx={{'fontFamily' : 'Kanit'  ,
                    //  '&:hover' : {fontSize : '1.4rem'}
            }}>{data.text}</Text>
                { data.text == 'Logout' ? <Logout m={0}
                strokeWidth={2}
                color={'black'} 
            /> : <Login m={0}
            strokeWidth={2}
            color={'black'} />}
                </Group>
            
        </UnstyledButton>
    </Box>
  )
}

export default Right