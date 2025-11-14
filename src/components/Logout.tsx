import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { authService } from "@/api/services";
import { tokenManager } from "@/api/axios/tokenManager";

export default function Logout() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      tokenManager.clearToken();
      queryClient.resetQueries({ queryKey: ["auth"] });
    },
  });

  return (
    <Button
      className="h-auto rounded-lg px-4 py-2 text-base font-medium"
      variant="forest"
      onClick={() => mutate()}
      disabled={isPending}
    >
      Logout
    </Button>
  );
}
