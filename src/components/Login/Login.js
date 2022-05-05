import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
    const [enteredEmail, setEnteredEmail] = useState("");
    const [emailIsValid, setEmailIsValid] = useState();
    const [enteredPassword, setEnteredPassword] = useState("");
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    //without any dependencies this code run only once at Login component renders
    //note in this function we use; setFormIsValid function, enteredEmail, enteredPassword. So they will be the dependencies
    //accorrdingly the function in the useEffect runs only setFormIsValid or enteredEmail or enteredPassword changed.
    useEffect(() => {
        //this setTimeOut method executed only after 500 miliseconds of stoping the dependency change
        setTimeout(() => {
            console.log("Checking form validity!!");
            setFormIsValid(
                enteredEmail.includes("@") && enteredPassword.trim().length > 6
            );
        }, 500);

        return () => {
            console.log('CLEANUP');
        }
    }, [enteredEmail, enteredPassword]);

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    };

    const validateEmailHandler = () => {
        setEmailIsValid(enteredEmail.includes("@"));
    };

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(enteredEmail, enteredPassword);
    };

    return ( <
        Card className = { classes.login } >
        <
        form onSubmit = { submitHandler } >
        <
        div className = { `${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }` } >
        <
        label htmlFor = "email" > E - Mail < /label>{" "} <
        input type = "email"
        id = "email"
        value = { enteredEmail }
        onChange = { emailChangeHandler }
        onBlur = { validateEmailHandler }
        />{" "} < /
        div > { " " } <
        div className = { `${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }` } >
        <
        label htmlFor = "password" > Password < /label>{" "} <
        input type = "password"
        id = "password"
        value = { enteredPassword }
        onChange = { passwordChangeHandler }
        onBlur = { validatePasswordHandler }
        />{" "} < /
        div > { " " } <
        div className = { classes.actions } >
        <
        Button type = "submit"
        className = { classes.btn }
        disabled = {!formIsValid } >
        Login { " " } <
        /Button>{" "} < /
        div > { " " } <
        /form>{" "} < /
        Card >
    );
};

export default Login;