import React from 'react'
import "./HotDeal.css";
const HotDeal = () => {
  return (
    <div className='HotContainer'>
      <div className="title">
        <h1>Hot Deals</h1>
      </div>
       <div className="hotcard">
            <div className="card1">
              <h2>Tables and Chairs</h2>
              <img src="https://m.media-amazon.com/images/I/51GKJK63mxL._AC_UL320_.jpg" alt="" srcset="" />
              <h2>Starting at <strong>₹2000</strong></h2>
            </div>
            <div className="card1">
            <h2>Notbook</h2>
              <img src="https://m.media-amazon.com/images/I/61eYApdaTDL._AC_UL320_.jpg" alt="" srcset="" />
              <h2>Starting at <strong>₹100</strong></h2>
            </div> 
            <div className="card1">
            <h2>Science Kit</h2>
            <img src="https://m.media-amazon.com/images/I/71flpMokoIL._AC_UL320_.jpg" alt="" srcset="" />
            <h2>Starting at <strong>₹500</strong></h2>
            <p>*Inclusive for all offers</p>
            </div>
            <div className="card1">
            <h2> Flash Cards Alphabet</h2>
            <img src="https://m.media-amazon.com/images/I/81hX3yKEV9L._AC_UL320_.jpg" alt="" srcset="" />
            <h2>Starting at <strong>₹500</strong></h2>
            <p>*Inclusive for all offers</p>
            </div>
       </div>
    </div>
  )
}

export default HotDeal
