import { Avatar, Text, Group } from '@mantine/core'
import React from 'react'
import Logo from '../../components/utils/static/logoF.png'

function Left() {
  return (
    <Group m='md'>
        <Avatar radius='lg' sx={{
          fit : 'cover'
        }} src={Logo} alt='app logo'/>
        <Text size='xl' weight={800} color='#9bf6b3'>BCSM</Text>
    </Group>
  )
}

export default Left