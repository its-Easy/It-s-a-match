import React from "react";
import axios from 'axios'

class Post extends React.Component {
  constructor(props) {
    super(props);
    //check user details if exists
    const loggedInUser = localStorage.getItem('authtoken')
    const checkUser = async e => {
        if(loggedInUser) {
            const response = await axios.post("http://localhost:8080/sign-in/verify-token", {token: loggedInUser})

            if(response.data) {
                console.log(response.data)
                this.setState({
                    email: response.data.email
                })
            }
        }
    }
    checkUser()
    this.state = {
        email: "",
        image: ""
    };
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

  onChangeImage = e => {
    this.setState({ image: e.target.files[0] });
  };

  onSubmit(e) {
    e.preventDefault();

    //if user if not logged in ask to sign in
    if(this.state.email==="") {
        alert("Please sign in first !")
        window.location.href="/signIn"
        return 
    }

    //else intialise form data and send to router
    let formData = new FormData();
    formData.append("email", this.state.email)
    formData.append("image", this.state.image);

    axios.post("http://localhost:8080/add/",formData)
    this.setState({
      image: ""
    });
  }

  render() {
    //form to upload story
    return (
      <div className="form-container">
        <form encType="multipart/form-data" onSubmit={this.onSubmit}>
          <h2>Image Form</h2>
          <label className="form-label">Choose an Image</label>
          <input
            type="file"
            className="form-input"
            onChange={this.onChangeImage}
          />
          <button type="submit" className="submit-btn">
            Submit!
          </button>
        </form>
      </div>
    );
  }
}

export default Post