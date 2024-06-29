import { Avatar, Divider } from "@nextui-org/react";
import { auth } from "@/auth";
export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) {
    return (
      <>
        <div className="dark flex flex-row border-0 mt-10 shadow-lg gap-10 p-4 justify-center">
          <h1 className="font-extralight text-2xl  bg-center text-center hover:transition-transform-opacity hover:scale-105">
            Please Login to Explore Healthy World
          </h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="wrapper gap-4 flex flex-col">
          <div className="dark flex flex-row border-0 shadow-lg gap-10 p-4 justify-center mt-0">
            <Avatar
              src={session.user.image || ""}
              className="w-30 h-30 text-large"
            />
            <div className="flex flex-col gap-4 text-center justify-center">
              <h1 className="font-extralight text-2xl bg-center text-center hover:transition-transform-opacity hover:scale-105">
                Hello There, {session.user.name}
              </h1>
              <h1 className="font-extralight text-2xl  bg-center text-center hover:transition-transform-opacity hover:scale-105">
                Let's Start your healthy day
              </h1>
            </div>
          </div>
        </div>
      </>
    );
  }
}
