import { PendingPatientListApi } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientListApi";
import type { AppDispatch } from "@/shared/redux/stores/stores";
import { useEffect } from "react";

/**
 * useRealtimeRTKQuerySync
 * 
 * @param wsMessages - WebSocket messages array
 * @param clearMessages - WS clear function
 * @param endpoint - RTK Query endpoint key (string literal)
 * @param queryArgs - query args used in the hook
 * @param page - current page (for pagination)
 * @param limit - page size
 * @param transformPayload - optional function to normalize payload
 */
export function useRealtimeRTKQuerySync<
  TData extends { _id: string },
  TArgs extends object
>({
  wsMessages,
  clearMessages,
  endpoint,
  queryArgs,
  page,
  limit,
  dispatch,
  transformPayload,
}: {
  wsMessages: { type: string; payload: Partial<TData> }[];
  clearMessages: () => void;
  endpoint: string;
  queryArgs: TArgs;
  page: number;
  limit: number;
  dispatch: AppDispatch;
  transformPayload?: (payload: Partial<TData>) => TData;
}) {
  useEffect(() => {
    if (!wsMessages.length) return;

    wsMessages.forEach((msg) => {
      if (!msg.payload?._id) return;
      dispatch(
        PendingPatientListApi.util.updateQueryData(
          "getPendingPatientList",
          queryArgs,
          (draft) => {
            wsMessages.forEach((msg) => {
              if (!msg.payload?._id) return;
              const normalized = transformPayload
                ? transformPayload(msg.payload)
                : (msg.payload as unknown as TData);

              const exists = draft.data.some((item) => item._id === normalized._id);
              if (!exists) {
                draft.data = [normalized, ...draft.data].slice(0, limit); // <- assign new array
              } else {
                draft.data = draft.data.map((item) =>
                  item._id === normalized._id ? { ...item, ...normalized } : item
                );
              }
            });

            // Update pagination immutably
            draft.pagination = {
              ...draft.pagination,
              totalPages: Math.ceil(draft.pagination.totalPages * limit / limit),
              hasNext: draft.pagination.currentPage < draft.pagination.totalPages,
            };
          }
        )
      );

      clearMessages();

    });

    clearMessages();
  }, [wsMessages, page, limit, queryArgs, dispatch, clearMessages, transformPayload, endpoint]);
}
