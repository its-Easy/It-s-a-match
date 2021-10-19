import React, {useEffect, useState} from 'react'
import axios from 'axios' 
import props from 'prop-types'
import ContentCard from './contentCard'

const NewsFeed = (props) => {
    const [username, setUsername] = useState("")
    var [posts, setPosts] = useState([[]])
    const [postDetail, setPostDetail] = useState([])
    const [render, setRender] = useState(false)
    useEffect(async () => {
        setUsername(props.username)
        await axios.post('http://localhost:8080/news/', {email: props.username})
            .then(res => {
            posts = res.data
            console.log(posts)
            getData()
            })
            .catch((err) => {console.log(err)})

            setRender(true)
    }, [])
    const getData = async e => {
        // postDetails = 
        // posts.map((post)=> {
            console.log(posts.length)
            for(var j=0;j<posts.length;j++)
            for(var i=0; i<posts[j].post_url.length; i++)
            postDetail.push(<ContentCard id={posts[j]._id} username={posts[j].email} url={posts[j].post_url[i]} date={posts[j].post_date[i]} />)
        console.log(postDetail)
        // });
    }

    if(render) {
        return (
            <div style={{backgroundColor: "white", width: "50rem", margin: "10% 25% 0% 25%", padding: "5rem"}}>
                {postDetail}
            </div>
        )
    }
    else
    return (
        <>
        Loading news of your 'matches', till then think about your dating plans ;)
        </>
    )
}

export default NewsFeed