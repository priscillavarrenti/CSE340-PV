import bcrypt from 'bcrypt';
import { createUser, authenticateUser } from '../models/users.js';

const showUserRegistrationForm = (req, res) => {
    res.render('register', {
        title: 'Register'
    });
};

const processUserRegistrationForm = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const salt = await bcrypt.genSalt(10);

        const passwordHash = await bcrypt.hash(
            password,
            salt
        );

        await createUser(
            name,
            email,
            passwordHash
        );

        req.flash(
            'success',
            'Registration successful!'
        );

        res.redirect('/');

    } catch (error) {

        console.error(error);

        req.flash(
            'error',
            'Registration failed.'
        );

        res.redirect('/register');
    }
};

const showLoginForm = (req, res) => {
    res.render('login', {
        title: 'Login'
    });
};

const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(
            email,
            password
        );

        if (user) {
            req.session.user = user;

            req.flash(
                'success',
                'Login successful!'
            );

            console.log(
                'User logged in:',
                user
            );

            return res.redirect('/');
        }

        req.flash(
            'error',
            'Invalid email or password.'
        );

        res.redirect('/login');

    } catch (error) {
        console.error(error);

        req.flash(
            'error',
            'Login failed.'
        );

        res.redirect('/login');
    }
};

const processLogout = (req, res) => {
    delete req.session.user;

    req.flash(
        'success',
        'Logout successful!'
    );

    res.redirect('/login');
};

export {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout
};