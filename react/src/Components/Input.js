import React from 'react';
import Cropper from 'react-easy-crop';
import Button from '@material-ui/core/Button';
import GetCroppedImage from './CropImage'
class CatInput extends React.Component{
    constructor(props){
        super(props)
        this.state={
            cat:{catName:"",catAge:"",catOwner:"",moment:""},
           catImage:"",
           crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 4 / 4,
    cropper:false,
    croppedAreaPx: null
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
this.setState({cropper:true})
// this.cropImage()

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

onCropChange = (crop) => {
    this.setState({ crop })
  }

  onCropComplete = (croppedArea, croppedAreaPixels) => {
      this.setState({croppedAreaPx:croppedAreaPixels})
    console.log(croppedArea, croppedAreaPixels)
  }
  
  onZoomChange = (zoom) => {
    this.setState({ zoom })
  }

   displayImage=async () => {
     try{
       console.log("clicked",this.state.catImage)
       const croppedImage=this.getCroppedImage(this.state.catImage,this.state.croppedAreaPx)
   
      console.log("crop", croppedImage, )
     }catch(error){
       console.error(error)
     }
  }

  getCroppedImage(newImage,crop){
    const image = new Image()
    image.src = newImage
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    
    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
     )

    const reader = new FileReader()
    canvas.toBlob(blob => {
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
          this.setState({
            catImage: [reader.result]
          });
        }
    })
    this.setState({cropper:false})
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
          {/* <img src={this.state.catImage}/> */}
                   {this.state.cropper?  (<div><Cropper
    image={this.state.catImage}
    crop={this.state.crop}
    zoom={this.state.zoom}
    aspect={this.state.aspect}
    onCropChange={this.onCropChange}
    onCropComplete={this.onCropComplete}
    onZoomChange={this.onZoomChange}
   
  /><Button variant="contained" color='primary' onClick={this.displayImage}>Crop</Button></div>):null}
                 
            </div>
        )
    }
}


export default CatInput;