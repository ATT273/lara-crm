import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { IAccountResponse } from "./account.type";

export interface IPaginate {
  take: number;
  page: number;
}

export interface IResponseMeta extends IPaginate {
  total: number;
  count: number;
}

export interface IListResponseData<T> {
  data: T[];
  meta: IResponseMeta;
}

export interface IPageProps<T> extends InertiaPageProps {
  data: IListResponseData<T>;
  auth: { user: IAccountResponse };
  flash?: { message?: { message: string; code: string } };
  error?: { [key: string]: string[] };
  sidebarOpen?: boolean;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
}
