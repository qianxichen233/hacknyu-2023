import Head from "next/head";
import Image from "next/image";
import Search from "../Components/Search";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

import FlightCart from "@/Components/UI/Cart/FlightCart";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <Head>
                <title>HackByFlight</title>
            </Head>
            <main>
                <Search className={styles.search} />
            </main>
        </>
    );
}