import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return <main className="mt-12 mx-10">
    <Link href="/routine/new" className="p-4 border rounded-xl">
      Crete new routine
    </Link>
  </main>;
}
