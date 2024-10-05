import { images } from 'assets';
import React from 'react';

interface UserAvatarProps {
    avatarSrc: string;
    vipLevel: number;
    isBlocked?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ avatarSrc, vipLevel, isBlocked }) => {
    return (
        <div className="bg-editUser relative flex items-center px-[2vw] xl:rounded-[1vw] rounded-[2vw] xl:h-[8vw] xl:!w-[20vw] !w-full h-[32vw]">
            <div className="flex items-center gap-[0.1vw]">
                <img src={avatarSrc} alt="Avatar" className="xl:w-[5vw] sm:w-[16vw] w-[18vw]" />
                <div className="!text-white box-total w-full">
                    <div className="flex items-center box-total">
                        <img src={images[`Level${vipLevel}`]} alt={`Level ${vipLevel}`} className="xl:w-[4vw] w-[16vw]" />
                        <p className="text-titleLevel">Vip {vipLevel}</p>
                    </div>
                </div>
                <div className="absolute top-[1vw] right-[1vw]">
                    {isBlocked ? <img src={images.errorIcon} alt="Error" className="xl:w-[1.5vw] w-[8vw]" /> : <img src={images.checkIcon} alt="Check" className="xl:w-[1.5vw] w-[8vw]" />}
                </div>
            </div>
        </div>
    );
};

export default UserAvatar;
