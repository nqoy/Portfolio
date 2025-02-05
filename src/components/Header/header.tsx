import { useState, useEffect } from 'react';
import styles from './header.module.css';

type headerProps = { title: string };

export const Header = ({ title }: headerProps) => {
  const [activeLink, setActiveLink] = useState<string>('');

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
            setTimeout(() => setActiveLink(''), 1200);
          }
        });
      }
    );
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveLink(id);
    setTimeout(() => setActiveLink(''), 1200);
  };

  const navItems = ['about', 'projects', 'contact'];

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <nav>
        <ul className={styles.navList}>
          {navItems.map((navItem) => (
            <li key={navItem}>
              <a
                href={`#${navItem}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(navItem);
                }}
                className={activeLink === navItem ? styles.activeNav : ''}
              >
                {navItem.charAt(0).toUpperCase() + navItem.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
