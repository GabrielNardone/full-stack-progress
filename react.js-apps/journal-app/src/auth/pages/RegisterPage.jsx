import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from "../../hooks";
import { startRegisteringUser } from "../../store/auth";

const formData = {
  email: "",
  password: "",
  displayName: ""
}

const formValidations = {
  email: [(value) => value.includes("@"), "The email must includes an @"],
  password: [(value) => value.length >= 6, "The password must be at least 6 characters"],
  displayName: [(value) => value.length >= 3, "The name must be at least 3 characters"],
}

export const RegisterPage = () => {

  const dispatch = useDispatch()
  const [formSubmited, setFormSubmited] = useState(false)

  const { status, errorMessage } = useSelector(state => state.auth)
  const isCheckingAuthentication = useMemo(() => status === "checking", [status])

  const {
    email, password, onInputChange, displayName, formState,
    isFormValid, passwordValid, emailValid, displayNameValid
  } = useForm(formData, formValidations)

  const onSubmit = (event) => {
    event.preventDefault()
    setFormSubmited(true)

    if (!isFormValid) return;

    dispatch(startRegisteringUser(formState))
  }


  return (
    <AuthLayout title='Register'>
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >

        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }} >
            <TextField
              label="Full name"
              type='text'
              placeholder='Full name'
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmited}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }} >
            <TextField
              label="Email"
              type='email'
              placeholder='email@google.com'
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmited}
              helperText={emailValid}
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
              error={!!passwordValid && formSubmited}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid
              item xs={12}
              display={!!errorMessage ? "" : "none"}
            >
              <Alert severity="error">{errorMessage} </Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                variant='contained'
                fullWidth
                type="submit"
              >
                Create account
              </Button>
            </Grid>

          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>
              Do you already have an account?
            </Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login" >
              Enter
            </Link>
          </Grid>

        </Grid>

      </form>
    </AuthLayout>
  )
}
