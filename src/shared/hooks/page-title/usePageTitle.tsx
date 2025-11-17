import { useEffect } from "react";

interface UseDocumentTitleOptions {
  prefix?: string;
  suffix?: string;
  restoreOnUnmount?: boolean;
  defaultTitle?: string;
}

export const usePageTitle = (
  title: string,
  options: UseDocumentTitleOptions = {}
) => {
  const {
    prefix = "",
    suffix = "",
    restoreOnUnmount = false,
    defaultTitle = document.title,
  } = options;

  useEffect(() => {
    if (!title) return;

    const finalTitle = ` ${prefix} ${title} ${suffix} `;
    document.title = finalTitle;

    return () => {
      if (restoreOnUnmount) {
        document.title = defaultTitle;
      }
    };
  }, [title, prefix, suffix, restoreOnUnmount, defaultTitle]);
};
