import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import history from '../history';
import './../App.css'
class Home extends Component{
    constructor(props){
        super(props)
          this.state={
            dogs:[],
            cats:[]
          
        }
      }
      componentDidMount(){
        fetch('/getDogs')
          .then(res=>res.json())
          .then((dogs)=>this.setState({dogs}))
        fetch('/getCats')
          .then(res=>res.json())
          .then(cats=>this.setState({cats}))
        
      }
    render(){
        // console.log("dogs",this.state.dogs[this.state.dogs.length-1])
        console.log("cat",this.state.cats)
        const dog=this.state.dogs
        const cat=this.state.cats
        return(
            <div className='petList'>
        {dog.length>0? (
            <div><img src={dog[dog.length-1].dog_profile_pic} height='auto' width='200' alt='dog'/><br/>
            Name{dog[dog.length-1].dog_name}<br/>
            Age:{dog[dog.length-1].dog_age}<br/>
            <Button variant="info" onClick={()=>history.push('/Dogs')}>More dogs </Button>
            </div>
            ):null}


        {cat.length>0? (
        <div>
          <img src={cat[cat.length-1].cat_profile_pic} height='auto' width='200' alt='cat'/><br/>
          Name:{cat[cat.length-1].cat_name}<br/>
          Age: {cat[cat.length-1].cat_age}<br/>
          <Button variant="info" onClick={()=>history.push('/Cats')}>More cats</Button>
          </div>):null}
         
            </div>
        )
    }
}

export default Home;