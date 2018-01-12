import React, { Component } from 'react';

class FileUpload extends Component{
  constructor() {
    super();
    this.state = {
      uploadValue : 0
  };
}

  render () {
    return (
      <div>
        <div className="progress">
          <div className="progress-bar" role="progressbar"
              aria-valuemin="0" aria-valuemax="100"
             value ={this.state.uploadValue} max="100">
             70%
           </div>
        </div>
        <br/>
          <form className = "btn btn-success post-editor-button3">
            <input type="file" onChange={this.props.onUpload}/>
          </form>
      </div>
    )
  }
}

export default FileUpload;
