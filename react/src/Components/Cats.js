import React ,{Component}from 'react';

class Cats extends React.Component{
    constructor(props){
        super(props)
          this.state={
            cats:[]
          
        }
      }
      componentDidMount(){
        fetch('/getCats')
          .then(res=>res.json())
          .then((cats)=>this.setState({cats}))
      }
    render(){
  
        return (
            <div>
           
            {this.state.cats.map(cat=>(
           <div>
           <img src={cat.cat_profile_pic} heigth='100' width='100'></img><br/>
            Name:{' '}{cat.cat_name}<br/>
           Age:{' '}{cat.cat_age}<br/>
           </div>
         ))} 
       
         </div>
        )
    }
}

export default Cats;