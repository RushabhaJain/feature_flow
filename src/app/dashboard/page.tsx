import { auth } from "@/auth";
import ButtonCheckout from "@/components/ButtonCheckout";
import { ButtonLogout } from "@/components/ButtonLogout";
import ButtonPortal from "@/components/ButtonPortal";
import FormNewBoard from "@/components/FormNewBoard";
import { connectToMongo } from "@/lib/mongoose";
import User from "@/models/User";
import Link from "next/link";

async function getUser() {
  const session = await auth();

  await connectToMongo();
  console.log(session);
  if (session?.user?.id) {
    const user = await User.findById(session?.user?.id).populate("boards");
    return user;
  }

  return null;
}

export default async function Page() {
  const user = await getUser();
  if (!user) {
    return <div>Nothing</div>;
  }
  return (
    <main className="bg-base-200 min-h-screen">
      {/* Header */}
      <section className="bg-base-100 px-5 py-3">
        <div className="max-w-5xl mx-auto flex justify-between">
          {user.hasAccess ? <ButtonPortal /> : <ButtonCheckout />}
          <ButtonLogout />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 py-12 max-md:space-y-12 flex gap-12">
        <FormNewBoard />
        <div className="w-full flex-grow">
          <h1 className="font-extrabold text-xl mb-8">
            {user.boards.length} Boards
          </h1>

          <ul className="space-y-6">
            {user.boards.map((board) => {
              return (
                <li key={board._id}>
                  <Link
                    href={`/dashboard/b/${board._id}`}
                    className="block p-6 hover:bg-neutral bg-base-100 rounded-3xl hover:text-neutral-content duration-200"
                  >
                    {board.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
