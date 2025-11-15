import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import accounts from "@/routes/accounts";
import { IResponseMeta } from "@/types/response.type";

interface PaginationProps {
  meta: IResponseMeta;
}

const PaginationSection = ({ meta }: PaginationProps) => {
  const { total, take, page } = meta;
  const totalPages = Math.ceil(total / take);
  const hasPrevious = page > 1;
  const hasNext = page < totalPages;
  return (
    <div className="flex w-full justify-end">
      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={accounts.index.url({
                query: { page: page - 1, take: 5 },
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
                    href={accounts.index.url({
                      query: { page: pageNumber, take: 5 },
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
              href={accounts.index.url({
                query: { page: page + 1, take: 5 },
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
