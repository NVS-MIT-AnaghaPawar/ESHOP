import React from "react";

class Checkout extends React.Component{

    render(){

        const{name,email,number,location,pincode}=this.state;
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                        <input type='text' name='name' value={name} placeholder='Enter Your Full Name' required autoComplete='off' onChange={this.handleChange}></input>
                        <input type='email' name='email' value={email} placeholder='Enter Your E-mail'  autoComplete='off' onChange={this.handleChange}></input>
                        <input type='text' name='number' value={number} placeholder='Enter Your Mobile Number'  autoComplete='off' onChange={this.handleChange}></input>
                        <textarea name='message' value={location} placeholder='Your Address'  autoComplete='off' onChange={this.handleChange}></textarea>
                        <input type="text" name="pincode" value={pincode} placeholder="Your Pincode" autoComplete="off" onChange={this.handleChange}></input>
                        <button type="submit">Submit</button>
                    </form>
            </div>
        )
    }
}

export default Checkout;