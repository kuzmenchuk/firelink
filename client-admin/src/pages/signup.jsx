import React, { useState } from 'react';

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const { showToast } = useMessage()
    const { loading, request } = useHttp()
    const [form, setForm] = useState({
        email: '', password: '', name: '', linkname: ''
    })

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form });
            showToast(data.message, 'success')
        } catch (error) { }
    }

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
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
                    Zarejestruj się
                </Typography>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="fname"
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Imię"
                            autoFocus
                            value={form.name}
                            onChange={changeHandler}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email adres"
                            name="email"
                            value={form.email}
                            onChange={changeHandler}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Hasło"
                            type="password"
                            id="password"
                            value={form.password}
                            onChange={changeHandler}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="linkname"
                            label="Nazwij swój link"
                            id="linkname"
                            value={form.linkname}
                            onChange={changeHandler}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid> */}
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={registerHandler}
                >
                    Zarejestruj się
                    </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link to='/login' variant="body2">
                            Już masz konto? Zaloguj się
                            </Link>
                    </Grid>
                </Grid>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}