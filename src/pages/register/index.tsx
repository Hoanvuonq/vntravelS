import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from 'hooks/useformSchema';
import Input from 'components/input';
import Button from 'components/button';
import { registerUser } from 'api/user';
import ToastProvider from 'hooks/useToastProvider';
import { images } from 'assets';
import { Link, useNavigate } from 'react-router-dom';
import CheckBox from 'components/checkBox';
import { useState } from 'react';

const Register = () => {
    const navigate = useNavigate();
    const [isAgree, setIsAgree] = useState(false);

    const {
        handleSubmit,
        formState: { errors },
        register,
        watch,
    } = useForm({
        resolver: yupResolver(formSchema),
    });

    const onSubmit = async (data: any) => {
        if (!isAgree) {
            ToastProvider('error', 'Bạn phải đồng ý với các điều khoản');
            return;
        }

        const newUser = {
            username: data.username_user,
            password: data.password_user,
            confirmPassword: data.confirm_password,
            passBank: data.passBank_user,
            phone: data.phone_user,
        };

        try {
            const res = await registerUser(newUser);
            if (res.status) {
                ToastProvider('success', 'Đăng ký người dùng thành công');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                console.error('Error in response:', res.message);
                ToastProvider('error', res.message || 'Không thể đăng ký tài khoản !!');
            }
        } catch (error: any) {
            console.error('Error creating user:', error);
            ToastProvider('error', error.message || 'Không thể đăng ký tài khoản !!');
        }
    };

    const passwordValue = watch('password_user');
    const confirmPasswordValue = watch('confirm_password');

    return (
        <div className="bg-login">
            {/* <video src={images.introVideo} autoPlay muted loop controls={false} className="w-screen absolute top-0" /> */}
            <div className="all-center flex-wrap min-h-screen xl:py-[2vw] py-[4vw] relative z-20">
                <div className="bg-white xl:w-[26vw] lg:w-[40vw] sm:w-[50vw] w-[90vw] xl:rounded-[1vw] rounded-[4vw] py-[5vw] xl:px-[3vw] lg:px-[5vw] sm:px-[8vw] px-[10vw]">
                    <div className="flex-col all-center w-full xl:gap-[1.5vw] lg:gap-[3vw] sm:gap-[3vw] gap-[5vw]">
                        <img src={images.logoTravel} alt="logo VN-Travel" className="xl:w-[14vw] lg:w-[17vw] md:w-[21vw] sm:w-[27vw] w-[31vw] rounded-[1vw] shadow-xl" />

                        <Input icon="phone" type="number" Label="Số Điện Thoại" placeholder="SỐ ĐIỆN THOẠI" hasError={!!errors.phone_user} register={register} name="phone_user" error={errors.phone_user?.message} />
                        <Input icon="user" type="text" Label="Tên Đăng Nhập" placeholder="TÊN ĐĂNG NHẬP" hasError={!!errors.username_user} register={register} name="username_user" error={errors.username_user?.message} />
                        <Input
                            icon="lock"
                            type="password"
                            Label="Mật Khẩu"
                            placeholder="MẬT KHẨU"
                            hasError={!!errors.password_user}
                            register={register}
                            name="password_user"
                            error={errors.password_user?.message}
                            value={passwordValue}
                        />
                        <Input
                            icon="lock"
                            type="password"
                            Label="Xác nhận mật khẩu"
                            placeholder="XÁC NHẬN MẬT KHẨU"
                            hasError={!!errors.confirm_password}
                            register={register}
                            name="confirm_password"
                            error={errors.confirm_password?.message}
                            value={confirmPasswordValue}
                        />
                        <Input icon="lock" type="number" Label="Mật Khẩu " placeholder="MẬT KHẨU " hasError={!!errors.passBank_user} register={register} name="passBank_user" error={errors.passBank_user?.message} />

                        <div className="w-full">
                            <CheckBox id="agree" isChecked={isAgree} label="Đồng ý với các điều khoản" onChange={() => setIsAgree(!isAgree)} />
                        </div>

                        <Button title="Đăng Ký" onClick={handleSubmit(onSubmit)} />

                        <p className="text-poppins font-light text-[0.8vw] text-cusLogin cursor-pointer w-full text-center">
                            Bạn đã có tài khoản?{' '}
                            <Link to="/login" className="font-medium hover:text-blue">
                                Đăng Nhập
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
