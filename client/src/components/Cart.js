import React, { useEffect, useState } from "react";
import CartCard from "./CartCard"
import HistoryCard from "./HistoryCard"
import { Button } from 'react-bootstrap'
import StripeCheckout from 'react-stripe-checkout'

function Cart({ user, currentCart, setCart }) {
    // const [currentCart, setCart] = useState(null);
    const [thankYou, setThankYou] = useState(false)
    const [order, setOrder] = useState("")
    const [price, setPrice] = useState("")
    const [c1, setC1] = useState(0) 
    const [c2, setC2] = useState(0) 

console.log(user.id)
console.log(currentCart)

    if (user && c1 < 2) { 
      fetch(`/users/${user.id}`)
        .then((resp) => resp.json())
        .then((receivedItems) => setOrder(receivedItems.carts.map((c) => { return c.product.name}, test())));
     
    }
    
   function test() {
      setC1(c1 + 1)
      
    }

   if (user && c2 < 2) { 
        fetch(`/users/${user.id}`)
          .then((resp) => resp.json())
          .then((receivedItems) => setPrice(receivedItems.cart_sum), test2());
       
   }


    function test2() {
        setC2(c2 + 1)
    }


function handleToken(token, addresses) {
console.log({token, addresses})


if (token != null) {
 
  thankyou()
  CreateHistory()
 function CreateHistory() {


    fetch("/histories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: `${order}`,
        price: `${price}`,
        user_id: user.id
      })
    })
      .then((r) => r.json())
      .then((data) => (console.log(order, price), DeleteAll())
     
      )

 }





function DeleteAll() {
currentCart.carts.map((c) => { 

fetch(`/carts/${c.id}`, {
  method: "DELETE",
}).then((res) => {
  if (res.ok) {
    getUpdatedCart()
  } else {
    res.json().then(console.log);
  }

  
});

})}

}
}
function thankyou() {
  setThankYou(true)
}

function getUpdatedCart() {
  fetch(`/users/${user.id}`)
    .then((resp) => resp.json())
    .then((receivedItems) => setCart(receivedItems))

}


    useEffect(() => {
      fetch(`/users/${user.id}`)
        .then((resp) => resp.json())
        .then((receivedItems) => setCart(receivedItems));
    }, []);
    if (currentCart === null) {
      return <h2>Loading...</h2>;
    }

    function handleCartDelete() {
      currentCart.carts.map((c) => { 
      fetch(`/carts/${c.id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          getUpdatedCart();
        } else {
          res.json().then(console.log);
        }
      })
      });
    

    }

    const hCards = currentCart.lastfive.map((c) => {
      return <HistoryCard key={c.id} order={c.order} price={c.price} card_id={c.id} user_id={user.id} />;
  })

    const cards = currentCart.carts.map((c) => {
        return <CartCard key={c.id} item={c.product} cart_id={c.id} setCart={setCart} user_id={user.id} setOrder={setOrder} setPrice={setPrice} order={order} price={price} user={user}/>;
    })
    return ( <>

      
      
      <h1 className="cartTitle" style={{ color: 'white'}} >CART</h1>


      {/* <b className="cartTotal" style={{ color: 'white'}} >Items in Cart: {currentCart.cart_count}</b>
            <b className="cartTotal" style={{ marginLeft: "12px", color: 'white' }}>Total:</b>
            <b className="cartTotal" style={{ marginLeft: "75%", color: 'white' }}>
            ${currentCart.cart_sum}.00
            
            <StripeCheckout style={{ marginLeft: "12px" }}
            stripeKey="pk_test_51Kftu6EMJuFFtZ9wHfaQkAbiO1ffCOVYN2Us633XKZFzBltBCPTbxM9YL84Q27aEld2eHOR0ScEgvC7xP2TREihc00JMlUTZib"
            token={handleToken}
            billingAddress
            shippingAddress
            amount={currentCart.cart_sum * 100}
            name={"cart"}
            />
            </b> */}
      
        <div className="Cart">
          
          <div className="Cart-container">        
          {cards}
          <hr className="totalLine"></hr>
          <span>
            {thankYou ? <> <h1 id="thankyou" style={{ color: 'white'}} >Thank you for your purchess!</h1> </>: null}
          </span>

          <div className="History">
           <h1 className="pHistory">Purchase History</h1>
          {hCards}</div>
          </div>
          
          <div className="buy">
          <b className="cartTotal" style={{ color: 'white'}} >Items in Cart: {currentCart.cart_count}</b>
            <b className="cartTotal" id="cartCards" style={{ marginLeft: "12px", color: 'white' }}>Total:</b>
            <b className="cartTotal" style={{ marginLeft: "75%", color: 'white' }}>
            ${currentCart.cart_sum}.00
            
            <StripeCheckout style={{ marginLeft: "12px" }}
            stripeKey="pk_test_51Kftu6EMJuFFtZ9wHfaQkAbiO1ffCOVYN2Us633XKZFzBltBCPTbxM9YL84Q27aEld2eHOR0ScEgvC7xP2TREihc00JMlUTZib"
            token={handleToken}
            billingAddress
            shippingAddress
            amount={currentCart.cart_sum * 100}
            name={"cart"}
            />
            <Button style={{ backgroundColor: '#76b900', marginLeft: '50px'}} variant="success" onClick={handleCartDelete} >Delete all cart</Button>
            
            </b>
            </div>
        </div>
        </>
      );
}

export default Cart;