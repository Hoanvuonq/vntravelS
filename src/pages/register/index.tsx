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
            invitationCode: data.invitationCode_user,
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
            <div className="all-center flex-wrap min-h-screen xl:py-[2vw] py-[4vw] relative z-20">
                <div className="bg-white xl:w-[26vw] lg:w-[48vw] md:w-[58vw] sm:w-[68vw] w-[90vw] xl:rounded-[1vw] lg:rounded-[1.6vw] md:rounded-[2vw] sm:rounded-[2.4vw] rounded-[3vw] xl:py-[3vw] lg:py-[6vw] md:py-[5vw] sm:py-[6vw] py-[12vw] xl:px-[3vw] lg:px-[5vw] md:px-[9vw] px-[8vw]">
                    <div className="flex-col all-center w-full xl:gap-[1.5vw] lg:gap-[3vw] sm:gap-[4vw] gap-[8vw]">
                        <img src={images.logoTravel} alt="logo VN-Travel" className="xl:w-[14vw] lg:w-[17vw] md:w-[21vw] sm:w-[27vw] w-[40vw] xl:rounded-[1vw] rounded-[3vw] shadow-custom-3" />
                        <Input icon="phone" type="number" Label="Số Điện Thoại" placeholder="Số điện thoại" hasError={!!errors.phone_user} register={register} name="phone_user" error={errors.phone_user?.message} />
                        <Input icon="user" type="text" Label="Tên Đăng Nhập" placeholder="Tên đăng nhập" hasError={!!errors.username_user} register={register} name="username_user" error={errors.username_user?.message} />
                        <Input
                            icon="lock"
                            type="password"
                            Label="Mật Khẩu"
                            placeholder="Mật khẩu"
                            hasError={!!errors.password_user}
                            register={register}
                            name="password_user"
                            error={errors.password_user?.message}
                            value={passwordValue}
                        />
                        <Input
                            icon="lock"
                            type="password"
                            Label="Xác nhận Mật Khẩu"
                            placeholder="Xác nhận mật khẩu"
                            hasError={!!errors.confirm_password}
                            register={register}
                            name="confirm_password"
                            error={errors.confirm_password?.message}
                            value={confirmPasswordValue}
                        />
                        <Input
                            icon="lock"
                            type="number"
                            Label="Mật Khẩu Rút Tiền"
                            placeholder="Mật khẩu rút tiền"
                            hasError={!!errors.passBank_user}
                            register={register}
                            name="passBank_user"
                            error={errors.passBank_user?.message}
                        />
                        <Input icon="lock" type="text" Label="Mã mời" placeholder="Mã mời" hasError={!!errors.passBank_user} register={register} name="invitationCode_user" error={errors.invitationCode_user?.message} />
                        <div className="w-full">
                            <CheckBox id="agree" isChecked={isAgree} label="Đồng ý với các điều khoản" onChange={() => setIsAgree(!isAgree)} />
                        </div>

                        <Button title="Đăng Ký" onClick={handleSubmit(onSubmit)} />

                        <div className="flex items-center text-cusLogin notes cursor-pointer xl:gap-[0.4vw] gap-[2vw] xl:tracking-[0.1vw] tracking-[0.2vw]">
                            <span className="text-noteLogin">Bạn đã có tài khoản?</span>
                            <Link to="/login" className="!font-bold text-noteLogin hover:text-blue-600">
                                Đăng Nhập
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
