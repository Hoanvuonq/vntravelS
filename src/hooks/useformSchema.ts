import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
    username_user: Yup.string().required('Username is required'),
    password_user: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password_user')], 'Passwords must match')
        .required('Confirm Password is required'),
    passBank_user: Yup.string().required('Mật Khẩu Rút Tiền is required'),
    phone_user: Yup.string().matches(/^\d+$/, 'Phone Number must be digits').required('Phone Number is required'),
});
