import React, {useRef,useState} from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import Checkoutservice from './checkoutservice';
import './cart.css'
const Cart = ({cart, setCart}) => {

    const invoiceRef = useRef(null);
    const nameRef=useRef();
    const emailRef=useRef();
    const numberRef=useRef();
    const addressRef=useRef();
    const pincodeRef=useRef();
    // increace qty
    const incqty = (product) => 
    {
        const exsit = cart.find((x) => 
        {
            return x.id === product.id
        })
        setCart(cart.map((curElm) => 
        {
            return curElm.id === product.id ? {...exsit, qty: exsit.qty + 1} : curElm
        }))
    }

    // Dec Qty
    const decqty = (product) => {
        const exist = cart.find((x) => x.id === product.id);
    
        if (exist && exist.qty > 1) {
            setCart(cart.map((curElm) => 
                curElm.id === product.id ? { ...exist, qty: exist.qty - 1 } : curElm
            ));
        }
    };
    
    //Remove cart product
    const removeproduct = (product) => 
    {
        const exsit = cart.find((x) => 
        {
            return x.id === product.id
        })
        if(exsit.qty > 0)
        {
            setCart(cart.filter((x) => 
            {
                return x.id !== product.id
            }))
        }
    }
    // Total price
    const Totalprice = cart.reduce((price, item) => price + item.qty * item.Price, 0);

    //downlod invoice
    const renderInvoiceContent = () => (
        <div id="invoice-content">
            <h1>Invoice Generated From Eshop</h1>
            <table className='invoice-table'>
            <tr>
                    <th className='product-name'>Product Name</th>
                    <th className='product-price'>Product Price</th>
                    <th className='product-quantity'>Product Quantity</th>
                    <th className='product-subtotal'>Subtotal</th>
                </tr>
            </table>
          {cart.map((item) => (
            <div key={item.id}>
              
              <table className='invoice-table'>
                <tr>
                    <td className='product-name'>{item.Title}</td>
                    <td className='product-price'>₹{item.Price}</td>
                    <td className='product-quantity'>{item.qty}</td>
                    <td className='product-subtotal'>₹{item.Price * item.qty}</td>
                </tr>
              </table>
            </div>
          ))}
          <h4 className='total-price'>Totalprice:  ₹{Totalprice}</h4>
        </div>
      );
    // checkout
    const [checkout,setCheckOut]=useState(false);
    const handleCheckOut =(event)=>{
        event.preventDefault();
        setCheckOut(true);
    }
    const [orderPlaced, setOrderPlaced] = useState(false);
    const handlePlaceOrder = (event) => {
        event.preventDefault(); 
        setOrderPlaced(true);
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const number = numberRef.current.value;
        const address = addressRef.current.value;
        const pincode = pincodeRef.current.value;
    const userData = {
        name,
        email,
        number,
        address,
        pincode
    };

    Checkoutservice.insertdata(userData)
        .then((response) => {
            console.log(response);
            // Clear the input fields using useRef
            nameRef.current.value = '';
            emailRef.current.value = '';
            numberRef.current.value = '';
            addressRef.current.value = '';
            pincodeRef.current.value = '';
        })
        .catch((error) => {
            // Handle the error appropriately
            console.error(error);
        });

    alert("Thanks For Checking out !!!");
      };
  return (
    <>
    <div className='cartcontainer'>
        {cart.length === 0 && 
        <div className='emptycart'>
        <h2 className='empty'>Cart is Empty</h2>
        <Link to='/product' className='emptycartbtn'>Shop Now</Link>
        </div>
        }
        <div className='contant'>
            {
                cart.map((curElm) => 
                {
                    return(
                        <div className='cart_item' key={curElm.id}>
                            <div className='img_box'>
                                <img src={curElm.Img} alt={curElm.Title}></img>
                            </div>
                            <div className='detail'>
                                <div className='info'>
                                <h4>{curElm.Cat}</h4>
                                <h3>{curElm.Title}</h3>
                                <p>Price: ₹{curElm.Price}</p>
                                <div className='qty'>
                                    <button className='incqty' onClick={() => incqty(curElm)}>+</button>
                                    <input type='text' value={curElm.qty}></input>
                                    <button className='decqty' onClick={() => decqty(curElm)}>-</button>
                                </div>
                                <h4 className='subtotal'>sub total: ₹{curElm.Price * curElm.qty}</h4>
                                </div>
                                <div className='close'>
                                <button onClick={() => removeproduct(curElm)}><AiOutlineClose /></button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        {
            cart.length > 0 &&
            <>
                <button onClick={handleCheckOut} className='checkout'>Check Out</button>
                {
                    // const [checkout,setCheckOut]=useState(false);
                    checkout &&(
                        <>
                            <div className='checkout-form'>
                            <h2>Check Out</h2><br></br>
                            <form onSubmit={handlePlaceOrder}>
                                <label htmlFor='name'>Name:</label>
                                <input type='text' id='name' name='name' placeholder='Enter Your Name' ref={nameRef} required></input>
                                <label htmlFor='email'>Email:</label>
                                <input type='text' id='email' name='email' placeholder='Enter Your Email' ref={emailRef} required></input>
                                <label htmlFor='number'>Mobile Number:</label>
                                <input type='text' id='number' name='number' placeholder='Enter Mobile Number' ref={numberRef} required></input>
                                <label htmlFor='address'>Address:</label>
                                <input type='text' id='address' name='address' placeholder='Enter Your Address' ref={addressRef} required></input>
                                <label htmlFor='pincode'>Pincode:</label>
                                <input type='text' id='pincode' name='pincode' placeholder='Enter Your Pincode' ref={pincodeRef} required></input>
                                <button type='submit'>Place Order</button>
                            </form>
                            </div>

                            {
                                orderPlaced &&(
                                    <>
                                    <h2 className='totalprice'>total: ₹ {Totalprice}</h2>
                                    <ReactToPrint
                                    trigger={() => <button className='checkout'>Download Invoice</button>}
                                    content={() => invoiceRef.current}
                                    />
                                    <div style={{ display: 'none' }}>
                                    <div ref={invoiceRef}>{renderInvoiceContent()}</div>
                                    </div>
                                    </>
                                )
                             }
                        </>
                    )
                }  
          </>
        }
    </div>
    </>
  )
}

export default Cart