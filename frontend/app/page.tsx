"use client"
import styles from "./page.module.css"
import SearchBar from "@/components/SearchBar"
import Link from "next/link"

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heading}>How can we help you?</h1>
        <SearchBar showLoginRequiredMessage />
        <Link href="/overview">Click for an overview of complaint counts</Link>
      </section>
    </div>
  )
}
