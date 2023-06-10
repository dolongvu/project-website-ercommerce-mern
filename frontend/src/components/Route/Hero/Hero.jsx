import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import hero from "./hero_banner.jpg";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[60vh] 800px:min-h-[60vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage: `url(${hero})`,
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#e9e6e6] font-[600] capitalize font-Poppins`}
        >
          Ưu đãi hấp dẫn
          <br /> Giá giẻ bất ngờ
        </h1>
        <p className="pt-5 text-[16px] font-[400] text-[#000000ba]">
          Gặp gỡ SHopO, công ty có mục tiêu cung cấp các lựa chọn bán hàng do
          các doanh nghiệp hiện nay.<br/> ShopO chất lượng: bên cạnh tính thời trang, sản phẩm đa dạng, hệ
          thống phân phối lớn với nhận diện<br/> được chuẩn hoá,..., chất lượng sản
          phẩm là yếu tố được Owen ưu tiên hàng đầu. Bền vải, bền màu, không<br/> gây
          hại  cho sức khoẻ người mặc làm cam kết của Owen đối với từng thiết kế
          được đưa ra thị trường hiện nay.
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Mua ngay
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
