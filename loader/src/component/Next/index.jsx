import { useEffect, useState } from "react";
import "./style.css";
function Loader() {
  let [photo, setPhoto] = useState([]);
  let [error, seterror] = useState();
  let [loading, setLoading] = useState(false);
  let [count, setCount] = useState(0);
  let [disabledbtn, setdisabled] = useState(false);
  // let url='https://dummyjson.com/products?limit=10&skip=10';

  let fetchurl = async () => {
    try {
      setLoading(true);
      let data = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${
          count === 0 ? 0 : count * 20
        }`
      );
      console.log(data);
      let product = await data.json();
      console.log(product.products);
      // if(product!=""){
      //     setPhoto(product.products);
      // }

      if (product && product.products && product.products.length) {
       setPhoto((prev)=>[...prev,...product.products])
    
        setLoading(false);
      }
      console.log(product);
    } catch (err) {
      seterror(err.message);
      console.log(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchurl();
  }, [count]);

  useEffect(() => {
    if (photo && photo.length ===70) setdisabled(true);
  }, [photo]);

  return (
    <div className="container">
      <div className="product-container">
        {photo && photo.length
          ? photo.map((item,index) => (
              <div className="product" key={`${item.id}-${index}`}>
                <img
                  style={{ width: "220px", height: "220px" }}
                  src={item.thumbnail}
                  alt={item.title}
                />
                <p>{item.title}</p>
              </div>
            ))
          : null}
      </div>
      <div className="button-content">
        <button disabled={disabledbtn} onClick={() => setCount(count + 1)}>
          Load More Products
        </button>
        {disabledbtn ? <p>You have reached 100 products</p> : null}
      </div>
    </div>
  );
}

export default Loader;
