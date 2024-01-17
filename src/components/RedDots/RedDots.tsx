/* eslint-disable react/require-default-props */
import styles from './RedDots.module.scss';

type dotProps = {
  isOverlapping?: boolean;
  isOverlapping2?: boolean;
  isOverlappingArrow?: boolean;
  className: string;
};

const RedDots = ({
  isOverlapping,
  isOverlappingArrow,
  isOverlapping2,
  className,
}: dotProps): JSX.Element => {
  return (
    <div className={className}>
      <div
        className={`${styles.redDot} ${
          isOverlapping || isOverlappingArrow || isOverlapping2 ? styles.hideRedDot : ''
        }`}
      >
        <svg viewBox="0 0 100 100" className={styles.circle}>
          <circle cx="50%" cy="50%" r="50%" stroke="none" />
        </svg>
      </div>
    </div>
  );
};

export default RedDots;
