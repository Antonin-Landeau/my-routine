import { Button } from "@/Components/ui/Buttons/Button";
import {
  Dumbbell,
  ListChecks,
  ListChecksIcon,
  Plus,
  SmilePlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mt-20">
      <section className="flex items-center my-32">
        <div className="p-10 ml-24 flex flex-col gap-5">
          <h2 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Create Your routine and accomplish task to be the real you
          </h2>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Chaque matin, la routine s&apos;installe doucement : le réveil
            sonne, les yeux s&apos;ouvrent, le café embaume. Une danse familière
            commence, entre travail et repos, ponctuée de petits rituels
            réconfortants.
          </p>
          <div className="flex gap-5">
            <Link href={`/routine/new`}>
              <Button>Crete your Routine</Button>
            </Link>
            <Link href={`/routines`}>
              <Button variant="outline">Join Routine</Button>
            </Link>
          </div>
        </div>
        <div className="ml-20">
          <Image
            className="rounded-tl-3xl rounded-bl-3xl drop-shadow-lg -mr-80"
            src="/landing-hero.png"
            alt="landing-hero-img"
            width={1800}
            height={500}
          />
        </div>
      </section>
      <section className="bg-gradient-to-br from-blue-400 to-emerald-400 py-32 ">
        <h2 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
          Les bienfaits d&apos;une routine
        </h2>
        <p className="mb-6 text-lg font-normal text-slate-100 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center max-w-6xl mx-auto">
          Une routine structurée offre une multitude d&apos;avantages positifs
          pour la santé physique, mentale et émotionnelle. Elle joue un rôle
          essentiel dans la gestion du stress.
        </p>
        <div className="flex gap-20 max-w-7xl mx-auto">
          <div className="p-6 flex flex-col gap-2 rounded-3xl w-96">
            <SmilePlus className="w-10 h-10 text-slate-100 mx-auto " />
            <h3 className="text-center text-gray-900 text-lg font-semibold">
              Réduction du stress et de l&apos;anxiété
            </h3>
            <p className="text-slate-100 text-center">
              Une routine bien établie offre un sentiment de stabilité et de
              prévisibilité, ce qui permet de réduire le stress et
              l&apos;anxiété.
            </p>
          </div>
          <div className="p-6 flex flex-col gap-2 rounded-3xl w-96">
            <ListChecks className="w-10 h-10 text-slate-100 mx-auto " />
            <h3 className="text-center text-gray-900 text-lg font-semibold">
              Amélioration de la productivité
            </h3>
            <p className="text-slate-100 text-center">
              La répétition régulière des activités dans une routine permet de
              gagner en efficacité. En consacrant du temps à des tâches
              spécifiques à des moments définis.
            </p>
          </div>
          <div className="p-6 flex flex-col gap-2 rounded-3xl w-96">
            <Dumbbell className="w-10 h-10 text-slate-100 mx-auto " />
            <h3 className="text-center text-gray-900 text-lg font-semibold">
              Favorise la santé physique et mentale
            </h3>
            <p className="text-slate-100 text-center">
              Une routine équilibrée peut inclure des moments dédiés à
              l&apos;exercice physique, au sommeil régulier et à la détente.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
