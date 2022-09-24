import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function SearchProduct() {
  let location = useLocation();
  let products = useSelector((state) => state.all.products);
  const [matchingProducts, setmatchingProducts] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    let re = new RegExp(location.state, "i");
    let tempProducts = products.filter((data) => re.test(data.name));
    setmatchingProducts(tempProducts);
  }, [location,products]);
  return (
    <>
      {matchingProducts.length ? (
        <div className="container row mt-4">
          {matchingProducts.map((data, index) => {
            return (
              <div key={index} className="column">
                <div className="card hovering">
                  <div
                    onClick={() => {
                      navigate("/product/" + data.id);
                    }}
                  >
                    <img src={data.image_url} className="image" alt="..." />
                    <p className="h6">{data.name}</p>
                  </div>
                  <div className="d-flex justify-content-around">
                    {data.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <center style={{ paddingTop: "20%" }}>
          No records found in wishlist
        </center>
      )}
    </>
  );
}

export default SearchProduct;
