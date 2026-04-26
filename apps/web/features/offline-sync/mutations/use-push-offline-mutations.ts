"use client";
import { useMutation } from "@tanstack/react-query";
import { pushPendingMutations } from "@/lib/offline/sync-client";
export function usePushOfflineMutations() { return useMutation({ mutationFn: pushPendingMutations }); }
