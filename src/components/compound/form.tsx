"use client";

import { useActionState } from "react";
import { generateShortUrl } from "~/app/actions/generateShortUrl";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const initialState = {
    status : '',
    message : ''
}
export default function Form() {

    const [state, formAction] = useActionState(generateShortUrl, initialState);

    return (
        <div className="flex flex-col p-4 md:gap-4 md:w-1/2 ">
            <form action={formAction} className="flex flex-col gap-4">
                <div>
                    <Label htmlFor="longUrl">Long Url</Label>
                    <Input name="longUrl" />
                </div>

                <div>
                    <Label htmlFor="domain">Domain</Label>
                    <Input name="domain" />
                </div>
                <div>
                    <Label htmlFor="urlLength">Short Url Length</Label>
                    <Input name="urlLength" type="number" defaultValue={5} />
                </div>
                <div>
                    <Button type="submit">Generate</Button>
                </div>
            </form>
        </div>
    )
}