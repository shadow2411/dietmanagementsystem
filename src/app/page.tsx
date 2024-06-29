import { Button, Link } from "@nextui-org/react";
import { auth } from "@/auth";
export default async function Home() {
  const session = await auth();
  if (!session?.user) {
    return <h1 className="text-2xl">You are not signed in</h1>;
  } else {
    return (
      <>
        <Link href="/fillpreferences">
          <Button color="primary">Fill your Preferences</Button>
        </Link>
      </>
    );
  }
}
