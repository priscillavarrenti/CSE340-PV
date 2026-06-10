import bcrypt from 'bcrypt';
import { createUser } from '../models/users.js';

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

export {
    showUserRegistrationForm,
    processUserRegistrationForm
};