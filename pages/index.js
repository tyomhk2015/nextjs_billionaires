import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllPeople } from "./api/billionAPI";
import styles from "./Index.module.css";

export default function IndexPage() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    (async () => {
      const peopleData = await (await getAllPeople()).json();
      const peopleArr = Object.values(peopleData).map((person) => {
        return person;
      });
      setPeople(peopleArr);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>💸 Nomad Billionaires</title>
      </Head>
      <div className={styles["wrapper"]}>
        <h1 className={styles["title"]}>💸 Nomad Billionaires</h1>
        {people?.length !== 0 && (
          <ul className={styles["list"]}>
            {people.map((person) => (
              <li key={person.id}>
                <div className={styles["card"]}>
                  <Link href={`/person/${person.id}`}>
                    <a className={styles["link"]}>
                      <Image
                        className={styles["photo"]}
                        src={person.squareImage}
                        alt={person.name}
                        width={400}
                        height={400}
                      />
                      <span className={styles["name"]}>{person.name}</span>
                      <span className={styles["industry-list"]}>
                        {person.industries.map((industry) => (
                          <span key={industry} className={styles["industry"]}>
                            {industry}
                          </span>
                        ))}
                      </span>
                      <span className={styles["net-worth"]}>
                        ${person.netWorth}
                      </span>
                    </a>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
