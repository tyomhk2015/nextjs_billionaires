import styles from "./Person.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPerson } from "../api/billionAPI";
import Head from "next/head";
import Image from "next/image";

export default function PersonPage() {
  const [person, setPerson] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    (async () => {
      const fetchedData = await getPerson(id);
      const response = await fetchedData.json();
      setPerson(response);
    })();
  }, []);

  console.log(person);

  return (
    <>
      <Head>
        <title>💸 {person ? person.name : "Who might be this person?"}</title>
      </Head>
      <div className={styles["wrapper"]}>
        <Link href="/">
          <a className={styles["back-link"]}>
            <svg
              fill="white"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </Link>
        <h1 className={styles["title"]}>
          {person ? person.name : "Who might be this person?"}
        </h1>
        <div className={styles["bio-wrapper"]}>
          <div className={styles["profile"]}>
            {person && person.squareImage && (
              <Image
                className={styles["photo"]}
                src={person && person.squareImage}
                alt={person && person.name}
                width={400}
                height={400}
              />
            )}
            {person && (
              <p className={styles["nationality"]}>
                {person && person.city}, {person && person.country}
              </p>
            )}
          </div>
          <div className={`${styles["introduction"]} ${styles["frame"]} `}>
            {person ? (
              person.about.map((about, index) => <p key={index}>{about}</p>)
            ) : (
              <p>What background does this person have?</p>
            )}
            {person ? (
              person.bio.map((bioEl, index) => <p key={index}>{bioEl}</p>)
            ) : (
              <p>What background does this person have?</p>
            )}
          </div>
        </div>
        <div className={`${styles["financial-stats"]} ${styles["frame"]}`}>
          <div>
            <h2>Owned Assets</h2>
            <div className={styles["owned-assets"]}>
              {person &&
                person.financialAssets.map((asset, index) => {
                  return (
                    <p>
                      {asset.companyName} / {asset.numberOfShares} (Share)
                    </p>
                  );
                })}
            </div>
          </div>
          <div>
            <h2>Industries</h2>
            <div className={styles["industries"]}>
              {person &&
                person.industries.map((industry, index) => {
                  return <p>{industry}</p>;
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// about: Array(2)
// 0: "Arnault apparently wooed his wife, Helene Mercier, a concert pianist, by playing Chopin and other classical composers on the piano."
// 1: "Every Saturday, Arnault visits as many as 25 stores -- including both his and those of his competitors."
// length: 2
// [[Prototype]]: Array(0)
// bio: Array(5)
// 0: "Bernard Arnault oversees the LVMH empire of some 70 fashion and cosmetics brands, including Louis Vuitton and Sephora."
// 1: "In January 2021, LVMH acquired American jeweler Tiffany & Co for $15.8 billion, believed to be the biggest luxury brand acquisition ever."
// 2: "LVMH spent $3.2 billion in 2019 for luxury hospitality group Belmond, which owns or manages 46 hotels, trains and river cruises."
// 3: "His father made a small fortune in construction; Arnault got his start by putting up $15 million from that business to buy Christian Dior in 1985."
// 4: "Four of Arnault's five children work in corners of the LVMH empire: Frédéric, Delphine, Antoine and Alexandre."
// length: 5
// [[Prototype]]: Array(0)
// city: "Paris"
// country: "France"
// financialAssets: Array(3)
// 0: {exchange: 'EURONEXT PARIS', ticker: 'CA-FR', companyName: 'Carrefour S.A.', numberOfShares: 0, sharePrice: 19.477409952113263, …}
// 1: {exchange: 'EURONEXT PARIS', ticker: 'RMS-FR', companyName: 'Hermes International S.C.A.', numberOfShares: 1974000, sharePrice: 1030.6058713304185, …}
// 2: {exchange: 'EURONEXT PARIS', ticker: 'MC-FR', companyName: 'LVMH Moet Hennessy Louis Vuitton', numberOfShares: 236236000, sharePrice: 574.4326462627524, …}
// length: 3
// [[Prototype]]: Array(0)
// id: "bernard-arnault"
// industries: Array(1)
// 0: "Fashion & Retail"
// length: 1
// [[Prototype]]: Array(0)
// name: "Bernard Arnault & family"
// netWorth: 138959.14
// position: 2
// squareImage: "https://specials-images.forbesimg.com/imageserve/5dc05

// companyName: "Wells Fargo"
// currencyCode: "USD"
// currentPrice: 37.65
// exchange: "NYSE"
// exchangeRate: 1
// interactive: false
// numberOfShares: 0
// sharePrice: 38.17
// ticker: "WFC-US"
