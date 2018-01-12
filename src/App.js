import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import FileUpload from './FileUpload';
import firebase from 'firebase/app';
import 'firebase/database';
import  ThreadDisplay  from './ThreadDisplay/components/ThreadDisplay';

class App extends Component {

  constructor(props) {
    super(props);

    const config =
    {
      apiKey: "",
      authDomain: "react-memo-app.firebaseapp.com",
      databaseURL: "https://react-memo-app.firebaseio.com",
      projectId: "react-memo-app",
      storageBucket: "react-memo-app.appspot.com",
      messagingSenderId: "628429928326"
    };

    this.app = firebase.initializeApp(config);
    this.database = this.app.database();

    this.state = {
      user : null,
      pictures : [],
    }

    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.renderLoginButton = this.renderLoginButton.bind(this);
    this.handleUpload = this.handleUpload.bind(this);


  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });

    firebase.database().ref('pictures').on('child_added',snapshot => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      });
    });

  }
  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log('${result.user.email} 들어음'))
      .catch(error => console.log('Error ${error.code} : ${error.message}'));
  }

  handleLogout() {
    firebase.auth().signOut()
    .then(result => console.log('${result.user.email} 나감'))
    .catch(error => console.log('Error ${error.code} : ${error.message}'));
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref('/photos/{$file.name}');
    const task = storageRef.put(file);

    task.on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
      this.setState({
        uploadValue : percentage
      })
    }, error => {
      console.log(error.message)
    }, () => {
      const record = {
        photoURL : this.state.user.photoURL,
        displayName : this.state.user.displayName,
        image : task.snapshot.downloadURL
      };

      const dbRef = firebase.database().ref('pictures');
      const newPicture = dbRef.push();
      newPicture.set(record);
    });
  }


  renderLoginButton() {
    if(this.state.user) {
      return (
        <div>
            <img width="100" src={this.state.user.photoURL} alt={this.state.user.displayName}/>
            <p> 안녕하세요 {this.state.user.displayName}님!!</p>
            <button className = "btn btn-success post-editor-button2"
              onClick = {this.handleLogout}>로그아웃</button>
            <FileUpload onUpload = { this.handleUpload }/>

            {
              this.state.pictures.map(picture => (
                <div>
                  <img width="100" src={picture.image}/>
                  <br/>
                  <img width="100" src = {picture.photoURL} alt = {picture.displayName} />
                  <br/>
                  <span>{picture.displayName}</span>
                </div>
              )).reverse()
            }

        </div>
      );
    } else {
      return(
          <button className = "btn btn-success post-editor-button1"
             onClick={this.handleAuth}>구글계정으로 로그인</button>
      );
    }
  }


  render() {
    return (
      <div className="App">
        <Header />
        <ThreadDisplay database = {this.app.database}/>
        <p className="App-intro">
          { this.renderLoginButton() }
        </p>
      </div>
    );
  }
}

export default App;
