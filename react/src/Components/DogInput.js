import React from 'react';

class DogInput extends React.Component{
    constructor(props){
        super(props)
        this.state={
            dog:{dogName:"",dogAge:"",dogOwner:"",moment:""},
           dogImage:""
        
        }
        }
    

handleName = (obj) => e => {
    let dogData = this.state[obj];
    dogData[e.target.name] = e.target.value;

    this.setState({ [obj]: dogData });

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
    dogImage: [imageReader.result]
  });
}

imageReader.readAsDataURL(file);


}
handleSubmit = (e) => {
 e.preventDefault()
const imageObj={image:this.state.dogImage[0]}
const newData={
    ...this.state.dog,
   ...imageObj
}

    let json=JSON.stringify(newData)
   console.log("js",json)
    fetch("/upLoadDog",{
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body:json
    })
    
}

    render(){
     
        return (
            <div >
            
                    <label htmlFor="dogName">Dog Name:</label><br/>
                        <input type="text" name="dogName" id="dogName" onChange={this.handleName("dog")} value={this.state.dog.dogName}/><br/> 
                     <label htmlFor='dogAge'>Dog Age:</label><br/>
                        <input type='text' name="dogAge" id='dogAge' onChange={this.handleName("dog")} value={this.state.dog.dogAge}/><br/>
                    <label htmlFor='dogOwner'>Owner:</label><br/>
                        <input type="text" name="dogOwner" id="dogOwner" onChange={this.handleName("dog")} value={this.state.dog.dogOwner}/><br/> 
                        <label htmlFor="moment">Intersting Moment :</label><br/>
                        <textarea name="moment" id="moment" cols="80" rows="5" value={this.state.dog.moment} onChange={this.handleName("dog")}></textarea>
                      
                <input type="file" onChange={this.handleImageChange}  />
                <button onClick={this.handleSubmit} >Submit</button>
               
                
               
                 
            </div>
        )
    }
}

export default DogInput;