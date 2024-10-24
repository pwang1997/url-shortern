"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import Form from "~/components/compound/form";

export default function GenerateShortenUrlPage() {
  const [shortUrl, setShortUrl] = useState('');

  return (
    <div className="md:container md:mx-auto">
      <div>
        <h3 className="text-3xl">
          Get <span className="text-[hsl(280,100%,70%)]">Started</span>
        </h3>
      </div>
      <div className="flex flex-row w-full">
        <div className="w-1/2">
          <Form setShortUrl={setShortUrl} />
        </div>
        <div>
          {
            !!shortUrl && (
              <div style={{ height: "auto", margin: "0 auto", width: "100%" }}>
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={shortUrl}
                  viewBox={`0 0 256 256`}
                />
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
