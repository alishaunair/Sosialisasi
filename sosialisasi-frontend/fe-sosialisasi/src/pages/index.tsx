import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Button, ButtonGroup } from "@heroui/button";
import PageHead from "@/components/commons/PageHead";
import HomePage from "@/components/views/Dashboard/HomePage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return <HomePage />;
}
