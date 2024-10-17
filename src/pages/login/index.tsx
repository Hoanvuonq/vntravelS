import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { images } from 'assets';
import Input from 'components/input';
import Button from 'components/button';
import ToastProvider from 'hooks/useToastProvider';
import { useDispatch } from 'react-redux';
import { loginUser } from 'redux/reducer/apiRequest';

const loginSchema = Yup.object()
    .shape({
        username: Yup.string(),
        phone: Yup.number().transform((value, originalValue) => (originalValue === '' ? undefined : value)),
        password: Yup.string().required('Password is required'),
    })
    .test('atLeastOne', 'Either username or phone is required', function (value) {
        return (value.username && value.username.length > 0) || value.phone !== undefined;
    })
    .test('usernameRequired', 'Username is required when phone is empty', function (value) {
        if (!value.phone && (!value.username || value.username.length === 0)) {
            return this.createError({ path: 'username', message: 'Username is required' });
        }
        return true;
    })
    .test('phoneRequired', 'Phone is required when username is empty', function (value) {
        if ((!value.username || value.username.length === 0) && value.phone === undefined) {
            return this.createError({ path: 'phone', message: 'Phone is required' });
        }
        return true;
    })
    .test('phoneIsNumber', 'Phone must be a number', function (value) {
        if (value.phone !== undefined && isNaN(value.phone)) {
            return this.createError({ path: 'phone', message: 'Phone must be a number' });
        }
        return true;
    });

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: any) => {
        try {
            const response = await loginUser(data, dispatch);
            if (response.success) {
                ToastProvider('success', 'Đăng nhập thành công');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                ToastProvider('error', response.message || 'Đăng Nhập Thất Bại');
            }
        } catch (error) {
            console.error('Login error:', error);
            ToastProvider('error', 'Đã xảy ra lỗi khi đăng nhập');
        }
    };

    return (
        <div className="bg-login">
            <div className="all-center flex-wrap min-h-screen py-0 relative z-20">
                <div className="bg-white xl:w-[26vw] lg:w-[48vw] md:w-[58vw] sm:w-[68vw] w-[90vw] xl:rounded-[1vw] lg:rounded-[1.6vw] md:rounded-[2vw] sm:rounded-[2.4vw] rounded-[3vw] xl:py-[3vw] lg:py-[6vw] md:py-[5vw] sm:py-[6vw] py-[12vw] xl:px-[3vw] lg:px-[5vw] md:px-[9vw] px-[8vw]">
                    <div className="flex-col all-center w-full xl:gap-[1.5vw] lg:gap-[2.5vw] md:gap-[3vw] sm:gap-[3.5vw] gap-[6vw]">
                        <img src={images.logoTravel} alt="logo VN-Travel" className="xl:w-[14vw] lg:w-[17vw] md:w-[21vw] sm:w-[27vw] w-[40vw] xl:rounded-[1vw] rounded-[3vw] shadow-custom-3" />
                        <Input
                            icon="user"
                            type="text"
                            Label="Tên / Số điện thoại"
                            placeholder="Tên / Số điện thoại"
                            hasError={!!errors.username || !!errors.phone}
                            register={register}
                            name="username"
                            error={errors.username?.message || errors.phone?.message}
                        />
                        <Input
                            icon="lock"
                            type="password"
                            Label="Mật khẩu"
                            placeholder="Mật khẩu"
                            hasError={!!errors.password}
                            register={register}
                            name="password"
                            error={errors.password?.message}
                            value={watch('password')}
                        />
                        <Link to={'https://t.me/VNTravel_cskh'} target="_blank" className="text-poppins text-noteLogin text-cusLogin w-full text-end hover:text-blue font-medium cursor-pointer hover:text-blue-600">
                            Quên mật khẩu?
                        </Link>

                        <Button title="Đăng Nhập" onClick={handleSubmit(onSubmit)} />
                        <div className="flex items-center text-cusLogin notes cursor-pointer xl:gap-[0.4vw] gap-[2vw] xl:tracking-[0.1vw] tracking-[0.2vw]">
                            <span className="text-noteLogin">Bạn chưa có tài khoản?</span>
                            <Link to="/register" className="!font-bold text-noteLogin hover:text-blue-600">
                                Đăng ký
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
