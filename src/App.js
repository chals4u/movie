import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Data from "./data.json";
import { v1 as uuidv1 } from 'uuid';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function App() {

  // Reference
  const movieRef = useRef();
  const ratingRef = useRef();

  // State 
  const [data, setData] = useState(Data);

  // Temp State
  const [movie_name, setMovieName] = useState();
  const [rating, setRating] = useState();
  const [release_date, setReleaseDate] = useState(new Date());

  const [updateID, setUpdateID] = useState();
  const [updateTitle, setUpdateTitle] = useState();
  const [updateContent, setUpdateContent] = useState();

  // Effect
  //////////////////////////////////////////
  useEffect(() => {
 
    // console.log(data);
    // setDate(Data)
    // clear form fields
    movieRef.current.value = null;
    ratingRef.current.value = null;
  },[data]);
  


  // Add Post
  //////////////////////////////////////////
  const addPost = () => {
    if(movie_name && rating) {
      // create new post object
      let newPost = {
        "id": uuidv1(),
        "movie_name": movie_name,
        "rating": rating,
        //"release_date":release_date
      }
      // merge new post with copy of old state
      let posts = [...data, newPost];
      // push new object to state
      setData(posts);
      // clear title and content from state
      setMovieName();
      setRating();
      setReleaseDate();

      // update write to json file
      saveJson(posts);

   }
  }
  
  const saveJson = (posts) => {alert("am save")
    // api URL // end point from node server / express server
    const url = 'http://localhost:5000/write'
    axios.post(url, posts)
    .then(response => {
       console.log("jjj=>",response);
    });
  }

 return (
    <div style={{position:"absolute",marginLeft:"500px"}}>

      <div>
        <h4>Add New Movie</h4>
        <input placeholder="Movie Name" 
          onChange={ e => setMovieName( e.target.value ) } 
          value={ movie_name || '' } 
          ref={ movieRef }
        />
        <br />
        <input  placeholder="Rating for 10"
          onChange={ e => setRating( e.target.value ) } 
          value={ rating || '' } 
          ref={ ratingRef }
        />
        <br />
        <DatePicker selected={release_date} onChange={(date:Date) => setReleaseDate(date)} />
        <br />
        <button onClick={ addPost }>Add Movie</button>
      </div>

      {/* If temp state has got values of title and content for update form show this */}

      { updateTitle || updateContent ? 
        (
          <div>
            <h4>Update Post</h4>
            <input placeholder="Title" 
              onChange={ e => setUpdateTitle( e.target.value ) } 
              value={ updateTitle || '' } 
            />
            <br />
            <textarea
              placeholder="Content"
              onChange={ e => setUpdateContent( e.target.value ) } 
              value={ updateContent || '' } 
            ></textarea>
            <br />
            {/* <button onClick={ updatePost }>Update Post</button> */}
          </div>
        ) : null }

      <div className="posts">
        { data ? data.map(post => {
          return(<>
          <div class="card">
            
            <div class="card-body">
              <h4 class="card-title">Movie Name:&nbsp;{ post.movie_name }</h4>
              <p class="card-text">Rating:&nbsp;{ post.rating }/10</p>
              <p class="card-text">Release Date:&nsp;{ post.release_date }</p>
              {/* <a href="#" class="btn btn-primary">See Profile</a> */}
            </div>
          </div></>
            )
        }) : null }
        
      </div>
    </div>
  );
}

export default App;
