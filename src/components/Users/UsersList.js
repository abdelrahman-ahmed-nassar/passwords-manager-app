// import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "../UI/Card";

import classes from "./UsersList.module.css";

import { uiActions } from "../../store/ui-slice";

const UserList = (props) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const deleteItemHandler = (event) => {
    dispatch(uiActions.showConfirming(event.target.id));
  };

  return (
    <Card className={classes.users}>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <p>
                username: {user.name} <br /> password: {user.password}
              </p>
              <button id={user.id} onClick={deleteItemHandler}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};
export default UserList;
