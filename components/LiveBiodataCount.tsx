"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

const FALLBACK_COUNT = 540;

export default function LiveBiodataCount() {
  const [count, setCount] = useState<number>(FALLBACK_COUNT);

  useEffect(() => {
    const counterRef = doc(db, "stats", "biodata");

    const unsubscribe = onSnapshot(
      counterRef,
      (snapshot) => {
        const value = snapshot.data()?.createdTodayCount;
        setCount(typeof value === "number" ? value : FALLBACK_COUNT);
      },
      () => {
        setCount(FALLBACK_COUNT);
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
      <span className="text-[#d7dbe4]">•</span>
      {count} biodatas created today
    </>
  );
}
