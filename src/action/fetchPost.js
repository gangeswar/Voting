import { FETCH_POST, NEW_POST } from "./type";
import axios from 'axios';


export const FetchPost = () => dispatch => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then(posts => dispatch({
        type: FETCH_POST,
        payload: posts.data
    })
    );
}

export const CreatePost = postData => dispatch => {
    axios.post("https://jsonplaceholder.typicode.com/posts").then(posts => dispatch({
        type: NEW_POST,
        payload: postData
    })
    );
}