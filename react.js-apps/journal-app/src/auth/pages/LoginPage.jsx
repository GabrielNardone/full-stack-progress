import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { startGoogleSignIn, startLoginWithEmailAndPassword } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { ArrowForward, Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from '../../hooks'


const formData = {
  email: "",
  password: ""
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm(formData)

  const isAuthenticating = useMemo(() => status === "checking", [status])

  const onSubmit = (event) => {
    event.preventDefault()

    dispatch(startLoginWithEmailAndPassword({ email, password }))
  }

  const onGoogleSigIn = () => {
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title="Login">

      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >

        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }} >
            <TextField
              label="Email"
              type='email'
              placeholder='email@google.com'
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }} >
            <TextField
              label="Password"
              type='password'
              placeholder='password'
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid
            container
            sx={{ mt: 1 }}
            display={!!errorMessage ? "" : "none"}
          >
            <Grid item xs={12}>
              <Alert severity="error">{errorMessage} </Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant='contained'
                fullWidth
                type="submit"
              >Login</Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant='contained'
                fullWidth
                onClick={onGoogleSigIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}> Google </Typography>
              </Button>
            </Grid>

          </Grid>

          <Grid container direction="row" justifyContent="end">
            <ArrowForward sx={{color: "green", fontSize: 30, mr: 1}} />
            <Link component={RouterLink} color="inherit" to="/auth/register" >
              Create an account
            </Link>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography
              color="green"
              fontSize= "1.5rem"
            >
              Create a fake account to enter
            </Typography>
          </Grid>

        </Grid>

      </form>

    </AuthLayout>
  )
}
