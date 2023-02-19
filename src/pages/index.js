import Head from "next/head";
import Image from "next/image";
import Search from "../Components/Search";
import SearchBar from "../Components/SearchBar";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "../Components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <Head>
                <title>HackByFlight</title>
            </Head>
            <main>
                <Header/>
                <SearchBar />
                <Search />
            </main>
        </>
    );
}
