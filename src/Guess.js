import { Text } from 'react-native';
import CircularStatic from './CircularProgressWithLabel'
import './Guess.css';
import { useEffect, useState } from 'react';

import EastIcon from '@mui/icons-material/East';
import DoneIcon from '@mui/icons-material/Done';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(
    {
        rotateImgDiv: ( {name3} ) => ({
            float:"left",
            backgroundColor: "#789395",
            marginLeft:"0.6vw",
            marginTop:"1vh",
            width: "5%",
            textAlign: "center",
            borderRadius: "25px",
            paddingLeft: "0.5vw",
            paddingRight: "0.5vw",
            }),
        rotateImg: ( {name3} ) => ({
            transform: name3 && "rotate(" + parseInt(name3,10) + "deg)",
            })
    }
  );

function Guess({code,name1,name2,name3,value}) {

    const classes = useStyles({name3});
 
    return(
    <div className='Guess'>
        {code && (<div className="Flag">
        <img
            src={`https://flagcdn.com/32x24/${code?.toLowerCase()}.png`}
            alt={name1}/> 
        </div>)}
       
        <div className="GuessName">
            <Text style={{color:"#F6EABE",fontSize:"25px"}}>{name1}</Text>   
        </div>
        <div className='GuessDistance'>
            <Text style={{color:"#F6EABE",fontSize:"25px"}}>{name2}</Text>  
        </div>
        {name3 !== undefined && (<div className={classes.rotateImgDiv}>
            {value === 100 ? (<DoneIcon/>) : (<EastIcon className={classes.rotateImg}/>)}
            
        </div>)}
        {name3 !== undefined && (<div className='GuessPercentage'>
            <CircularStatic variant={'determinate'} value={value} />
        </div>)}
    </div>)
}

export default Guess;