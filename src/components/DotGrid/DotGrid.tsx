/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
import styles from './DotGrid.module.scss';

import Dot from '../Dot';

type dotGridProps = {
  coordinatesArray: boolean[];
  itemId: string;
};

const DotGrid = ({ coordinatesArray, itemId }: dotGridProps): JSX.Element => {
  const rows: JSX.Element[] = [];
  coordinatesArray.map((isRed, index) => {
    const dotRows = rows.push(<Dot isRed={isRed} className="redDot" key={index} />);
    return dotRows;
  });
  return (
    <div id={itemId} className={styles.DotGrid}>
      {rows}
    </div>
  );
};

export default DotGrid;
