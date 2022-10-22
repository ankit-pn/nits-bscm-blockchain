import { Avatar, Text, Group } from '@mantine/core'
import React from 'react'
import Logo from '../../components/utils/static/logoF.png'

function Left() {
  return (
    <Group m='md'>
        <Avatar radius='lg' sx={{
          fit : 'cover'
        }} src={Logo} alt='app logo'/>
        <Text color='#3BE21D'>BCSM</Text>
    </Group>
  )
}

export default Left