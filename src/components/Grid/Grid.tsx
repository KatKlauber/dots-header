/* eslint-disable react/require-default-props */
import styles from './Grid.module.scss';

type GridProps = {
  colsSmall?: number;
  colsMedium?: number;
  flipMedium?: boolean;
  negateCellPadding?: boolean;
  className?: string;
  elementType?: string;
  children: JSX.Element | JSX.Element[];
};

const Grid = ({
  colsSmall = 1,
  colsMedium = 2,
  flipMedium = false,
  negateCellPadding = false,
  className = '',
  elementType = 'div',
  children,
}: GridProps): JSX.Element => {
  const classes = [className, styles.Grid];

  if (colsSmall === 1) {
    classes.push(styles.GridSmallOneCol);
  }

  if (colsSmall === 2) {
    classes.push(styles.GridSmallTwoCols);
  }

  if (colsSmall === 4) {
    classes.push(styles.GridSmallFourCols);
  }

  if (colsMedium === 1) {
    classes.push(styles.GridMediumOneCol);
  }

  if (colsMedium === 2) {
    classes.push(styles.GridMediumTwoCols);
  }

  if (colsMedium === 4) {
    classes.push(styles.GridMediumFourCols);
  }

  if (flipMedium) {
    classes.push(styles.GridMediumFlip);
  }

  if (negateCellPadding) {
    classes.push(styles.negateCellPadding);
  }

  return elementType !== 'div' ? (
    <ul className={classes.join(' ')}>{children}</ul>
  ) : (
    <div className={classes.join(' ')}>{children}</div>
  );
};

type CellProps = {
  padding?: boolean;
  widthMedium?: number;
  widthLarge?: number;
  widthXlarge?: number;
  className?: string;
  elementType?: string;
  children: JSX.Element | JSX.Element[];
};

const Cell = ({
  padding = true,
  widthMedium = -1,
  widthLarge = -1,
  widthXlarge = -1,
  className = '',
  elementType = 'div',
  children,
}: CellProps): JSX.Element => {
  const classes = [className, styles.Cell];

  if (padding) {
    classes.push(styles.CellPadding);
  }

  if (widthMedium === 20) {
    classes.push(styles.CellMediumWidth20);
  }

  if (widthMedium === 25) {
    classes.push(styles.CellMediumWidth25);
  }

  if (widthMedium === 33) {
    classes.push(styles.CellMediumWidth33);
  }
  if (widthMedium === 40) {
    classes.push(styles.CellMediumWidth40);
  }

  if (widthMedium === 60) {
    classes.push(styles.CellMediumWidth60);
  }

  if (widthMedium === 66) {
    classes.push(styles.CellMediumWidth66);
  }

  if (widthMedium === 75) {
    classes.push(styles.CellMediumWidth75);
  }

  if (widthLarge === 20) {
    classes.push(styles.CellLargeWidth20);
  }

  if (widthLarge === 25) {
    classes.push(styles.CellLargeWidth25);
  }

  if (widthLarge === 33) {
    classes.push(styles.CellLargeWidth33);
  }

  if (widthLarge === 40) {
    classes.push(styles.CellLargeWidth40);
  }

  if (widthLarge === 60) {
    classes.push(styles.CellLargeWidth60);
  }

  if (widthLarge === 66) {
    classes.push(styles.CellLargeWidth66);
  }

  if (widthLarge === 75) {
    classes.push(styles.CellLargeWidth75);
  }

  if (widthXlarge === 20) {
    classes.push(styles.CellXlargeWidth20);
  }

  if (widthXlarge === 25) {
    classes.push(styles.CellXlargeWidth25);
  }

  if (widthXlarge === 33) {
    classes.push(styles.CellXlargeWidth33);
  }

  if (widthXlarge === 40) {
    classes.push(styles.CellXlargeWidth40);
  }

  if (widthXlarge === 60) {
    classes.push(styles.CellXlargeWidth60);
  }

  if (widthXlarge === 66) {
    classes.push(styles.CellXlargeWidth66);
  }

  if (widthXlarge === 75) {
    classes.push(styles.CellXlargeWidth75);
  }

  return elementType !== 'div' ? (
    <li className={classes.join(' ')}>{children}</li>
  ) : (
    <div className={classes.join(' ')}>{children}</div>
  );
};

export { Grid, Cell };
