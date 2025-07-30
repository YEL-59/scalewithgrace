import { useGetSinglePage } from "@/hooks/system.hook";
import { useParams } from "react-router";

const DynamicPage = () => {
  const { slug } = useParams();
  const { data: page, isLoading, isError } = useGetSinglePage(slug);

  if (isLoading) return <p className="p-4 text-center">Loading...</p>;

  if (isError || !page)
    return <p className="p-4 text-center">Page not found</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{page.page_title}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: page.page_content }}
      />
    </div>
  );
};

export default DynamicPage;
