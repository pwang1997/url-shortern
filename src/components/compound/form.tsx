import { type Dispatch, type SetStateAction, useActionState, useCallback, useEffect } from "react";
import { generateShortUrl } from "~/app/actions/generateShortUrl";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const initialState = {
    status: '',
    message: ''
}
export default function Form({ setShortUrl }: {
    setShortUrl: Dispatch<SetStateAction<string>>
}) {

    const [state, formAction] = useActionState(generateShortUrl, initialState);
    
    useEffect(() => {
        if (state.status === 'complete') {
            const { shortUrl } = state.message as { shortUrl: string};
            const newUrl = `${window.location.href}/shorten/${shortUrl}`;
            setShortUrl(newUrl);
        }
    }, [setShortUrl, state]);

    const renderErrorMessage = useCallback(() => {
        const { message } = state.message as { message: string };

        return (
            <span className=" text-red-600">
                {message}
            </span>
        )
    }, [state]);

    return (
        <form action={formAction} className="flex flex-col gap-4">
            <div>
                <Label htmlFor="longUrl">Long Url</Label>
                <Input name="longUrl" />
            </div>

            <div>
                <Label htmlFor="urlLength">Short Url Length</Label>
                <Input name="urlLength" type="number" defaultValue={5} />
            </div>
            <div>
                <Button type="submit">Generate</Button>
            </div>
            <div>
                {
                    state.status === 'error' && renderErrorMessage()
                }
            </div>
        </form>
    )
}