import React, { Component } from 'react';
import './App.css';

const fr = new FileReader();

class App extends Component {
  constructor(props) {
    super(props);

    this.fileInput = React.createRef();
    this.state = {
      fileName: 'Nombre de archivo por defecto',
      fileUrl: 'https://placehold.it/200x200'
    }
    this.fakeClick = this.fakeClick.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.writeImage = this.writeImage.bind(this);
  }

  fakeClick(){
    console.log('Yay');
    this.fileInput.current.click();
  }

  writeImage() {
    const url = fr.result;
    this.setState({
      fileUrl: url
    });
  }

  handleFileChange(e) {
    const myFile = e.currentTarget.files[0];
    const name = myFile.name;
    
    
    fr.addEventListener('load', this.writeImage);
    fr.readAsDataURL(myFile);

    this.setState({
      fileName: name
    });
  }

  render() {
    return (
      <div className="app">
        <input type="file" ref={this.fileInput} onChange={this.handleFileChange} />

        <button onClick={this.fakeClick}>Click</button>

        <h2>{this.state.fileName}</h2>

        <img className="img" src={this.state.fileUrl} alt={this.state.fileName} />

        <div className="bg" style={{backgroundImage: `url(${this.state.fileUrl})` }}></div>

      </div>
    );
  }
}

export default App;
