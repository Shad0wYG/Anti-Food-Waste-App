import Title from "./Components/Title";
import Button from "./Components/Button";
import { useState } from "react";
import Label from "./Components/Label";
import Textbox from "./Components/Textbox";

function App() {
  const [titleVis, setTitleVis] = useState(true);
  const [btnVis, setBtnVis] = useState(true);
  const [loginVis, setLoginVis] = useState(false);
  const [signinVis, setSigninVis] = useState(false);

  function handleLoginClick() {
    setTitleVis(false);
    setBtnVis(false);
    setLoginVis(true);
  }

  function handleSignupClick() {
    setTitleVis(false);
    setBtnVis(false);
    setSigninVis(true);
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
          </>
        )}
      </div>
      {/*Signin page end*/}
    </>
  );
}

export default App;
