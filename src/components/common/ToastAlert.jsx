import { useToast } from "@chakra-ui/react";


export default function useToastAlert() {
  const toast = useToast();

  const showToast = (title, status = "info", description = "", duration = 3000) => {
    toast({
      title,
      description,
      status,
      duration,
      isClosable: true,
      position: "top",
      variant: "subtle",
    });
  };

  return {
    success: (msg, desc) => showToast(msg, "success", desc),
    error: (msg, desc) => showToast(msg, "error", desc),
    warning: (msg, desc) => showToast(msg, "warning", desc),
    info: (msg, desc) => showToast(msg, "info", desc),
  };
}
