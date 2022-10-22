import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Center, Table, Modal, Text, TextInput } from '@mantine/core';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { Container } from 'tabler-icons-react';

function Entries() {
    
  const nav = useNavigate()
  

    var len;
    const [opened , setOpened] = useState(false)
    const [data , setData] = useState([])

    useEffect(()=>{
      if(!localStorage.getItem('uid')){
        nav('/')
      }
        // console.log(data , len)
        if(data?.length != len){
            fetchData()
        }

        return ()=>{

        }
    },[])


    async function fetchData(forced = 0){
        if(data?.length == len && !forced){
            return
        }
        console.log('FETCHING in table...')
        
        await axios.post('https://user-item-backend.herokuapp.com/getItems' , {
            'userId' : localStorage.getItem('uid')
        }).then((res)=>{
          if(res.data.message == "No Records Found"){
            setData({
              'text' : 'Add entries to see here'
            })
          }
          else{
            setData(res.data?.itemsList); 
            len = res?.data.itemsList?.length  ;
            console.log(res);
          }
        }
      )
    }

    const addEntry = async () =>{
        const i = iref.current.value
        const q = qref.current.value
        console.log("SOMEONE CALLED ME " , i , q)
        await axios.post('https://user-item-backend.herokuapp.com/addItems' , {
            'userId' : localStorage.getItem('uid'),
            'itemId' : i,   
            'quantity' : Number(q)
        }).then((res)=>{
            console.log(res)
            fetchData(1)
            setOpened(false)
        }).catch((err)=>{console.error(err);})
 
        setOpened(false)
    }

    const rows = !(data?.text) ?  data?.map((element,index) => (
        <tr key={element.itemId + index}>
          <td><Text sx={{fontFamily : 'Merriweather' , fontWeight : '800'}} >{index+1}</Text></td>
          <td><Text sx={{fontFamily : 'Merriweather' , fontWeight : '800'}}>{element.itemId}</Text></td>
          <td><Text sx={{fontFamily : 'Merriweather' , fontWeight : '800'}}>{element.quantity}</Text></td>
        </tr>
      )) : null;


    const iref = useRef()
    const qref = useRef()

    return (
    <div >
        <Modal opened={opened} onClose={() => setOpened(false)}
                title="Automate Transaction">
            <TextInput label='Item Name' ref={iref}/>
            <TextInput label='Quantity' ref={qref}/>
            <Button  m='md'onClick={()=>{addEntry()}}>Add Entry</Button>
                
        </Modal>

        <Center>
            <Button m='md' color='green' onClick={()=>setOpened(!opened)}>Add Entry</Button>
        </Center>
        {(!data || data.length == 0) ?  <Text m={'xl'} style={{fontFamily : 'bitter'}} size='xl' weight={'600'} color='black'>Fetching Data...Please have patience</Text>
        
        : data.text ? <Text m={'xl'} style={{fontFamily : 'bitter'}} size='xl' weight={'600'} color='black'>{data.text}</Text> :
        <Center>
          <Table  p='sm' sx={{width : '95%'}}
          
                highlightOnHover withBorder withColumnBorders horizontalSpacing="sm" verticalSpacing="sm">
                  <thead>
                    <tr>
                      <th><Text weight={700} color='red'>Sr no.</Text></th>
                      <th><Text weight={700} color='red'>Item Name</Text></th>
                      <th><Text weight={700} color='red'>Quantity</Text></th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
          </Table>
          </Center> }
    </div>
  )
}

export default Entries