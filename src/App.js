import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import './App.css';
import Navbar from '../src/components/layouts/Navbar'
import Users from '../src/components/users/Users'
import axios from 'axios'
import Search from '../src/components/users/Search'
import Alert from './components/layouts/Alert'
import About from './components/pages/About'
import User from './components/users/User'

const App =()=> {
  const[users,setUsers] = useState([]);
  const[user,setUser] = useState({});
  const[repos,setRepos] = useState([]);
  const[loading,setLoading] = useState(false);
  const[alert,setAlert] = useState(null);
 
  useEffect(async()=>{
     // set loading true
  setLoading(true)
  const res = await axios.get
  (`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  // data is ready so set loading to false and set the data
  setUsers(res.data);
  setLoading(false)
  },[])
  
//  async componentDidMount(){  //it is a lifecycle method , render is also
 
//   }
  //search github users
 const searchUsers=async (text)=>{
    
    setLoading(true)
    const res = await axios.get
  (`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  // data is ready so set loading to false and set the data
  setUsers(res.data.items);
  setLoading(false)
  }

  //search single github user
  
  const getUser=async(username)=>{
    setLoading(true)
    const res = await axios.get
  (`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  // data is ready so set loading to false and set the data
  setUser(res.data);
  setLoading(false)
  }


  //get User repos
  const getUserRepos =async (username)=>{
    setLoading(true)
    const res = await axios.get
  (`https://api.github.com/users/${username}/repos?per_page=10&sort=create:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  // data is ready so set loading to false and set the data
 
  setRepos(res.data);
  setLoading(false)
  }


 const clearUsers = ()=>{
    setUsers([]);
    setLoading(false)
  }

 const addAlert=(msg,type)=>{
   
    setAlert({msg,type})
    setTimeout(()=>{
      setAlert(null)
    },4000)
  }

    return (
      <Router>
        <div className="App ">
        <Navbar />
        <div className="container" style={{backgroundColor:"white"}}>
          <Alert alert={alert}/>
          <Switch>

            <Route path='/' exact render={props=>(
              <>
               <Search searchUsers={searchUsers} 
          clearUsers={clearUsers} 
          showClear={users.length>0 ? true:false}
          setAlert={addAlert}
          />
        <Users loading={loading} users={users}/>
              </>
            )}></Route>
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/user/:login"  render={props=>(
            
            <User {...props} getUser={getUser} getUserRepos={getUserRepos} repos={repos} user={user} loading={loading} ></User>
            
          )}
          ></Route>
          </Switch>
         
        </div>
       
      </div>

      </Router>
      
    );
  }
  


export default App;
