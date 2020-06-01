import React, { useState, useContext } from 'react';

import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

import './auth-page.scss';
import { AuthContext } from '../context/AuthContext';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="">
                Firelink
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function LogIn() {
    const classes = useStyles();
    const { showToast } = useMessage()
    const { loading, request } = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    const auth = useContext(AuthContext)

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form });
            showToast(data.message, 'success');

            auth.login(data.token, data.userId)
        } catch (error) { }
    }

    return (
        <Container component="main" maxWidth="xs">
            {loading ? <div><LinearProgress /></div> : null}
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Zaloguj się
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email adres"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={form.email}
                    onChange={changeHandler}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Hasło"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={form.password}
                    onChange={changeHandler}
                />
                {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                /> */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={loginHandler}
                >
                    Zaloguj się
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link to="/" variant="body2">
                            Zapomniałeś hasło?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/signup" variant="body2">
                            Nie masz jeszcze konta? Zarejestruj się
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}