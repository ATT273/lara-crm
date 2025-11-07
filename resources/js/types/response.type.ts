import { PageProps as InertiaPageProps } from "@inertiajs/core";

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
  auth: IUser;
  flash?: { message?: string };
  error?: { [key: string]: string[] };
  sidebarOpen?: boolean;
}

// export interface PageProps extends InertiaPageProps {
//     flash?: {
//       message?: string;
//       success?: string;
//       error?: string;
//     };

//     // Nếu bạn có thêm props khác, thêm vào đây
//     auth?: {
//       user: {
//         id: number;
//         name: string;
//       } | null;
//     };
//   }

export interface IUser {
  id: number;
  name: string;
  email: string;
}
