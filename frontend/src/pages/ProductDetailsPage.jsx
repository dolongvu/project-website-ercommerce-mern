import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import SuggestedProduct from "../components/Products/SuggestedProduct";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const productName = name.replace(/-/g," ");
 

  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i.name === productName);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i) => i.name === productName);
      setData(data);
    }
  }, [allProducts, allEvents]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
        {
          !eventData && (
            <>
            {data && <SuggestedProduct data={data} />}
            </>
          )
        }
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
