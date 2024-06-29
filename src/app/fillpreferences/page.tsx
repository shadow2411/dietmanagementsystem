import { auth } from "@/auth";
import Form from "@/components/Form";

export default async function FillPreferences() {
  const session = await auth();

  if (!session?.user) {
    return (
      <>
        <div className="dark flex flex-row border-0 mt-10 shadow-lg gap-10 p-4 justify-center">
          <h1 className="font-extralight text-2xl  bg-center text-center hover:transition-transform-opacity hover:scale-105">
            Please Login to Fill your Preferences
          </h1>
        </div>
      </>
    );
  } else {
    return <Form />;
  }
}
