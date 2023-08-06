import React from 'react';
import Avatar from 'react-avatar';

interface UserAvatarProps {
    name: string | undefined;
    size?: string;
}
const UserAvatar: React.FC<UserAvatarProps> = ({
    name = 'STC',
    size = '40'
}) => {
    return <Avatar
                name={name}
                round={true}
                size={size}
                className='animate__animated animate__fadeIn'
            />

}
export default UserAvatar;
