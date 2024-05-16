import Image from "next/image";
import { Inter } from "next/font/google";
import { MyFirstComponent } from "@/components/practice/MyFirstComponent";
import { useState } from "react";

//const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  console.log("index");

  return (
    <>
      <MyFirstComponent>
        <div>First component children</div>
      </MyFirstComponent>
    </>
  );
}
