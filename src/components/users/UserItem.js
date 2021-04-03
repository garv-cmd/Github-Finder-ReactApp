import React from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

const UserItem =({user:{login,avatar_url,html_url}})=>{
    // constructor(){// a function when component runs
    //     super(); // to call the parent class construtor
    //     this.state={}// it is a js object
    //   }
       
        return (
            <div className="card text-center">
                <img src={avatar_url} className="round-img" alt="" style={{width:"60px"}}/>
                <h3 >{login}</h3>
                <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">More</Link>
            </div>
        )
    

}
UserItem.propTypes={
    user :PropTypes.object.isRequired,
}

export default UserItem