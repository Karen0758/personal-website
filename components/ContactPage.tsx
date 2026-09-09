"use client";

import { useState } from "react";
import Image from "next/image";
import { contactLinks } from "@/content/portfolio";
import JourneyRail from "@/components/JourneyRail";

function ContactIcon({ type }: { type: string }) {
  if (type === "contact-icon--xiaohongshu") return <Image src="/images/xiaohongshu-sprout-only-v1.png" alt="" width={80} height={80} />;
  if (type === "contact-icon--github") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.48.09.65-.2.65-.46v-1.67c-2.65.58-3.2-1.12-3.2-1.12-.44-1.1-1.08-1.39-1.08-1.39-.88-.6.07-.59.07-.59.98.07 1.5 1 1.5 1 .87 1.5 2.28 1.07 2.84.82.09-.63.34-1.07.62-1.32-2.11-.24-4.33-1.06-4.33-4.7 0-1.04.37-1.88.98-2.54-.1-.24-.43-1.2.09-2.5 0 0 .8-.26 2.62.97a9.1 9.1 0 0 1 4.76 0c1.82-1.23 2.62-.97 2.62-.97.52 1.3.19 2.26.1 2.5.61.66.97 1.5.97 2.54 0 3.65-2.22 4.46-4.34 4.7.35.3.66.87.66 1.76v2.61c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.5Z" /></svg>;
  if (type === "contact-icon--twitter") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.2 3h2.9l-6.34 7.25L22.2 21h-5.77l-4.52-5.91L6.74 21H3.83l6.78-7.76L3.2 3h5.92l4.08 5.4L18.2 3Zm-1.02 15.8h1.6L8.3 5.1H6.58l10.6 13.7Z" /></svg>;
  if (type === "contact-icon--bilibili") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.1 5.2 4.8 2.9m12.1 2.3 2.3-2.3M5 7.1h14a2 2 0 0 1 2 2v8.1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.1a2 2 0 0 1 2-2Z" /><path d="M8 12v2m8-2v2" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.2 3.1c2.9 0 5.6 1.5 7.1 3.9l-1.6 1.1a6.9 6.9 0 0 0-11.4 0L4.7 7a8.4 8.4 0 0 1 7.5-3.9Zm0 4.1a4.3 4.3 0 0 1 3.7 2.1l-1.7 1a2.4 2.4 0 0 0-4.1 0l-1.7-1a4.3 4.3 0 0 1 3.8-2.1Zm0 4.3c1.2 0 2.2.9 2.2 2s-1 2-2.2 2-2.2-.9-2.2-2 1-2 2.2-2Z" /></svg>;
}

export default function ContactPage() {
  const [isFast, setIsFast] = useState(false);
  return <div className="contact-page" aria-label="联系方式">
    <JourneyRail isFast={isFast} />
    <div className="contact-page__inner">
      <h2 onPointerEnter={() => setIsFast(true)} onPointerLeave={() => setIsFast(false)}>保持联系</h2>
    </div>
    <div className="contact-page__links">
      {contactLinks.map((contact) => <a className={`contact-icon ${contact.className}`} href={contact.href} target="_blank" rel="noreferrer" aria-label={contact.label} key={contact.label}><ContactIcon type={contact.className} /></a>)}
    </div>
  </div>;
}
