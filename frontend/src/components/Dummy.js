import { Button, Center, Grid, Image, Text, Title } from '@mantine/core'
import React from 'react'
import Img1 from '../components/utils/static/home1.png'

import { Icon } from '@iconify/react';



function Dummy() {
  console.log(`${window.innerHeight - 70}`)
  return (
    <div>
      <Center>
       <Title m='md' sx={{
        fontFamily : 'bitter'
      }}>BSCM - BlockChain Based SupplyChain Management System</Title>
      </Center>
      <Text m='md' weight={600} sx={{
        fontFamily : 'bitter'
      }}>
      In this decentralised Dapp , user can register and
And upload the items with their quantity that they want to have, if item is
available in the marketplace then user will get required notification/email to receive
and purchase that item. User need to approve all transactions before they are completed. All purchase are done in ethereum blockchain and
managed through Metamask Wallet , so having metamask extension installed is a must.
      </Text>
      {!window.ethereum && <Button onClick={()=>window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en' , '_blank')} rightIcon={<Icon inline={true} icon="logos:metamask-icon" />} m = 'md' color='green'><Text color='black'> Install Metamask Now</Text></Button>}
      <Grid>
        <Grid.Col span={6}>
      <Image
        src={Img1}
        ml='md'
        alt="Features image"
      />
      </Grid.Col>
      <Grid.Col span={6}>
        <Text m='md'>
          <Text sx={{fontFamily : 'bitter' , fontWeight : '600'}}>
            User SignUp functioanlity with the help of ethereum blockchain.<hr/>
          </Text>
          <Text sx={{fontFamily : 'bitter' , fontWeight : '600'}}>
          All account are registerd in ethereum blockchain ( in goerli testnet), and there authentication is handled with the help of smart contract which is deployed in blockchain itself.<hr/>
          </Text>
          <Text sx={{fontFamily : 'bitter' , fontWeight : '600'}}>
          Users can add required items with itemName with their respective quantity<hr/>
          </Text>
          <Text sx={{fontFamily : 'bitter' , fontWeight : '600'}}>
          User can connect their account to ethereum blockchain (via MetaMask) network with the help of connect account button<hr/>
          </Text>
          <Text sx={{fontFamily : 'bitter' , fontWeight : '600'}}>
          If item is available then it automatically go into pending list, where user can approve the transaction.<hr/>          </Text>
          <Text sx={{fontFamily : 'bitter' , fontWeight : '600'}}>
          User can see transaction history of account.<hr/>          </Text>

      </Text>
      </Grid.Col>
      </Grid>
    </div>
  )
}

export default Dummy

