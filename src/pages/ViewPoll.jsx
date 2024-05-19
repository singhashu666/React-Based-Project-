import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ViewPoll() {
  const viewPollData=useSelector((state)=>state.viewPoll.data.data);
  const navigate=useNavigate();
  const handleClick=()=>{
       navigate("/user");
  }
  return (
    <Box sx={{background:"#C2D4D9 ",height:"100vh",width:"100vw",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Button
              variant="contained"
              sx={{ top:'10px',left:"10px", fontWeight: "bold", background: "#7897a0",":hover":{background:"#517a85"},position:"absolute"}}
              onClick={handleClick}
            >
              Go Back
            </Button>
            <Card
              sx={{
                width: { lg: "49%", sm: "49%", md: "49%", xs: "95%" },
                borderRadius: 5,
                marginTop: {lg:3,md:3,sm:2,xs:1.5},
                pt: 2,
                border:"1px solid #aca9a9",
                background:"#ebeff0",
                height: "280px",
                "&:hover": {
                  boxShadow: "5px 5px 5px grey",
                },
              }}
            >
                <CardContent sx={{height:"90%"}}>
                  <Typography variant='h6' sx={{fontWeight:"bold",fontSize:"20px"}}>{viewPollData.title}</Typography>
                 {
                  viewPollData.options.map((data)=>(
                    <Box sx={{display:"flex",justifyContent:"space-between",mt:2}}><Typography sx={{fontSize:'17px'}}> {data.option}</Typography><Typography>{data.vote}</Typography></Box>   
                  ))
                 }
                  <Box>
                  </Box>
                </CardContent>
            </Card>
    </Box>
  )
}

export default ViewPoll
