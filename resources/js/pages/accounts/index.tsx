"use client";

import PageContent from "@/components/accounts/page-content";
import AppLayout from "@/layouts/app-layout";
import accounts from "@/routes/accounts";
import { type BreadcrumbItem } from "@/types";
import { IAccountResponse } from "@/types/account.type";
import { IListResponseData, IPageProps } from "@/types/response.type";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";

const AccountPage = () => {
  const { props } = usePage<IPageProps<IAccountResponse>>();
  console.log("props", props);
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Accounts",
      href: accounts.index().url,
    },
  ];

  const accountsData = useMemo(() => {
    const { data, meta } = props["data"] as IListResponseData<IAccountResponse>;

    return {
      data: data,
      meta: meta,
    };
  }, [props]);

  useEffect(() => {
    console.log("props.flash.message", props.flash?.message);
    if (props.flash?.message) {
      toast.success("Success", {
        description: props.flash.message,
        position: "top-right",
        richColors: true,
      });
    }
  }, [props.flash]);

  console.log("accountsData", accountsData);
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Accounts" />
      <div className="flex items-center justify-end">
        {/* <NewProductDrawer /> */}
      </div>
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <PageContent data={accountsData.data} meta={accountsData.meta} />
      </div>
    </AppLayout>
  );
};

export default AccountPage;
