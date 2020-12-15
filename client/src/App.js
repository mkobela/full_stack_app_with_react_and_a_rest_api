import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

/***
 * @function checkStatus
 * @property {object} response - fetch response
 * @returns {Promise} - promise from fetch
***/
function checkStatus(response) {
  // check if fetch was successful
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

/***
 * @function fetchData
 * @property {string} url - url
 * @returns {Promise} - promise from fetch
***/
function fetchData(url) {

  // send the request
  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .catch(error => console.error("ERROR !!!"));
}


function App() {

  const [state, setState] = useState([]);

  useEffect(() => {
    fetchData('http://localhost:5000/api/courses')
      .then(data => {
        setState(data);
      });
  }, []);


  console.log("Render !!!")
  // fetchData('http://localhost:5000/api/courses')
  //   .then(data => {
  //     bookArray = data;
  //     console.log(bookArray);
  //   });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
          {state.map((course, index) => (
            <div key={index}>{course.title}</div>
          ))}
        
      </header>
    </div>
  );
}

export default App;
