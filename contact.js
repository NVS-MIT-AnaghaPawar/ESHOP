import React from 'react'
import './contact.css'
import ContactService from './contactservice';
class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          name: "",
          email: "",
          subject: "",
          message: "",
          user: null,
          error: null
        };
      }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    handleSubmit =(event) =>{
        event.preventDefault();
        const {name,email,subject,message} =this.state;
        const userData = {
            name,
            email,
            subject,
            message
        };

        ContactService.insertdata(userData)
        .then((response)=>{
            console.log(response);
            this.setState({
                name:"",
                email:"",
                subject:"",
                message:""
            });
        })
        .catch((error)=>{
            this.setState({user:null, error: error.message});
        });
        alert("Thanks For Contacting !!!");
    };
    
  render(){
    const {name, email, subject, message}=this.state;
    return (
        <>
        <div className='contact_container'>
            <div className='contant'>
                <h2># contact us</h2>
                <div className='form'>
                    <form onSubmit={this.handleSubmit}>
                        <input type='text' name='name' value={name} placeholder='Enter Your Full Name' required autoComplete='off' onChange={this.handleChange}></input>
                        <input type='email' name='email' value={email} placeholder='Enter Your E-mail'  autoComplete='off' onChange={this.handleChange}></input>
                        <input type='text' name='subject' value={subject} placeholder='Enter Your Subject'  autoComplete='off' onChange={this.handleChange}></input>
                        <textarea name='message' value={message} placeholder='Your Message'  autoComplete='off' onChange={this.handleChange}></textarea>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        </>
      )
  }
}

export default Contact