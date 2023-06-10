import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data,isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
    toast.success("Mặt hàng thêm vào danh sách yêu thích thành công!");
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error(" đã có trong giỏ hàng!");
    } else {
      if (data.stock < 1) {
        toast.error("Mặt hàng này hiện đã hết!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Mặt hàng được thêm vào giỏ hàng thành công!");
      }
    }
  };
  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`${isEvent === true ? `/product/${product_name}?isEvent=true` : `/product/${product_name}`}`}>
          <img
            src={`${backend_url}${data.images && data.images[0]}`}
            alt=""
            className="w-full h-[170px] object-contain"
            title={`${data.name}`}
          />
        </Link>
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`${isEvent === true ? `/product/${product_name}?isEvent=true` : `/product/${product_name}`}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="flex">
          <Ratings rating={data?.ratings} />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              
              <h4 className={`${styles.price}`}>
              {data.originalPrice  ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.originalPrice) : null}
              </h4>
              &ensp;
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice === 0 
                   ?(
                    <>
                  <span className="text-[#000]  font-[500] ">
                    Liên hệ
                  </span>
              
                    </>
                   )
                  : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.discountPrice) }
              </h5>
              
        
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.sold_out} đã bán
            </span>
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Xóa khỏi danh sách yêu thích"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Thêm vào danh sách yêu thích"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Xem nhanh"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Thêm vào giỏ"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
