import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { images } from 'assets';
import Input from 'components/input';
import Button from 'components/button';
import ToastProvider from 'hooks/useToastProvider';
import { useDispatch } from 'react-redux';
import { loginAdmin } from 'redux/reducer/apiRequest';

const loginSchema = Yup.object().shape({
    adminUsername: Yup.string().required('Username is required'),
    adminPassword: Yup.string().required('Password is required'),
});

const LoginAdmin = () => {
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

    const onSubmit = async (data: { adminUsername: string; adminPassword: string }) => {
        const response = await loginAdmin(data, dispatch);
        if (response.success) {
            ToastProvider('success', 'Admin login successful');
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } else {
            ToastProvider('error', response.message || 'Admin Login Failed');
        }
    };

    return (
        <div className="bg-login">
            <div className="all-center flex-wrap min-h-screen py-0 relative z-20">
                <div className="bg-white xl:w-[26vw] lg:w-[40vw] md:w-[50vw] sm:w-[60vw] w-[80vw] xl:rounded-[1vw] lg:rounded-[1.6vw] md:rounded-[2vw] sm:rounded-[2.4vw] rounded-[3vw] xl:py-[3vw] py-[7vw] xl:px-[3vw] lg:px-[5vw] md:px-[9vw] px-[10vw]">
                    <div className="flex-col all-center w-full xl:gap-[1.5vw] lg:gap-[2.5vw] md:gap-[3vw] sm:gap-[3.5vw] gap-[4vw]">
                        <img src={images.logoTravel} alt="logo VN-Travel" className="xl:w-[14vw] lg:w-[17vw] md:w-[21vw] sm:w-[27vw] w-[31vw] rounded-[1vw] shadow-xl" />
                        <Input icon="user" type="text" Label="Tài Khoản" placeholder="Tài Khoản" hasError={!!errors.adminUsername} register={register} name="adminUsername" error={errors.adminUsername?.message} />
                        <Input
                            icon="lock"
                            type="password"
                            Label="Mật Khẩu"
                            placeholder="Mật Khẩu"
                            hasError={!!errors.adminPassword}
                            register={register}
                            name="adminPassword"
                            error={errors.adminPassword?.message}
                            value={watch('adminPassword')}
                        />
                        <Button title="Login" onClick={handleSubmit(onSubmit)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginAdmin;
