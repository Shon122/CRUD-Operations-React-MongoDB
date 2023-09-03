import React from "react";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";
import { baseURL } from "../utils/constant";

const List = ({ id, user, setUpdateUI, updateMode }) => {
  const removeUser = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res);
      setUpdateUI((prevState) => !prevState);
    });
  };

  return (
    <li>
      <div>
        <strong>Name:</strong> {user.name}
      </div>
      <div>
        <strong>Password:</strong> {user.password}
      </div>
      <div>
        <strong>Item Name:</strong> {user.items[0].name}
      </div>
      <div>
        <strong>Item Price:</strong> ${user.items[0].price}
      </div>
      <div className="icon_holder">
        <BiEditAlt className="icon" onClick={() => updateMode(id, user)} />
        <BsTrash className="icon" onClick={removeUser} />
      </div>
    </li>
  );
};

export default List;
