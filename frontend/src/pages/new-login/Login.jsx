import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import AuthAPI from "../../api/AuthAPI";
import { useAuthStore } from "../../store/useAuthStore";
import { errorMessage, successMessage } from "../../utils/Alert";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Link,
  Grid,
  Paper,
} from "@mui/material";
import Swal from "sweetalert2"; // Import SweetAlert
import login_back from "../../pages/img/login_back.png"; // Background image

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!email) {
      isValid = false;
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      errors.email = "Email is invalid";
    }

    if (!password) {
      isValid = false;
      errors.password = "Password is required";
    } else if (password.length < 6) {
      isValid = false;
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);
    return isValid;
  };

  const redirectToDashboard = () => {
    navigate("/");
  };

  const { mutate } = useMutation({
    mutationFn: AuthAPI.login,
    onSuccess: (res) => {
      login(res.data.user, res.data.token);
      successMessage("Success", res.data.message, redirectToDashboard);
    },
    onError: (err) => {
      errorMessage("Error", err.response.data.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await AuthAPI.login({ email, password });
        const { data } = response;
        login(data.user, data.token);
        Swal.fire({
          title: "Success",
          text: data.message,
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${login_back})`,
        backgroundSize: "cover",
        padding: "20px",
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Paper
            elevation={3}
            style={{
              padding: "30px",
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
            }}
          >
            <Typography variant="h5" align="center" gutterBottom>
              Welcome to Electrigen
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                id="email"
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
                style={{ marginTop: "20px" }}
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
              <Typography
                variant="body2"
                align="center"
                style={{ marginTop: "10px" }}
              >
                <RouterLink to="/forgot-password">Forgot Password?</RouterLink>
              </Typography>
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                onClick={() => (window.location.href = "/login")}
              >
                Login as a Distributor
              </button>
            </form>
            {/* <Typography variant="body2" align="center" mt={2}>
              Don't have an account?{" "}
              <Link component={RouterLink} to="/new-signup" underline="hover">
                Sign Up
              </Link>
            </Typography> */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;

/*import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import AuthAPI from "../../api/AuthAPI";
import { useAuthStore } from "../../store/useAuthStore";
import { errorMessage, successMessage } from "../../utils/Alert";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Button, Card, CardContent, TextField, Typography, Link, Grid } from "@mui/material";
import Swal from "sweetalert2"; // Import SweetAlert

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!email) {
      isValid = false;
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      errors.email = "Email is invalid";
    }

    if (!password) {
      isValid = false;
      errors.password = "Password is required";
    } else if (password.length < 6) {
      isValid = false;
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);
    return isValid;
  };

  const redirectToDashboard = () => {
    navigate("/");
  };
//module to execute weather actions happen successfully
  const { mutate } = useMutation({
    mutationFn: AuthAPI.login,
    onSuccess: (res) => {
      login(res.data.user, res.data.token);
      successMessage("Success", res.data.message, redirectToDashboard);
    },
    onError: (err) => {
      errorMessage("Error", err.response.data.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

 

const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    setIsLoading(true);
    try {
      const response = await AuthAPI.login({ email, password });
      const { data } = response;
      login(data.user, data.token);
      Swal.fire({
        title: "Success",
        text: data.message,
        icon: "success",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }
};


  return (
    <div
      style={{
        backgroundColor: "#233066", 
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container justifyContent="center" mt={4}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                Login 
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Login"}
                </Button>
                <RouterLink to="/forgot-password">Forgot Password</RouterLink>
              </form>
              {/*<Typography variant="body2" align="center" mt={2}>
                Don't have an account?{" "}
                <Link component={RouterLink} to="/new-signup" underline="hover">
                  Sign Up
                </Link>
    </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;*/
