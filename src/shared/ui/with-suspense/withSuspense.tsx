import { Loader } from "@/shared/ui";
import { Suspense, type ReactNode } from "react";

const withSuspense = (component: ReactNode) => (
  <Suspense fallback={<Loader type="full_width" />}>{component}</Suspense>
);
export default withSuspense