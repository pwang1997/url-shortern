/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

 
export default async function Page() {
  const headersList = headers();
  // read the custom x-url header
  const header_url = (await headersList).get('x-url') || "";
  const segments = header_url.split("/");
  const shortUrl = segments[segments.length - 1] as string;

  const res = await api.url.getOriginalUrl({ shortUrl });
  if(res.length > 0) {
    console.log(`Redirecting to ${res[0] == undefined ? '' : res[0].longUrl}`);
    redirect(`${res[0] == undefined ? '' : res[0].longUrl}`);
  } else {
    return(
      <div className="container">
        <p>Invalid Short Url</p>
      </div>
    )
  }

}