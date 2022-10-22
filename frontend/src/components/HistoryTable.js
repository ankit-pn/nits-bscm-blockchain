import { Avatar, Center, Group, Table, Text, UnstyledButton } from '@mantine/core';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ExternalLink } from 'tabler-icons-react';

function HistoryTable() {
  
const [data ,setData] = useState(null)

  async function fetchHistory(){
    await axios.post('https://transaction-history.herokuapp.com/getHistory' , {
            'userId' : localStorage.getItem('uid'),
        }).then((res)=>{
            if(res.data.message  == "No Records Found"){
                setData({'text' : 'No Transaction History Found!!!'})
            }
            else{
                setData(res.data.historyList)
            }
        }
    )
  }

  const rows = data?.text ? null :  data?.map((ele,index)=>(
    <tr key={ele.transaction_hash}>
      <td><Text>{index+1}</Text></td>
      <td><Text weight={600}>{ele.itemId}</Text></td>
      <td><Text weight={600}>{ele.quantity}</Text></td>
      <td><Text weight={600}>{ele.price}</Text></td>
      <td><Text weight={600}>{ele.date}</Text></td>
      <td><UnstyledButton sx={{
        '&:hover' : {
            color : 'blue',
            textDecoration : 'underline'
        }
      }} onClick={()=>{window.open(`https://goerli.etherscan.io/tx/${ele.transaction_hash}` , '_blank')}}>{ele.transaction_hash}</UnstyledButton></td>
    </tr>   
))

  useEffect(()=>{
    fetchHistory()
  },[])
  
    return (
        <div>
        {!data ?  <Text m={'xl'} style={{fontFamily : 'bitter'}}  size='xl' weight={'600'} color='black'>Fetching Data...Please have patience</Text>:

        data.text ?<Text m={'xl'} style={{fontFamily : 'bitter'}}  size='xl' weight={'600'} color='black'>{data.text}</Text> :
            <Center>
            <Table   sx={{
                maxWidth:'97%'
            }}
                highlightOnHover withColumnBorders withBorder horizontalSpacing='md' verticalSpacing="md">
                    <thead>
                    <tr>
                        <th><Text weight={700} color='red'>Sr no.</Text></th>
                        <th><Text weight={700} color='red'>Item Name</Text></th>
                        <th><Text weight={700} color='red'>Quantity</Text></th>
                        <th><Text weight={700} color='red'>Price</Text></th>
                        <th><Text weight={700} color='red'>Date</Text></th>
                        <th><Group spacing='xs'><Text weight={700} style={{display : 'inline-block'}} color='#e64980'>Transaction Hash<ExternalLink mt='md' color='#2facd0' strokeWidth={1.5} style={{display : 'inline-block'}}/> </Text></Group></th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
            </Table></Center>}
    </div>
  )
}

export default HistoryTable