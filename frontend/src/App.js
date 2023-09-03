import React, { useEffect, useState } from "react";
import List from "./components/List";
import axios from "axios";
import { baseURL } from "./utils/constant";

const App = () => {
  const [inputName, setInputName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputItemName, setInputItemName] = useState("");
  const [inputItemPrice, setInputItemPrice] = useState("");
  const [users, setUsers] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateUserId, setUpdateUserId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, [updateUI]);

  const addUser = () => {
    axios
      .post(`${baseURL}/save`, {
        name: inputName,
        password: inputPassword,
        items: [{ name: inputItemName, price: Number(inputItemPrice) }],
      })
      .then((res) => {
        console.log(res.data);
        setInputName("");
        setInputPassword("");
        setInputItemName("");
        setInputItemPrice("");
        setUpdateUI((prevState) => !prevState);
      });
  };

  const updateMode = (id, user) => {
    setInputName(user.name);
    setInputPassword(user.password);
    setInputItemName(user.items[0].name);
    setInputItemPrice(user.items[0].price);
    setUpdateUserId(id);
  };

  const updateUser = () => {
    axios
      .put(`${baseURL}/update/${updateUserId}`, {
        name: inputName,
        password: inputPassword,
        items: [{ name: inputItemName, price: Number(inputItemPrice) }],
      })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setUpdateUserId(null);
        setInputName("");
        setInputPassword("");
        setInputItemName("");
        setInputItemPrice("");
      });
  };

  return (
    <main>
      <h1 className="title">CRUD Operations for Users</h1>

      <div className="input_holder">
        <input
          type="text"
          placeholder="Name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />

        <input
          type="text"
          placeholder="Item Name"
          value={inputItemName}
          onChange={(e) => setInputItemName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Item Price"
          value={inputItemPrice}
          onChange={(e) => setInputItemPrice(e.target.value)}
        />

        <button type="submit" onClick={updateUserId ? updateUser : addUser}>
          {updateUserId ? "Update User" : "Add User"}
        </button>
      </div>

      <ul>
        {users.map((user) => (
          <List
            key={user._id}
            id={user._id}
            user={user}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>
    </main>
  );
};

export default App;
