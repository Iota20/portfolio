import { useState } from "react"
import { CONTACT_DATA } from "../data/ContactData"
import { skillIconMap } from "../data/skillIconMap"

function Contact() { 
    const [copyStatus, setCopyStatus] = useState("")
    const phoneNumber = CONTACT_DATA.phone

    const copyPhoneNumber = async () => {
        try {
            await navigator.clipboard.writeText(phoneNumber)
            setCopyStatus("Phone number copied")
        } catch {
            setCopyStatus("Unable to copy phone number")
        }

        window.setTimeout(() => setCopyStatus(""), 2000)
    }

    return (
        <section id="contact" className="border-t-[20px] border-gray-500 pb-16 pt-16 text-center shadow-[0_10px_24px_rgba(0,0,0,0.65)]">
            <h2 className="section-heading">Contact Me</h2>
            <ul className="mx-auto flex list-none items-center justify-center gap-10 p-0">
                <li>
                    <a href={`mailto:${CONTACT_DATA.email}`} aria-label="Email me" title="Email me">
                        <img src={skillIconMap.Email} alt="" className="h-10 w-10 invert" />
                    </a>
                </li>
                <li>
                    <button type="button" onClick={copyPhoneNumber} aria-label={phoneNumber} title={phoneNumber}>
                        <img src={skillIconMap.Phone} alt="" className="h-10 w-10 invert" />
                    </button>
                </li>
                <li>
                    <a href={CONTACT_DATA.socials.github} aria-label="Visit my GitHub" title="GitHub">
                        <img src={skillIconMap.Github} alt="" className="h-10 w-10 invert" />
                    </a>
                </li>
                <li>
                    <a href={CONTACT_DATA.resumeURL} aria-label="View my resume" title="Resume">
                        <img src={skillIconMap.Resume} alt="" className="h-10 w-10 invert" />
                    </a>
                </li>
            </ul>
            <p className="min-h-7 text-sm text-slate-300" role="status" aria-live="polite">
                {copyStatus}
            </p>
        </section>
    )
}   

export default Contact