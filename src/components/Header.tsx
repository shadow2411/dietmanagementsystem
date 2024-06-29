//navbar
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Divider,
} from "@nextui-org/react";

import * as actions from "@/actions";
import { auth } from "@/auth";

export default async function Header() {
  const session = await auth();

  return (
    <>
      <Navbar className="shadow mb-6 flex flex-row">
        <NavbarBrand>
          <Link className="cursor-pointer" href="/">
            <p className=" text-inherit font-extralight text-xl pl-0">
              Diet App
            </p>
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          {!session?.user ? (
            <NavbarItem>
              <form action={actions.signIn}>
                <Button type="submit" color="primary" variant="flat">
                  Sign In with Google
                </Button>
              </form>
            </NavbarItem>
          ) : (
            <Popover placement="left">
              <PopoverTrigger className="cursor-pointer ">
                <Avatar src={session.user.image || ""} />
              </PopoverTrigger>
              <PopoverContent>
                <div className="p-4 flex flex-col gap-4">
                  <div className="flex flex-row gap-4">
                    <Avatar size="lg" src={session.user.image || ""} />
                    <div>
                      <p className="text-lg font-bold">{session.user.name}</p>
                      <p className="text-sm text-gray-400">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                  <Divider />
                  <form action={actions.signOut}>
                    <Button type="submit" className="w-full">
                      Sign Out
                    </Button>
                  </form>
                  <Link href="/dashboard">
                    <Button className="w-full">Dashboard</Button>
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </NavbarContent>
      </Navbar>
    </>
  );
}
