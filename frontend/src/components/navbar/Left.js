import { Avatar, Text, Group } from '@mantine/core'
import React from 'react'

function Left() {
  return (
    <Group m='md'>
        <Avatar mx={0} src={null} alt='app logo'/>
        <Text color='#3BE21D'>APP NAME</Text>
    </Group>
  )
}

export default Left