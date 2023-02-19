import Head from "next/head";
import Image from "next/image";
import Search from "../Components/Search";
import SearchBar from "../Components/SearchBar";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [hackData, setHackData] = useState(null);

    const setHackDataHandler = (data) => {};

    return (
        <>
            <Head>
                <title>HackByFlight</title>
            </Head>
            <main>
                <SearchBar setHackData={setHackDataHandler} />
                <Search hackData={hackData} />
            </main>
        </>
    );
}
