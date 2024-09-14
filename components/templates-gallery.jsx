import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";

export default function TemplateGallery({ templateData, onSelect }) {
  return (
    <div className="py-8 sm:px-6 lg:px-8 rounded-md">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-[#3b51a3] dark:text-gray-100">
          Resume Template Gallery
        </h2>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
          Browse our collection of professional resume templates.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {Object.entries(templateData).map(([templateId, template]) => (
          <div
            key={templateId}
            onClick={() => onSelect(templateId)}
            className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800"
          >
            <div className="aspect-w-4 aspect-h-3">
              <img
                src="/placeholder.svg"
                alt={templateId}
                width={600}
                height={450}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                style={{ aspectRatio: "600/450", objectFit: "cover" }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#3b51a3] dark:text-gray-100">
                {templateId}
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                A clean and contemporary resume template.
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="bg-[#3b51a3] text-white">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
