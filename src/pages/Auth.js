/* This file defines the Login Page */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import Icon from "../components/Icon";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Paper,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { signin, signup } from "../actions/authActions";

// Custom styles
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    padding: "0px:",
    margin: "0px",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
    backgroundColor: "#fd2f00",
  },
}));

// Initial empty login details
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// Default Function
const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isSignUp, setIsSignUp] = useState(false);
  const [authForm, setAuthForm] = useState(initialState);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Call everytime  user is signing in and goes to products page
  useEffect(() => {
    if (userInfo) {
      history.push("/products");
    }
  }, [history, userInfo]);

  // Google Login successful
  const googleSuccess = async (res) => {
    console.log(res);
    const result = res?.profileObj;

    try {
      const form = {
        firstName: result.givenName,
        lastName: result.familyName,
        email: result.email,
        password: result.googleId,
      };

      await dispatch(signup(form));
    } catch (error) {
      console.log(error);
    }
  };

  // Google Login Fail
  const googleFaliure = () => {
    console.log("Google Sign In Unsuccessful. Try Again Later");
  };

  // Sign up form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if user is signing up
    if (isSignUp) {
      // Check if all fields are not empty and password don't match
      if (
        !authForm.firstName ||
        !authForm.lastName ||
        !authForm.email ||
        !authForm.password ||
        authForm.password !== authForm.confirmPassword
      ) {
        alert("Please fill all fields or password does not matched !");
      } else {
        e.currentTarget.textContent = "Signing up ....";
        dispatch(signup(authForm));
      }
    } else {
      if (!authForm.email || !authForm.password) {
        alert("Please fill all fields !");
      } else {
        e.currentTarget.textContent = "Signing in ...";
        dispatch(signin(authForm));
      }
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {/* Left side displays a random image */}
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      {/* Right side displays Sign in form */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {/* Sign in Icon */}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          {/* Switch text between sign in or sign up */}
          <Typography component="h1" variant="h5">
            {`${isSignUp ? "Sign up" : "Sign In"}`}
          </Typography>

          {/* Form */}
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  {/* Input field for first name */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={(e) =>
                        setAuthForm({
                          ...authForm,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  {/* Input field for last name */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="lname"
                      name="lastName"
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      autoFocus
                      onChange={(e) =>
                        setAuthForm({
                          ...authForm,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </Grid>
                </>
              )}

              {/* Input field for email */}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) =>
                    setAuthForm({
                      ...authForm,
                      email: e.target.value,
                    })
                  }
                />
              </Grid>
              {/* Input field for password */}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) =>
                    setAuthForm({
                      ...authForm,
                      password: e.target.value,
                    })
                  }
                />
              </Grid>
              {/* Input field for confirm password */}
              {isSignUp && (
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Confirm Password"
                    type="password"
                    id="conf_password"
                    autoComplete="confirm-password"
                    onChange={(e) =>
                      setAuthForm({
                        ...authForm,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </Grid>
              )}
            </Grid>
            {/* Button to submit Sign up Form */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              {`${isSignUp ? "Sign up" : "Sign In"}`}
            </Button>

            {/* Google Login Button */}
            <GoogleLogin
              clientId="593545739793-87mmbon8qqnqd7kk8b4cqhpqs4mq5ivo.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  startIcon={<Icon />}
                  variant="contained"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Google Log In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFaliure={googleFaliure}
              cookiePolicy="single_host_origin"
            />
            {/* Switch between signing in or signing up */}
            <Grid container justify="flex-end">
              <Grid item>
                <Link
                  to="#"
                  variant="body2"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSignUp((val) => !val);
                  }}
                >{`${
                  isSignUp
                    ? "Already have an account? Sign in"
                    : "Dont have an account? Sign up"
                }`}</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Auth;
