/* eslint-disable react/require-default-props */
import { useEffect, useRef, useState } from 'react';
import styles from './Dot.module.scss';

type dotProps = {
  isOverlappingText1?: boolean;
  isOverlappingText2?: boolean;
  isOverlappingArrow?: boolean;
  className?: string;
  isRed?: boolean;
};

const Dot = ({
  isOverlappingText1,
  isOverlappingArrow,
  isOverlappingText2,
  className,
  isRed,
}: dotProps): JSX.Element => {
  const [isRedDot, setIsRedDot] = useState<boolean>(true);
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const handleDotOverlap = (): void => {
    if (isOverlappingText1 || isOverlappingArrow || isOverlappingText2) {
      setIsRedDot(false);
    }
  };
  useEffect(() => {
    if (mounted.current === true) {
      handleDotOverlap();
    }
  }, [mounted.current]);
  return (
    <div className={className}>
      <div className={`${styles.redDot} ${!isRedDot || !isRed ? styles.hideRedDot : ''}`}>
        <svg viewBox="0 0 100 100" className={styles.circle}>
          <circle cx="50%" cy="50%" r="50%" stroke="none" />
        </svg>
      </div>
    </div>
  );
};

export default Dot;
