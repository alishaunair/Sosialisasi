import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IConnection } from "@/types/Home";

const connectionServices = {
  toggleConnection: (targetUserId: string) =>
    instance
      .post<{
        message: string;
        data?: any;
      }>(`${endpoint.CONNECT}/${targetUserId}`)
      .then((res) => res.data),

  acceptConnection: (requesterId: string) =>
    instance
      .patch<{
        message: string;
        data?: any;
      }>(`${endpoint.CONNECT}/${requesterId}`)
      .then((res) => res.data),

  rejectConnection: (requesterId: string) =>
    instance
      .patch<{
        message: string;
        data?: any;
      }>(`${endpoint.CONNECT}/rejected/${requesterId}`)
      .then((res) => res.data),

  getConnections: () =>
    instance
      .get<{ data: IConnection[] }>(`${endpoint.CONNECT}`)
      .then((res) => res.data.data),

  getPendingConnections: () =>
    instance
      .get<{ data: IConnection[] }>(`${endpoint.CONNECT}/pending`)
      .then((res) => res.data.data),
};

export default connectionServices;
