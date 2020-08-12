import React from 'react';
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
           
            {this.state.dogs.map(dog=>(
           <div>
           <img src={dog.dog_profile_pic} heigth='100' width='100'></img><br/>
            Name:{' '}{dog.dog_name}<br/>
           Age:{' '}{dog.dog_age}<br/>
           </div>
         ))} 
       
         </div>
        )
    }
}

export default Dogs;