import React from 'react'
import Post from './Post/Post.js'
import {useSelector} from 'react-redux'
import {Grid, CircularProgress} from '@material-ui/core'
import makeStyles from './styles.js'
   
const Posts=({setCurrentId})=>{
    const posts=useSelector((state)=>state.posts)
    const classes = makeStyles();
    console.log(posts);
    return (
        //if I am using the javascript logic then, I am using it inside the curly braces.
        !posts.length ? <CircularProgress/> : (
            <Grid className={classes.container} container alignItems="stretch" spacing ={3}>
                {
                    posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={6}>
                            <Post post={post} setCurrentId= {setCurrentId} />
                        </Grid>
                        //above I am passing the individual post as the prop in Post.js
                    )
                )
                }
            </Grid>
        )
    )
}
export default Posts;