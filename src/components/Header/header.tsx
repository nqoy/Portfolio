import styles from "./header.module.css";

type headerProps = {
  title: string;
};

export const Header = ({ title }: headerProps): JSX.Element => {
  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <nav>
        <ul className={styles.navList}>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
