import { IAccountResponse } from "@/types/account.type";
import { IResponseMeta } from "@/types/response.type";
import AccountTable from "./account-table";
import PaginationSection from "./pagination";

interface PageContentProps {
  data: IAccountResponse[];
  meta: IResponseMeta;
}

const PageContent = ({ data, meta }: PageContentProps) => {
  return (
    <div className="flex h-full flex-col gap-4">
      <AccountTable accounts={data} />
      <PaginationSection meta={meta} />
    </div>
  );
};

export default PageContent;
