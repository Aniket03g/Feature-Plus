import './globals.css';
import type { Metadata } from 'next';
import styles from './layout.module.css'; // Import the CSS module

export const metadata: Metadata = {
  title: 'FeaturePlus',
  description: 'Next.js frontend with Radix UI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <nav className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h1 className={styles.logo}>FeaturePlus</h1>
          </div>
          <div className={styles.navSection}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <a href="/" className={styles.navLink}>Home</a>
              </li>
              <li className={styles.navItem}>
                <a href="/create" className={styles.navLink}>Create User</a>
              </li>
              <li className={styles.navItem}>
                <a href="/projects" className={styles.navLink}>Projects</a>
              </li>
              <li className={styles.navItem}>
                <a href="/create-project" className={styles.navLink}>Create Project</a>
              </li>
            </ul>
          </div>
        </nav>
        <main className={styles.mainContent}>{children}</main>
      </body>
    </html>
  );
}