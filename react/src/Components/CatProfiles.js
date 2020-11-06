import React from 'react';

class CatProfile extends React.Component{
  
render(){
   console.log("jj",this.props.location.state[0])
  const {id,cat_name,owner_name,cat_age,cat_profile_pic,moments}=this.props.location.state[0]
  return(
    <div>

    
    <div className="container">
         
        <img src={cat_profile_pic} height="500" width="500"/>

      <div className="profile">
       <p>Name</p>
         {cat_name}
         <p>Age</p>
         {cat_age}
         <p>Owner</p>
         {owner_name}
         <p>Moment</p>
         {moments}
       
         </div>
       
    </div>
    
    </div>
    )
}
}


export default CatProfile;