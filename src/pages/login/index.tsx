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
        const response = await loginUser(data, dispatch);
        if (response.success) {
            const accessToken = response.data?.accessToken;
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
                ToastProvider('success', 'Đăng nhập thành công');

                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                ToastProvider('error', 'Mã thông báo truy cập bị thiếu');
            }
        } else {
            ToastProvider('error', response.message || 'Đăng Nhập Thất Bại');
        }
    };

    return (
        <div className="bg-login">
            {/* <video src={images.introVideo} autoPlay muted loop controls={false} className="w-screen absolute top-0" /> */}
            <div className="all-center flex-wrap min-h-screen py-0 relative z-20">
                <div className="bg-white xl:w-[26vw] lg:w-[40vw] md:w-[50vw] sm:w-[60vw] w-[80vw] xl:rounded-[1vw] lg:rounded-[1.6vw] md:rounded-[2vw] sm:rounded-[2.4vw] rounded-[3vw] xl:py-[3vw] py-[7vw] xl:px-[3vw] lg:px-[5vw] md:px-[9vw] px-[10vw]">
                    <div className="flex-col all-center w-full xl:gap-[1.5vw] lg:gap-[2.5vw] md:gap-[3vw] sm:gap-[3.5vw] gap-[4vw]">
                        <img src={images.logoTravel} alt="logo VN-Travel" className="xl:w-[14vw] lg:w-[17vw] md:w-[21vw] sm:w-[27vw] w-[31vw] rounded-[1vw] shadow-xl" />
                        <Input
                            icon="user"
                            type="text"
                            Label="Tên / Số Điện Thoại"
                            placeholder="TÊN / SỐ ĐIỆN THOẠI"
                            hasError={!!errors.username || !!errors.phone}
                            register={register}
                            name="username"
                            error={errors.username?.message || errors.phone?.message}
                        />
                        <Input
                            icon="lock"
                            type="password"
                            Label="Mật khẩu"
                            placeholder="MẬT KHẨU"
                            hasError={!!errors.password}
                            register={register}
                            name="password"
                            error={errors.password?.message}
                            value={watch('password')}
                        />
                        <p className="text-poppins xl:text-[0.8vw] lg:text-[1.4vw] md:text-[1.6vw] text-[2vw] text-cusLogin w-full text-end hover:text-blue font-medium cursor-pointer hover:text-blue-600">
                            Quên mật khẩu ?
                        </p>

                        <Button title="Đăng Nhập" onClick={handleSubmit(onSubmit)} />
                        <p className="text-poppins font-light text-cusLogin xl:text-[0.8vw] lg:text-[1.4vw] md:text-[1.6vw] text-[2vw] cursor-pointer flex gap-[0.4vw]">
                            Bạn chưa có tài khoản?
                            <Link to="/register" className="font-bold hover:text-blue-600">
                                Đăng ký
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
