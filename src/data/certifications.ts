import type { Certification } from "@/types/content";

/**
 * Your certifications.
 *
 * Every entry below is verified against the actual certificate PDF (they live
 * in `public/certificates/`), so titles, issuers and dates are real. Each
 * `credentialUrl` points at its own PDF on this site, which is what the
 * "View Certificate" button opens.
 *
 * To add a certification, copy the whole { ... } block and change the values.
 * `id` must be unique. Leave a field `null` if you genuinely don't have it —
 * it renders as visible "to be added" text (or is omitted, for `credentialId`)
 * rather than inventing a value.
 */
export const certifications: Certification[] = [
  {
    id: "fortigate-7-6-operator",
    title: "FortiGate 7.6 Operator Self-Paced",
    issuer: "Fortinet Training Institute",
    dateIssued: "13 October 2026",
    // The Fortinet certificates do not print a credential ID.
    credentialId: null,
    credentialUrl: "/certificates/FortiGate-7.6-Operator-Self-Paced.pdf",
    image: "/images/certifications/fortigate-7-6-operator.jpg",
    imageAlt:
      "Fortinet Training Institute certificate awarded to Jessica Miranda for completing FortiGate 7.6 Operator Self-Paced, 13 October 2026.",
    status: "issued",
  },
  {
    id: "introduction-to-next-generation-firewall-1-0",
    title: "Introduction to Next Generation Firewall 1.0",
    issuer: "Fortinet Training Institute",
    dateIssued: "12 October 2026",
    credentialId: null,
    credentialUrl:
      "/certificates/Introduction-to-Next-Generation-Firewall-1.0.pdf",
    image: "/images/certifications/next-gen-firewall-1-0.jpg",
    imageAlt:
      "Fortinet Training Institute certificate awarded to Jessica Miranda for completing Introduction to Next Generation Firewall 1.0, 12 October 2026.",
    status: "issued",
  },
  {
    id: "cybersecurity-and-cloud-fundamentals-1-0",
    title: "Cybersecurity and Cloud Fundamentals 1.0",
    issuer: "Fortinet Training Institute",
    dateIssued: "12 October 2026",
    credentialId: null,
    credentialUrl: "/certificates/Cybersecurity-and-Cloud-Fundamentals-1.0.pdf",
    image: "/images/certifications/cybersecurity-and-cloud-fundamentals.jpg",
    imageAlt:
      "Fortinet Training Institute certificate awarded to Jessica Miranda for completing Cybersecurity and Cloud Fundamentals 1.0, 12 October 2026.",
    status: "issued",
  },
  {
    id: "data-analytics-essentials",
    title: "Data Analytics Essentials",
    /**
     * The certificate reads "offered by DICT-ITU DTC Initiative through the
     * Cisco Networking Academy program". Cisco Networking Academy is the
     * program printed on the certificate itself; the DICT-ITU DTC Initiative
     * and the instructor are both visible in the preview image.
     */
    issuer: "Cisco Networking Academy",
    dateIssued: "20 September 2026",
    credentialId: "bff9e929-e07a-4d56-ba6c-812f9e688da3",
    // The certificate PDF, served from this site. Replace with a public
    // verification URL (e.g. Credly/Badgr) if you have one.
    credentialUrl: "/certificates/Data-Analytics-Essentials.pdf",
    image: "/images/certifications/data-analytics-essentials.jpg",
    imageAlt:
      "Data Analytics Essentials certificate awarded to Jessica Lindsey Miranda by Cisco Networking Academy, completed 20 September 2026.",
    status: "issued",
  },
];

/** Human-readable labels for the certification status chip. */
export const certificationStatusLabels: Record<Certification["status"], string> =
  {
    unconfirmed: "TBC",
    issued: "Issued",
    "in-progress": "In Progress",
    planned: "Planned",
  };

/** Copy shown when a field has not been filled in yet. */
export const certificationPlaceholders = {
  issuer: "Issuing organisation to be added",
  date: "Date to be added",
  credentialId: "Credential ID to be added",
} as const;
