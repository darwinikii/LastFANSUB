"use client";
import { setCookie as setValue, getCookie, hasCookie } from 'cookies-next';
import { useRouter } from "next/navigation";

export default function MangaReaderChoices({ className }) {
    const router = new useRouter();

    function getValue(key, defaultValue) {
        return hasCookie(key) ? getCookie(key) : defaultValue
    }

    function onChange(e) {
        setValue("type", e.target.value)
        router.refresh()
    }

    return (
        <select className={className} onChange={onChange} value={getValue("type", "Manga")}>
            <option key={"Manga"}>
                Manga
            </option>
            <option key={"Webtoon"}>
                Webtoon
            </option>
        </select>
    )
}