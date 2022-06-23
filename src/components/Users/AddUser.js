import React, { Fragment, useState, useRef } from "react";

import Card from "../UI/Card";

import classes from "./AddUser.module.css";

import Button from "../UI/Button";

// import ErrorModal from "../UI/ErrorModal";

import { usersActions } from "../../store/users-slice";
import { uiActions } from "../../store/ui-slice";

import { useDispatch } from "react-redux";

const AddUser = function (props) {
  const dispatch = useDispatch();
  const nameInput = useRef();
  const passwordInput = useRef();

  // name
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  // password
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);
  const enteredPasswordIsValid = enteredPassword.trim().length > 6;
  const passwordInputIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched;

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  const passwordInputChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const passwordInputBlurHandler = () => {
    setEnteredPasswordTouched(true);
  };

  const fromSubmitHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      dispatch(
        uiActions.showError({
          title: "INVALID USERNAME",
          message: "Username can not be empty!",
        })
      );
      return;
    }

    if (Number.isFinite(+enteredName.slice(0, 1))) {
      dispatch(
        uiActions.showError({
          title: "INVALID USERNAME",
          message: "Username can not start with a number!",
        })
      );
      return;
    }
    if (!enteredPasswordIsValid) {
      dispatch(
        uiActions.showError({
          title: "INVALID PASSWORD",
          message: "Password must be more than 6 characters",
        })
      );
      return;
    }

    setEnteredName("");
    setEnteredNameTouched(false);
    setEnteredPassword("");
    setEnteredPasswordTouched(false);

    dispatch(
      usersActions.addUser({
        name: enteredName,
        password: enteredPassword,
        id: Math.random().toString(),
      })
    );
  };

  const nameInputClasses = nameInputIsInvalid ? "invalid" : "";

  const passwordInputClasses = passwordInputIsInvalid ? "invalid" : "";

  return (
    <Fragment>
      <Card className={classes.input}>
        <form onSubmit={fromSubmitHandler}>
          <div className={nameInputClasses}>
            <label htmlFor="username">Username</label>
            <input
              ref={nameInput}
              id="username"
              type="text"
              onChange={nameInputChangeHandler}
              onBlur={nameInputBlurHandler}
              value={enteredName}
            ></input>
          </div>
          <div className={passwordInputClasses}>
            <label htmlFor="password">Password</label>
            <input
              ref={passwordInput}
              id="password"
              type="text"
              onChange={passwordInputChangeHandler}
              onBlur={passwordInputBlurHandler}
              value={enteredPassword}
            ></input>
          </div>
          <Button type="submit" className={classes.button}>
            Add User
          </Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddUser;
