import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

 
export default async function Page() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const headersList = headers();
  // read the custom x-url header
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const header_url = (await headersList).get('x-url') ?? "";
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const segments = header_url.split("/");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/non-nullable-type-assertion-style
  const shortUrl = segments.length > 0 ? segments[segments.length - 1] as string : '';

  const res = await api.url.getOriginalUrl({ shortUrl });
  if(res.length > 0) {
    console.log(`Redirecting to ${res[0]?.longUrl?? ''}`);
    redirect(`${res[0]?.longUrl?? ''}`);
  } else {
    return(
      <div className="container">
        <p>Invalid Short Url</p>
      </div>
    )
  }

}