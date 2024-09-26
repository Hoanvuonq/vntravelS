import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
    username_user: Yup.string().required('Tên đăng nhập là bắt buộc'),
    password_user: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password_user')], 'Mật khẩu phải khớp')
        .required('Xác nhận mật khẩu là bắt buộc'),
    passBank_user: Yup.string().required('Mật Khẩu Rút Tiền là bắt buộc'),
    phone_user: Yup.string().matches(/^\d+$/, 'Số điện thoại phải là số').required('Số điện thoại là bắt buộc'),
});
