import { Button, Drawer, Modal, Text, TextInput, UnstyledButton } from '@mantine/core'
import React, { useRef, useState } from 'react'

function Auth() {
    
    const handleAuth = async () =>{
        // if(data == 1){
        //     await fetch('https://localhost:8080/getUser',
        //     method)
        // }
        // else{

        // }
    }


    const staticData = [ ['Already have an account ? ' ,  'Login'] ,
                        [ "Don't have account ? ", 'Register']]

    const [data , setData] = useState(0)

    const RG1 = useRef()
    const RG2 = useRef()
    const RG3 = useRef()
    const RG4 = useRef()

    const LG1 = useRef()
    const LG2 = useRef()



    return (
    <Modal title={data =='1' ? 'Login' : 'Register'} opened={1} size='auto'>
        { data == 1 ? <>
            <TextInput label="Email" ref={LG1} />
            <TextInput label="Password" ref={LG2} />
        </> 
        
        : <>
            <TextInput label="Name" ref={RG1}/>
            <TextInput label="Email" ref={RG2}/>
            <TextInput label="Password"  ref={RG3}/>
            <TextInput label="Confirm Password" ref={RG4}/>
        </>
        }


        <UnstyledButton onClick={()=>{
            setData(data == 0 ? 1 : 0) 
        }}> <Text my='md'size='sm' style={{display : 'inline'}}>{staticData[data][0]}<Text style={{display : 'inline'}}      color={'red'}>{staticData[data][1]}</Text> </Text>
        </UnstyledButton >
        
        <Button style={{display : 'block' , minWidth : '350px'}} onClick={()=>handleAuth}>
            {data =='1' ? 'Login' : 'Register'}
        </Button>

    </Modal>
    // <Button>CLICK ME</Button>
  )
}

export default Auth