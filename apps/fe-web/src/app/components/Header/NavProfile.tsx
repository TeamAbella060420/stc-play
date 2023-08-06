import { useUserProfile } from '@fe-monorepo/hooks';
import useMobileDetect from '../../hooks/useMobileDetect';
import SkeletonPlaceholder from './SkeletonPlaceholder';
import UserProfile from './UserProfile';
import GuestProfile from './GuestProfile';
import usePageLayout from '../../hooks/usePageLayout';

const NavProfile = () => {
    const { btnClass, handleLanguageToggle } = usePageLayout();
    const { loading, user } = useUserProfile();
    const isMobile = useMobileDetect();

    if (!isMobile)
    {
        if (loading)
        {
            return <SkeletonPlaceholder/>
        }

        return user?.username? <UserProfile/> : <GuestProfile btnClass={btnClass} handleLanguageToggle={handleLanguageToggle}/>
    }
    return null;
}

export default NavProfile;
