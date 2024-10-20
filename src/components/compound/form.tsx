"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function Form() {
    return (
        <div className="flex flex-col gap-4 w-1/2">
            <div>
                <Label htmlFor="longUrl">Long Url</Label>
                <Input name="longUrl" />
            </div>

            <div>
                <Label htmlFor="domain">Domain</Label>
                <Input name="domain" />
            </div>
            <div>
                <Button>Generate</Button>
            </div>
        </div>
    )
}