import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { IResponseMeta } from "@/types/response.type";
import { IRouteCollection } from "@/types/route.type";

interface PaginationProps {
  meta?: IResponseMeta;
  routes: IRouteCollection;
}

const PaginationSection = ({ meta, routes }: PaginationProps) => {
  const { total, take, page } = meta || {};
  const totalCount = total || 0;
  const limit = take || 5;
  const currentPage = page || 1;

  const totalPages = Math.ceil(totalCount / limit);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;
  return (
    <div className="flex w-full justify-end">
      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={routes.index.url({
                query: { page: currentPage - 1, take: limit },
              })}
              aria-disabled={!hasPrevious}
            />
          </PaginationItem>
          {
            /* Render page numbers dynamically based on totalPages */
            Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href={routes.index.url({
                      query: { page: pageNumber, take: limit },
                    })}
                    isActive={pageNumber === page}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })
          }
          <PaginationItem>
            <PaginationNext
              href={routes.index.url({
                query: { page: currentPage + 1, take: limit },
              })}
              aria-disabled={!hasNext}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationSection;
