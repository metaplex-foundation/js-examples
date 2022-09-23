import type { NextPage } from 'next'
import Image from 'next/image'

import styles from 'styles/Home.module.css'

const Footer: NextPage = () => (
  <footer className={styles.footer}>
    <a href="https://metaplex.com" target="_blank" rel="noopener noreferrer">
      Powered by{' '}
      <div className={styles.logo}>
        <Image src="/metaplex.png" alt="Metaplex Logo" width={24} height={24} />
      </div>
    </a>
  </footer>
)

export default Footer
