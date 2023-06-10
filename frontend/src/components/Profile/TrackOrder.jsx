import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      {" "}
      <>
        {data && data?.status === "Đang xử lí" ? (
          <h1 className="text-[20px]">Đơn đặt hàng của bạn đang được xử lý tại cửa hàng.</h1>
        ) : data?.status === "Chuyển giao cho đối tác giao hàng" ? (
          <h1 className="text-[20px]">
            Đơn đặt hàng của bạn đang trên đường đến đối tác giao hàng.
          </h1>
        ) : data?.status === "Vận chuyển" ? (
          <h1 className="text-[20px]">
            Đơn đặt hàng của bạn đang được thực hiện với đối tác giao hàng của chúng tôi.
          </h1>
        ) : data?.status === "Nhận" ? (
          <h1 className="text-[20px]">
            Đơn đặt hàng của bạn là trong thành phố của bạn. Nhân viên giao hàng của chúng tôi sẽ giao nó.
          </h1>
        ) : data?.status === "Trên đường đi" ? (
          <h1 className="text-[20px]">
            Người giao hàng của chúng tôi sẽ giao đơn đặt hàng của bạn.
          </h1>
        ) : data?.status === "Gửi" ? (
          <h1 className="text-[20px]">Đơn đặt hàng của bạn đã được giao!</h1>
        ) : data?.status === "Xử lý hoàn tiền" ? (
          <h1 className="text-[20px]">Khoản tiền hoàn lại của bạn đang được xử lý!</h1>
        ) : data?.status === "Hoàn tiền thành công" ? (
          <h1 className="text-[20px]">Đơn hàng của bạn hoàn thành công!</h1>
        ) : null}
      </>
    </div>
  );
};

export default TrackOrder;
