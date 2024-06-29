import Image from "next/image";
import Link from "next/link";
import landingImg from "@/assets/undraw_dev_productivity_re_fylf.svg";
import GithubSVG from "@/assets/Octicons-mark-github.svg";

export default function LandingPage() {
    return (
        <div className="flex min-h-screen items-center justify-evenly flex-wrap">
            <div className="relative w-[35rem] h-[30rem]">
                <Image src={landingImg} alt="landingSvg" fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-3">
                <div className="text-6xl flex font-black">
                    <div className="text-green-500">P</div>
                    <div className="text-orange-500">S</div>
                    <div className="text-violet-500">M</div>
                    <div className="text-green-500">S</div>
                    <div className="ml-4 font-bold">Scraped</div>
                </div>
                <div className="text-2xl font-bold">frontend with all hidden(relevent data)</div>
                <div className="text-2xl font-bold">(subject to changes - by PSD)</div>
                <Link href={"/stations"} className="py-2 text-center rounded-lg shadow-xl bg-blue-500 w-[15rem] my-4">
                    Enter
                </Link>

                <a href="https://github.com/Rohitkk432/psms-data-api" target="_blank" className="flex gap-2 items-center mt-8">
                    <div className="relative w-[1.75rem] h-[1.75rem]">
                        <Image src={GithubSVG} alt="github" fill className="object-cover" />
                    </div>
                    <div className="font-semibold text-xl text-blue-300">Rohitkk432</div>
                </a>
                <div className="text-lg">scraper, frontend for self use</div>
            </div>
        </div>
    );
}
