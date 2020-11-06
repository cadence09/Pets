import React from 'react';

class CatInput extends React.Component{
    constructor(props){
        super(props)
        this.state={
            cat:{catName:"",catAge:"",catOwner:"",moment:""},
           catImage:""
        
        }
        }
    

handleName = (obj) => e => {
    let catData = this.state[obj];
    catData[e.target.name] = e.target.value;

    this.setState({ [obj]: catData });
    console.log("data",this.state.cat)
  };

handleImageChange=(e)=>{
e.preventDefault();

let file = e.target.files[0];
let imageReader = new FileReader();

if (e.target.files.length === 0) {
  return;
}

imageReader.onloadend = (e) => {
    console.log("1")
  this.setState({
    catImage: [imageReader.result]
  });
}

imageReader.readAsDataURL(file);


}
handleSubmit = (e) => {
 e.preventDefault()
const imageObj={image:this.state.catImage[0]}
const newData={
    ...this.state.cat,
   ...imageObj
}

    let json=JSON.stringify(newData)

    fetch("/upLoad",{
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body:json
    })
    
}

    render(){
        // console.log(this.state.file)
        return (
            <div>
                
                    <label htmlFor="catName">Cat Name:</label>
                        <input type="text" name="catName" id="catName" onChange={this.handleName("cat")} value={this.state.cat.catName}/><br/> 
                     <label htmlFor='catAge'>Cat Age:</label>
                        <input type='text' name="catAge" id='catAge' onChange={this.handleName("cat")} value={this.state.cat.catAge}/><br/>
                    <label htmlFor='catOwner'>Owner:</label>
                        <input type="text" name="catOwner" id="catOwner" onChange={this.handleName("cat")} value={this.state.cat.catOwner}/><br/> 
                        <label htmlFor="moment">Intersting Moment :</label><br/>
                        <textarea name="moment" id="moment" cols="80" rows="5" value={this.state.cat.moment} onChange={this.handleName("cat")}></textarea>
                      
                <input type="file" onChange={this.handleImageChange}  /> 
                <button onClick={this.handleSubmit} className="upButton" >Submit</button>
                 <img src={this.state.catImage}/>
                    
                 
            </div>
        )
    }
}

export default CatInput;