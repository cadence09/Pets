import React from 'react';
import history from "./../history";
import DogInputs from './DogInput'
class Dogs extends React.Component{
    constructor(props){
        super(props)
          this.state={
            dogs:[]
          
        }
      }
      componentDidMount(){
        fetch('/getDogs')
          .then(res=>res.json())
          .then((dogs)=>this.setState({dogs}))
      }
      
      handleNavigate=(data)=>{
        console.log("data",data)
        history.push("/Profile",[data])
      }
    render(){
        return (
            <div>
            <div className="dogInfo">
            {this.state.dogs.map((dog, i)=>(
           <div key={i} className="dog"> 
           <img src={dog.dog_profile_pic} heigth='250' width='250'></img><br/>
            Name:{' '}{dog.dog_name}<br/>
           Age:{' '}{dog.dog_age}<br/>
           <button onClick={()=>this.handleNavigate(dog)}>More About Me</button>
           </div>
         ))} 
         </div>
         <DogInputs/>
         </div>
        )
    }
}

export default Dogs;