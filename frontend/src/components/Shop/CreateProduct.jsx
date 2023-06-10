import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { categoriesData } from "../../static/data";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/actions/product";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [id, setId] = useState();

  const [name, setName] = useState("");
  const [shortDescription, setshortDescription] = useState("");
  const [longDescription, setlongDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("id", id);
    newForm.append("name", name);
    newForm.append("shortDescription", shortDescription);
    newForm.append("longDescription", longDescription);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    dispatch(createProduct(newForm));
  };
  
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [{ font: [] }], // fonts
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ 'list': 'ordered' }, { 'list': 'bullet'},{ 'list': 'check'}, { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'script': 'super' }, { 'script': 'sub' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [ 'link', 'image', 'video', 'formula' ],
      [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
      
    ],
  };
  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Tạo sản phẩm</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Tên sản phẩm <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên sản phẩm.."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
          Mô tả ngắn<span className="text-red-500">*</span>
          </label>
          {/* <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description..."
          ></textarea> */}
          
        <ReactQuill
          theme="snow"
          value={shortDescription}
          modules={modules}
          onChange={setshortDescription}
          placeholder="Nhập mô tả ngắn của sản phẩm..."
        />
        </div>
        <br/>
        <div>
          <label className="pb-2">
          Mô tả dài <span className="text-red-500">*</span>
          </label>
          {/* <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description..."
          ></textarea> */}
          
        <ReactQuill
          theme="snow"
          required
          value={longDescription}
          modules={modules}
          onChange={setlongDescription}
          placeholder="Nhập mô tả dài của sản phẩm...."
        />
        </div>

        <br />
        <div>
          <label className="pb-2">
            Loại <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Chọn loại sản phẩm..</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">Thẻ</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Nhập thẻ sản phẩm..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Giá gốc</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Nhập giá gốc..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
          Giá (Có giảm giá) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Nhập giá đã giảm..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
           Số lượng tồn<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Nhập số lượng tồn của sản phẩm..."
          />
        </div>

        <br />
        <div>
          <label className="pb-2">
            Tải hình ảnh sảm phẩm <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>
        </div>
        <br />
        <div>
          <input
            type="submit"
            value="Tạo"
            // bg-black text-white
            className="mt-2  cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;