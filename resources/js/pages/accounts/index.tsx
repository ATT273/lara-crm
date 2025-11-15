"use client";

import AccountProvider from "@/components/accounts/account-provider";
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
    if (props.flash?.message) {
      toast.success("Success", {
        description: props.flash.message.message,
        position: "top-right",
        richColors: true,
      });
    }
  }, [props.flash]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <AccountProvider userAuth={props.auth.user}>
        <Head title="Accounts" />
        <div className="flex items-center justify-end"></div>
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
          <PageContent data={accountsData.data} meta={accountsData.meta} />
        </div>
      </AccountProvider>
    </AppLayout>
  );
};

export default AccountPage;
