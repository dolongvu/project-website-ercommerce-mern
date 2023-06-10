import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { backend_url, server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import moment from 'moment';

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Đặt hàng cập nhật!");
        navigate("/dashboard-orders");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
    .put(
      `${server}/order/order-refund-success/${id}`,
      {
        status,
      },
      { withCredentials: true }
    )
    .then((res) => {
      toast.success(" Đã cập nhật đơn đặt hàng!");
      dispatch(getAllOrdersOfShop(seller._id));
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
  }

  console.log(data?.status);


  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Chi tiết đơn hàng</h1>
        </div>
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} !w-[180px] !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
          >
            Danh sách đơn hàng
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
        ID đơn hàng:<span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
        Đặt vào: <span>{moment(data?.createdAt).format("DD/MM/YYYY")}</span>
      
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {data &&
        data?.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5">
            <img
              src={`${backend_url}/${item.images[0]}`}
              alt=""
              className="w-[80x] h-[80px]"
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
              { new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.discountPrice)} x {item.qty}
              </h5>
            </div>
          </div>
        ))}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
        Tổng giá: <strong>  { new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data?.totalPrice)}</strong>
      

        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[23px] font-[600]">Địa chỉ giao hàng:</h4>
          <h4 className="pt-3 text-[20px]">
          <span className="font-[600]">Địa chỉ 1:</span>  {data?.shippingAddress.address1}
          <br/>
          <span className="font-[600]">Địa chỉ 2:</span>  {data?.shippingAddress.address2}   
          </h4>
          <h4 className=" text-[20px] "> <span className="font-[600]">Quốc gia:</span>  {data?.shippingAddress.country}</h4>
          <h4 className=" text-[20px]"> <span className="font-[600]">Thành phố:</span>  {data?.shippingAddress.city}</h4>
          <h4 className=" text-[20px]"> <span className="font-[600]">Số điện thoại:</span>  {data?.user?.phoneNumber}</h4>
        </div>
        <div className=" 800px:w-[40%] ">
          <h4 className="pt-3 text-[20px] font-[600]">Thông tin thanh toán:</h4>
          <h4>
            Trạng thái:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status :
             <>
            <span className="text-[#e94560]">Không được thanh toán</span>
            </>}
          </h4>
        </div>
      </div>
      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Trạng thái đơn hàng:</h4>
      {data?.status !== "Xử lý hoàn tiền" && data?.status !== "Hoàn tiền thành công" && (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[270px] mt-2 border h-[35px] rounded-[5px]"
        >
          {[
            "Đang xử lý",
            "Chuyển giao cho đối tác giao hàng",
            "Đang giao",
            "Nhận",
            "Trên đường đi",
            "Gửi",
          ]
            .slice(
              [
                "Đang xử lý",
                "Chuyển giao cho đối tác giao hàng",
                "Đang giao",
                "Nhận",
                "Trên đường đi",
                "Gửi",
              ].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
        </select>
      )}
      {
        data?.status === "Xử lý hoàn tiền" || data?.status === "Hoàn tiền thành công" ? (
          <select value={status} 
       onChange={(e) => setStatus(e.target.value)}
       className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
      >
        {[
            "Xử lý hoàn tiền",
            "Hoàn tiền thành công",
          ]
            .slice(
              [
                "Xử lý hoàn tiền",
                "Hoàn tiền thành công",
              ].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
      </select>
        ) : null
      }

      <div
        className={`${styles.button} !w-[180px] mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px]`}
        onClick={data?.status !== "Xử lý hoàn tiền" ? orderUpdateHandler : refundOrderUpdateHandler}
      >
        Cập nhật trạng thái
      </div>
    </div>
  );
};

export default OrderDetails;
