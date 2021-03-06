import React ,{Component}from 'react';
import Posting from './PostNewImg'
// import FileUpload from "./UpLoadImage"
import CatInput from "./Input";
import './../App.css'
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
           <div className="catInfo">
            {this.state.cats.map(cat=>(
           <div className="cat">
           <img src={cat.cat_profile_pic} heigth='250' width='250'></img><br/>
            Name:{' '}{cat.cat_name}<br/>
           Age:{' '}{cat.cat_age}<br/>
           </div>
         ))} 
         </div>
           {/* <Posting /> */}
           <CatInput/>
         </div>
        )
    }
}

export default Cats;