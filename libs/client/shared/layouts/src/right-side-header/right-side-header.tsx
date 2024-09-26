import { useNavigate } from 'react-router-dom';
import styles from './right-side-header.module.scss';
import { Pill } from '@avi/client/shared/components';

export function RightSideHeader() {
  const navigate = useNavigate();
  return (
    <nav className={styles['container']}>
      <div>
        <Pill onClick={() => navigate('/portfolios')}>Portfolios</Pill>
      </div>
      <div>
        <Pill onClick={() => navigate('/account')}>Account</Pill>
      </div>
    </nav>
  );
}

export default RightSideHeader;
