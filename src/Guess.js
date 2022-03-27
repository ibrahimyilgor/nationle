import { Text } from 'react-native';
import CircularStatic from './CircularProgressWithLabel'
import './Guess.css';

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
            height: "70%",
            textAlign: "center",
            borderRadius: "25px",
            paddingLeft: "0.5vw",
            paddingRight: "0.5vw",
            display:"flex",
            flexDirection: "column",
            justifyContent: "center",
            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)"
            }),
        rotateImg: ( {name3} ) => ({
            transform: name3 && "rotate(" + parseInt(name3,10) + "deg)",
            width: "100%"
            }),
        svgIcon: {
                "&.MuiSvgIcon-root":{
                  width: "100%",
                  height: "80%",
                  borderRadius: "100%",
                  color: "#F6EABE",
                }
              },
        done: {
            "&.MuiSvgIcon-root":{
                width: "100%",
                height: "80%",
                borderRadius: "100%",
                color: "#F6EABE",
              }
        },
    }
  );

function Guess({fullWidth,code,name1,name2,name3,value}) {
    const classes = useStyles({name3});

    return(
    <div className='Guess' style= {fullWidth && {width: "100%"}}>
        {code && (<div className="Flag">
        <img
            width="auto"
            src={`https://flagcdn.com/32x24/${code?.toLowerCase()}.png`}
            alt={name1}/> 
        </div>)}
       
        {name3 !== undefined && (<div className="GuessName">
                <Text style={{ color: "#F6EABE" ,fontSize: "80%", fontFamily: "Patrick Hand", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", width: "90%", marginLeft: "5%"}}>{name1}</Text>
            </div>)}
        {name3 !== undefined && (<div className='GuessDistance'>
                    <Text style={{ color: "#F6EABE", fontSize: "80%", fontFamily: "Patrick Hand", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%"}}>{name2}</Text>
                </div>)}
        {name3 !== undefined && (<div className={classes.rotateImgDiv}>
            {value === 100 ? (<DoneIcon className={classes.done}/>) : (<EastIcon className={[classes.svgIcon, classes.rotateImg]}/>)}
            
        </div>)}
        {name3 !== undefined && (<div className='GuessPercentage'>
            <CircularStatic variant={'determinate'} value={value} />
        </div>)}
    </div>)
}

export default Guess;