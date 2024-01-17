/* eslint-disable max-len */
import styles from './BouncingArrow.module.scss';

const BouncingArrow = (): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    viewBox="0 0 44 44"
    className={styles.BouncingArrow}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M44.00000011 21.80280996l-1.97962536-1.99714642-18.62095 18.7806918L23.39944643 7.9e-7 20.60057829-8e-7l-.00002167 38.58635456-18.6209289-18.78071272L1.2e-7 21.80278525 21.99998763 44l22.00001247-22.19719004z"
    />
  </svg>
);

export default BouncingArrow;
