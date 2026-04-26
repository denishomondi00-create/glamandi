import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { Badge, EmptyState, FormPreview, GradientButton, InfoPanel, SimpleTable, StatCard, Surface } from "./page-kit";

const propertyRows = [
  ["Glamandi Heights", "Mtwapa", "Bedsitters, 1BR, 2BR", "Available"],
  ["Creek View Apartments", "Mtwapa Creek", "1BR, 2BR", "Few Units"],
  ["Palm Court Residences", "Kilifi County", "Studios, Shops", "Viewing"],
];

export function MarketingHomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(23,222,254,0.28),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(58,196,250,0.18),transparent_32%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
          <div>
            <Badge>Glamandi Property Management Operating System</Badge>
            <h1 className="mt-6 text-5xl font-black tracking-tight text-[#145F6B] sm:text-6xl lg:text-7xl">
              Homes managed with clarity, speed, and trust.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Explore available units, send inquiries, access tenant and landlord portals, and connect with the Glamandi team from one clean digital home.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <GradientButton href="/properties" label="View Available Units" />
              <GradientButton href="/contact" label="Talk to Glamandi" tone="ghost" />
            </div>
          </div>
          <Surface className="relative overflow-hidden bg-gradient-to-br from-[#145F6B] to-[#181918] text-white">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#17DEFE]/20 blur-3xl" />
            <Badge tone="light">Live Operations</Badge>
            <h2 className="mt-6 text-3xl font-black">Website + portals + offline-ready management.</h2>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Glamandi Control Center connects public listings, tenant balances, landlord statements, rent collection, repairs, receipts, and admin reports. Civilization survives another Tuesday.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Portals", value: "4", helper: "Admin, staff, tenant, landlord" },
                { label: "Offline", value: "PWA", helper: "Drafts sync later" },
                { label: "Finance", value: "Audit", helper: "Receipts, payouts, rules" },
              ].map((stat) => <StatCard key={stat.label} stat={stat} />)}
            </div>
          </Surface>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <InfoPanel panel={{ title: "For tenants", description: "View balances, receipts, penalties, utilities, deposits, notices, and repair requests without chasing WhatsApp threads like a public sport.", items: ["Rent balance", "Receipts", "Repair requests"] }} />
          <InfoPanel panel={{ title: "For landlords", description: "See occupancy, statements, deductions, payouts, documents, and property-level performance from one source of truth.", items: ["Monthly statements", "Payout history", "Repair deductions"] }} />
          <InfoPanel panel={{ title: "For Glamandi staff", description: "Run properties, units, tenants, payments, reports, inquiries, and website listings from a focused Control Center.", items: ["Manual payments", "Offline drafts", "Audit logs"] }} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SimpleTable table={{ title: "Featured availability", description: "Public website data should read from approved live listings.", columns: ["Property", "Area", "Units", "Status"], rows: propertyRows }} />
      </section>
    </div>
  );
}

export function MarketingContentPage({ title, eyebrow, description, panels, ctaHref = "/contact", ctaLabel = "Contact Glamandi" }: {
  title: string;
  eyebrow: string;
  description: string;
  panels: Array<{ title: string; description: string; items?: string[] }>;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <Badge>{eyebrow}</Badge>
        <h1 className="mt-6 text-4xl font-black tracking-tight text-[#145F6B] sm:text-6xl">{title}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <GradientButton href={ctaHref} label={ctaLabel} />
          <GradientButton href="/properties" label="View Properties" tone="ghost" />
        </div>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {panels.map((panel) => <InfoPanel key={panel.title} panel={panel} />)}
      </div>
    </section>
  );
}

export function PropertiesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Badge>Available homes</Badge>
          <h1 className="mt-5 text-5xl font-black tracking-tight text-[#145F6B]">Find a home managed with order.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">Browse approved listings from Glamandi Homes. Availability should update from the Control Center, not from somebody’s memory, which is apparently still considered infrastructure.</p>
        </div>
        <GradientButton href="/contact" label="Request Viewing" />
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {propertyRows.map(([name, area, units, status]) => (
          <Surface key={name} className="p-0 overflow-hidden">
            <div className="h-36 bg-gradient-to-br from-[#17DEFE] via-[#32D2F7] to-[#145F6B]" />
            <div className="p-6">
              <Badge>{status}</Badge>
              <h2 className="mt-4 text-2xl font-black text-[#145F6B]">{name}</h2>
              <p className="mt-2 text-sm text-slate-600">{area} · {units}</p>
              <div className="mt-5 flex gap-3">
                <Link className="text-sm font-black text-[#145F6B]" href={`/properties/${name.toLowerCase().replaceAll(" ", "-")}`}>Open property →</Link>
              </div>
            </div>
          </Surface>
        ))}
      </div>
    </section>
  );
}

export function PropertyDetailPage({ slug }: { slug: string }) {
  const title = slug.split("-").map((word) => word[0]?.toUpperCase() + word.slice(1)).join(" ");
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Badge>Property listing</Badge>
      <h1 className="mt-5 text-5xl font-black tracking-tight text-[#145F6B]">{title}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">A public-facing property page with location label, available units, amenities, rules, inquiry CTA, and synced listing status.</p>
      <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Surface className="min-h-96 bg-gradient-to-br from-[#17DEFE]/20 to-white">
          <div className="h-72 rounded-[1.5rem] bg-gradient-to-br from-[#17DEFE] via-[#32D2F7] to-[#145F6B]" />
          <h2 className="mt-6 text-2xl font-black text-[#145F6B]">Available units</h2>
          <SimpleTable table={{ title: "Units", columns: ["Unit", "Type", "Rent", "Status"], rows: [["A-204", "1 Bedroom", "KES 18,000", "Available"], ["B-103", "Bedsitter", "KES 9,500", "Viewing"], ["C-301", "2 Bedroom", "KES 28,000", "Reserved"]] }} />
        </Surface>
        <div className="grid gap-5">
          <InfoPanel panel={{ title: "Public location", description: "Show general area publicly while keeping internal access notes private.", items: ["Mtwapa, Kilifi County", "Nearby landmarks", "Viewing directions"] }} />
          <InfoPanel panel={{ title: "Listing sync", description: "Admin unit status changes should push into website listing data through the website-sync queue.", items: ["Featured control", "Publish toggle", "SEO metadata"] }} />
          <GradientButton href="/contact" label="Ask About This Property" />
        </div>
      </div>
    </section>
  );
}

export function UnitDetailPage({ slug }: { slug: string }) {
  const title = slug.split("-").map((word) => word[0]?.toUpperCase() + word.slice(1)).join(" ");
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Badge>Unit listing</Badge>
      <h1 className="mt-5 text-5xl font-black tracking-tight text-[#145F6B]">{title}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">Unit-level page for type, rent, deposit, photos, viewing instructions, public availability, and inquiry conversion.</p>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {[
          { label: "Monthly rent", value: "KES 18,000", helper: "Example display value" },
          { label: "Deposit", value: "1 Month", helper: "Deposit is not rent. We know, shocking." },
          { label: "Status", value: "Available", helper: "Controlled from admin" },
        ].map((stat) => <StatCard key={stat.label} stat={stat} />)}
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <InfoPanel panel={{ title: "Unit access detail", description: "Only safe details should be public. Block, floor, and door access notes remain operational unless explicitly allowed.", items: ["Unit label", "Public amenities", "Viewing CTA"] }} />
        <FormPreview title="Inquiry form" fields={[{ label: "Full name", placeholder: "Your name" }, { label: "Phone number", placeholder: "+254...", type: "tel" }, { label: "Message", placeholder: "I want to view this unit", type: "textarea" }]} />
      </div>
    </section>
  );
}

export function ContactPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
      <div>
        <Badge>Contact</Badge>
        <h1 className="mt-5 text-5xl font-black tracking-tight text-[#145F6B]">Talk to Glamandi Homes.</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">Send a viewing request, landlord inquiry, tenant issue, or general message. The inquiry should post to the CRM endpoint and queue follow-up if the team delays.</p>
        <div className="mt-8 grid gap-4">
          <InfoPanel panel={{ title: "Office area", description: "Mtwapa, Kilifi County, Kenya", items: ["Property viewing", "Tenant support", "Landlord onboarding"] }} />
        </div>
      </div>
      <FormPreview title="Send inquiry" fields={[{ label: "Full name", placeholder: "Your name" }, { label: "Phone", type: "tel", placeholder: "+254..." }, { label: "Email", type: "email", placeholder: "you@example.com" }, { label: "Inquiry type", type: "select", placeholder: "Viewing / Tenant / Landlord / General" }, { label: "Message", type: "textarea", placeholder: "Write your message" }]} />
    </section>
  );
}

export function LoginPage() {
  return (
    <section className="mx-auto grid min-h-[70vh] max-w-7xl place-items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#C5F0F8] bg-white shadow-2xl shadow-[#145F6B]/10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-gradient-to-br from-[#145F6B] to-[#181918] p-8 text-white">
          <Badge tone="light">Portal access</Badge>
          <h1 className="mt-6 text-4xl font-black">One login. Different faces.</h1>
          <p className="mt-4 text-sm leading-7 text-white/75">Route users by role into admin, staff, tenant, or landlord portal after authentication.</p>
          <ul className="mt-8 grid gap-3 text-sm text-white/80">
            <li>Admin Control Center</li>
            <li>Tenant rent and receipt portal</li>
            <li>Landlord statement portal</li>
            <li>Offline-aware staff operations</li>
          </ul>
        </div>
        <div className="p-8">
          <h2 className="mb-6 text-2xl font-black text-[#145F6B]">Sign in to your portal</h2>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}

export function OfflinePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <EmptyState title="Offline mode is not decoration. It is survival." description="Staff can view cached operational data and draft approved offline actions. Finance posting, receipt numbers, webhooks, payouts, and official statements wait for the server because money deserves adult supervision." action={{ href: "/login", label: "Return to portal" }} />
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <InfoPanel panel={{ title: "Allowed offline", description: "Safe drafts and cached records only.", items: ["Manual M-Pesa/KCB/cash drafts", "Repair tickets", "Inquiry capture", "Tenant notes"] }} />
        <InfoPanel panel={{ title: "Online only", description: "Actions requiring verification and source-of-truth posting.", items: ["Receipt generation", "Paystack verification", "Daraja STK callbacks", "Payout marking"] }} />
      </div>
    </section>
  );
}

export function LegalPage({ title, description }: { title: string; description: string }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Badge>Legal</Badge>
      <h1 className="mt-5 text-5xl font-black tracking-tight text-[#145F6B]">{title}</h1>
      <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p>
      <div className="mt-10 grid gap-5">
        {["Data handling", "Portal access", "Payments and receipts", "Service communication", "Security and audit logs"].map((item) => (
          <Surface key={item}><h2 className="font-black text-[#145F6B]">{item}</h2><p className="mt-2 text-sm leading-6 text-slate-600">Final legal wording should be reviewed before launch. This page is structured for production copy and SEO metadata.</p></Surface>
        ))}
      </div>
    </section>
  );
}
