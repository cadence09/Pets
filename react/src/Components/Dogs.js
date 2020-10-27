import React from 'react';
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
    render(){
        return (
            <div>
            <div className="dogInfo">
            {this.state.dogs.map(dog=>(
           <div className="dog"> 
           <img src={dog.dog_profile_pic} heigth='250' width='250'></img><br/>
            Name:{' '}{dog.dog_name}<br/>
           Age:{' '}{dog.dog_age}<br/>
           </div>
         ))} 
         </div>
         <DogInputs/>
         </div>
        )
    }
}

export default Dogs;