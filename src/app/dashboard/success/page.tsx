import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-base-200 flex justify-center items-center">
      <section className="bg-base-100 rounded-3xl flex p-8 flex-col gap-8 items-center">
        <h1 className="font-extrabold text-xl text-center">
          Thank you for your purchase ❤️
        </h1>
        <Link href="/dashboard" className="btn btn-primary">
          Dashboard
        </Link>
      </section>
    </main>
  );
}
