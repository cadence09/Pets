import React from 'react';

class Profile extends React.Component{
    constructor(props){
        super(props)
    }
render(){

const {id,dog_name,owner_name,dog_age,dog_profile_pic,moment}=this.props.location.state[0]
    return(
      <div>

      
      <div className="container">
           
          <img src={dog_profile_pic} height="500" width="500"/>

        <div className="profile">
         <p>Name</p>
           {dog_name}
           <p>Age</p>
           {dog_age}
           <p>Owner</p>
           {owner_name}
           <p>Moment</p>
           {moment}
         
           </div>
         
      </div>
      
      </div>
    )
}
}


export default Profile;