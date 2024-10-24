import Form from "~/components/compound/form";


export default async function GenerateShortenUrlPage() {
  return (
    <div className="md:container md:mx-auto">
      <div>
        <h3 className="text-3xl">
          Get <span className="text-[hsl(280,100%,70%)]">Started</span>
        </h3>
      </div>
      <div>
        <Form />
      </div>
    </div>
  );
}
