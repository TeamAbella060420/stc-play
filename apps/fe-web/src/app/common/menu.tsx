import { RootState } from '@fe-monorepo/store';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function Menu() {
  const theme = useSelector((state: RootState) => state.app.themes);

  const userState = useSelector((state:RootState)=> state.user.userContext)

  const { t } = useTranslation();

  const testClick = ()=>
  {
    console.log(userState);
  }

  return (
    <div className="container">
      <nav>
      </nav>
    </div>
  );
}

export default Menu;
