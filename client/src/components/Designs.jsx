import styles from "../css/landing.module.css";
import alico from "../assets/fallonTower500concave.avif";

const Designs = () => {
  return (
    <>
      <svg className={styles.svg}>
        <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
          <path d="M0,1 L0,.18 C0.22,0.95,0.85,0.5,1,1"></path>
        </clipPath>
      </svg>
      <div className={styles.bottomLeft}></div>
      <svg className={styles.svg}>
        <clipPath id="my-clip-path2" clipPathUnits="objectBoundingBox">
          <path d="M1,-1 L-2450,20 C 1,36,1,-5,1,1.1"></path>
        </clipPath>
      </svg>
      <div className={styles.navSVG}></div>

      <img className={styles["alico-img"]} src={alico} />
    </>
  );
};

export default Designs;
