
import memories from './images/memories.png'
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import Posts from './components/Posts/Posts.js'
import Form from './components/Form/Form.js'
import React,{useEffect, useState} from 'react'
import makeStyles from './styles.js'
import {getPosts} from './actions/posts'
import {useDispatch} from 'react-redux';


const App=()=>{
    const[currentId,setCurrentId] = useState(null);
    const classes = makeStyles();
    const dispatch =useDispatch();
    useEffect(()=>{
        dispatch(getPosts());
    },[currentId, dispatch])
    
    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant ="h2" align="center"> Memories of 2020</Typography>
                <img className={classes.images} src ={memories} alt="memories" height = "60"/>
            </AppBar>
            <Typography variant ="h4" align="center" className="quote" color="black" ><i> "Remember tough times never lasts, but tough people do. Shout out for everyone."</i></Typography>
            <Grow in>
                <Container>
                    <Grid container className = {classes.mainContainer} justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>

                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}
export default App; 