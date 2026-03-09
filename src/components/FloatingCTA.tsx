"use client";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/constants";

export default function FloatingCTA() {
  return (
    <Link 
      href={WHATSAPP_URL}
      target="_blank"
      className="cta-floating"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 11.5C21 16.7467 16.7467 21 11.5 21C9.6543 21 7.93896 20.4736 6.48438 19.5635L3 21L4.43652 17.5156C3.52637 16.061 3 14.3457 3 12.5C3 7.25325 7.25325 3 12.5 3C17.7467 3 22 7.25325 22 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span>Falar com Curador</span>
    </Link>
  );
}
