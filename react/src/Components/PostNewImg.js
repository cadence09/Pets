import React from 'react';
import Buttons from './Buttons';
import Spinner from "./Spinner"
import Images from './Images'
class Posting extends React.Component{
    constructor(props){
     super(props)
     this.state={
         uploading:false,
         images:[],
         catName:'',
         catOwner:'',
         age:null,
         text:''
     }
    }
    onChange = e => {
      console.log("files",e.target)
        const files = Array.from(e.target.files)
        this.setState({ uploading: true })
    
        const formData = new FormData()
    
        files.forEach((file, i) => {
          formData.append(i, file)
        })
    
        fetch('/getCats', {
          method: 'POST',
          body: formData
        })
        .then(res => res.json())
        .then(images => {
          this.setState({ 
            uploading: false,
            images
          })
        })
      }
      
    render(){
      console.log("image",this.state.images)
        const {uploading, images} =this.state
        const content=()=>{
            switch (true){
                case uploading:
                    return <Spinner/>
                case images.length > 0:
                    return <Images images={images} removeImage={this.removeImage} />
                default:
                    return <Buttons onChange={this.onChange} />
            }
        }
        return(
            <div>
             
                <label htmlFor="cat_name">Cat Name:</label>
                    <input type="text" id="cat_name" value={this.state.CatName}/><br/>
                <label htmlFor='cat_age'>Cat Age:</label>
                  <input type='number' id='cat_age' value={this.state.age}/><br/>
                <label htmlFor='cat_owner'>Owner:</label>
                <input type="text" id="cat_owner" value={this.state.catOwner}/><br/>
            
                 
                <div className="buttons">
                    {content()}
                </div>
            </div>
        )
    }
}

export default Posting;