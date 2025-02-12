import React, { useEffect, useState, useContext } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../Context/StoreContext.jsx";

const List = () => {
  const [list, setList] = useState([]);
  const { url } = useContext(StoreContext);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/service/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeService = async (serviceId) => {
    const response = await axios.post(`${url}/api/service/remove`, {
      id: serviceId,
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list-add flex-col">
      {/* <p>All Services List</p> */}
      <h1>All Services List</h1>
      <div className="list-table-container">
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Description</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <img src={`${url}/images/` + item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.description}</p>
                <p>{item.category}</p>
                <p>&#8377; {item.price}</p>
                <p onClick={() => removeService(item._id)} className="cursor">
                  x
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default List;
