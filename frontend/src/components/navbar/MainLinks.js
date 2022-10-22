import { Anchor, Button, UnstyledButton, Group, Text, Drawer, MediaQuery } from '@mantine/core'
import { useState } from 'react';
import {BrowserRouter as Router , Link } from 'react-router-dom';



function MainLinks() {
    
    const data = localStorage.getItem('uid') ?  [
        {'text' : 'Home' , 'route' : '/'},
        {'text' : 'Entries' , 'route' : '/db'},
        {'text' : 'Transactions' , 'route' : '/txn'},
    ] : [ {'text' : 'Home' , 'route' : '/'},]
   const [active , setActive] = useState(window.location.pathname)
    // console.log(active)

//     return (
//     <Container>
//         <Group>
//             <Router>
//             {data.map((ele)=><NavLink onClick = {() =>{console.log(ele.text)}} key={ele.text} 
//                             to={ele.route} 
//                             style={{
//                                 textDecoration : 'none',
//                             }}
//                             >
                
                
//                 <Text sx={{
//                 '&:hover': {
//                     cursor: 'pointer',
//                     zIndex : 2,
//                     fontSize : '1.6rem'
                
//                 }
//             }} style = {
//                   ele.route == window.location.pathname ? {textDecoration : 'underline'} : {}
//             } onClick = {() =>{console.log(ele.text)}}>
//                 {ele.text}
//                 </Text>
//                 </NavLink>)}
//             </Router>
//         </Group>  
//     </Container>
//   )

return (
    <Group>
        
    {/* <Router> */}
        
    { data.map((ele) => { return (
        <MediaQuery smallerThan='sm' styles={{display : 'none'}} key={ele.route}>
        <UnstyledButton m={0} p = {0} component={Link} sx={{ fontWeight : '700',
         'fontFamily' : 'Josefin Sans' ,
            '&:hover' : {
            fontSize : '1.3rem'
        }}}  key={ele.text} to={ele.route}
        style = {
            active == ele.route ? {
                textDecoration : 'underline',
                textUnderlineOffset : '10px',
                textDecorationThickness : '5px',
                color : '#C63939'
            } : {}
        }
        onClick = {()=> setActive(ele.route)}
        >
            {ele.text}
        </UnstyledButton>
        </MediaQuery>
        )
    } )}
    
    {/* </Router> */}
    
    </Group>
  );
}

export default MainLinks