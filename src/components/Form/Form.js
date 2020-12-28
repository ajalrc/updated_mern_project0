import React,{useState, useEffect} from 'react'
import FileBase from 'react-file-base64'
import {TextField, Button, Typography, Paper} from '@material-ui/core'
import makeStyles from './styles.js'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'

const Form=({currentId, setCurrentId})=>{
    const classes = makeStyles();
    //below I am creating the default values to be used in the form
    const [postData, setPostData]=useState({
        creator:'',title:'',message:'',tags:'',selectedFile:''
    })
    const post=useSelector((state) => currentId ? state.posts.find((p) => p._id=== currentId) : null)
    useEffect(()=>{
        if (post) setPostData(post);
    },[post])
    const dispatch=useDispatch();
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId,postData));   
        }
        else{
            dispatch(createPost(postData))
        }
        clear();
    }
    const clear=()=>{
        setCurrentId(null);
        setPostData({
        creator:'',title:'',message:'',tags:'',selectedFile:''})
    }
    return (
    
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.form} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Edit' : 'Share'} your 2020 Memory</Typography>
            <TextField name="creator" 
            variant="outlined" 
            label="Creator" 
            fullWidth 
            value={postData.creator} 
            //here the ...postdata below means that if only one value is changed in the form then only change that state and keep else same
            onChange={(e)=> setPostData({...postData, creator:e.target.value})}
            
            />
            <TextField name="title" 
            variant="outlined" 
            label="Tile" 
            fullWidth 
            value={postData.title} 
            //here the ...postdata below means that if only one value is changed in the form then only change that state and keep else same
            onChange={(e)=> setPostData({...postData, title:e.target.value})}
            />
            <TextField name="message" 
            variant="outlined" 
            label="Message" 
            fullWidth 
            value={postData.message} 
            //here the ...postdata below means that if only one value is changed in the form then only change that state and keep else same
            onChange={(e)=> setPostData({...postData, message:e.target.value})}
            />
            <TextField name="tags" 
            variant="outlined" 
            label="Tags" 
            fullWidth 
            value={postData.tags} 
            //here the ...postdata below means that if only one value is changed in the form then only change that state and keep else same
            onChange={(e)=> setPostData({...postData, tags:e.target.value.split(',')})}
            />
            <div className={classes.fileInput}>
                <FileBase
                    type = "file"
                    multiple={false}
                    onDone={({base64})=>setPostData({...postData,selectedFile:base64})}
                />
            </div>
            <Button className={classes.buttonSubmit} fullWidth variant="contained" color="primary" size="large" type="submit">
                    Submit
            </Button>
            <Button  fullWidth variant="contained" color="secondary" size="small" onClick={clear}>
                    Clear
            </Button>
            </form>
        </Paper>
    )
}
export default Form;