import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import styles from "./contact.module.css";

const contactLinks = [
  { icon: <FaEnvelope size={24} />, href: "mailto:nqoy132@gmail.com" },
  { icon: <FaLinkedin size={24} />, href: "https://www.linkedin.com/in/nqoy/" },
  { icon: <FaGithub size={24} />, href: "https://github.com/nqoy" },
];

const Contact = () => {
  return (
    <section className={styles.contact} id = "contact">
      <h2>Get in Touch</h2>
      <p>Feel free to reach out!</p>
      <ul>
        {contactLinks.map(({ icon, href }, index) => (
          <li key={index}>
            <a href={href} target="_blank" rel="noopener noreferrer">
              {icon}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Contact;
