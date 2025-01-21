import Title from "./Components/Title";
import Button from "./Components/Button";
import { useState } from "react";
import Label from "./Components/Label";
import Textbox from "./Components/Textbox";
import Product from "./Components/Product";
import Friend from "./Components/Friend";

function App() {
  const [titleVis, setTitleVis] = useState(true);
  const [btnVis, setBtnVis] = useState(true);
  const [loginVis, setLoginVis] = useState(false);
  const [signinVis, setSigninVis] = useState(false);
  const [mainPageVis, setMainPageVis] = useState(false);

  function handleLoginClick() {
    setTitleVis(false);
    setBtnVis(false);
    setLoginVis(true);
    setMainPageVis(false);
  }

  function handleSignupClick() {
    setTitleVis(false);
    setBtnVis(false);
    setSigninVis(true);
    setMainPageVis(false);
  }

  function handleFriendClick(): void {
    throw new Error("Function not implemented.");
    //supposed to update listgroupproducts for the friends' list
  }

  function handleConfirmClick() {
    //validation rip
    setTitleVis(false);
    setBtnVis(false);
    setLoginVis(false);
    setSigninVis(false);
    setMainPageVis(true);
  }
  function handleBackClick() {
    setTitleVis(true);
    setBtnVis(true);
    setLoginVis(false);
    setSigninVis(false);
    setMainPageVis(false);
  }

  function onProductRemove(): void {
    throw new Error("Function not implemented.");
    //supposed to remove product from a list
  }

  return (
    <>
      <div id="Start Page">
        {/*Start page start*/}
        {titleVis && <Title />}
        {btnVis && (
          <div className="container text-center">
            <div className="row justify-content-around">
              <Button
                children="Log in"
                color="secondary"
                onClick={handleLoginClick}
              />
              <Button
                children="Sign up"
                color="secondary"
                onClick={handleSignupClick}
              />
            </div>
          </div>
        )}
      </div>
      {/*Start page end*/}
      <div id="Login Page" className="container text-center">
        {/*Login page start*/}

        {loginVis && (
          <>
            <div className="row justify-content-start">
              <Label column="3">User/Email:</Label>
              <Textbox column="8"></Textbox>
            </div>
            <div className="row justify-content-start">
              <Label column="3">Password:</Label>
              <Textbox column="8"></Textbox>
            </div>
            <div className="row justify-content-around">
              <Button
                children="Back"
                color="secondary"
                onClick={handleBackClick}
              />
              <Button
                children="Confirm"
                color="secondary"
                onClick={handleConfirmClick}
              />
            </div>
          </>
        )}
      </div>
      {/*Login page end*/}

      <div id="Sign in Page">
        {/*Signin page start*/}

        {signinVis && (
          <>
            <div className="row">
              <Label column="3">Username:</Label>
              <Textbox column="8"></Textbox>
            </div>
            <div className="row">
              <Label column="3">Email:</Label>
              <Textbox column="8"></Textbox>
            </div>
            <div className="row">
              <Label column="3">Password:</Label>
              <Textbox column="8"></Textbox>
            </div>
            <div className="row">
              <Label column="3">Confirm password:</Label>
              <Textbox column="8"></Textbox>
            </div>
            <div className="row justify-content-around">
              <Button
                children="Back"
                color="secondary"
                onClick={handleBackClick}
              />
              <Button
                children="Confirm"
                color="secondary"
                onClick={handleConfirmClick}
              />
            </div>
          </>
        )}
      </div>
      {/*Signin page end*/}

      <div id="Main Page">
        {/*Main page start*/}

        {mainPageVis && (
          <>
            <div className="row">
              {/*These two need to be replaced with the listgroup variants*/}
              <Friend name={"George"} onClick={handleFriendClick}></Friend>{" "}
              <Product
                name={"produs"}
                category="other"
                onRemove={onProductRemove}
              ></Product>
            </div>
          </>
        )}
      </div>
      {/*Signin page end*/}
    </>
  );
}

export default App;
