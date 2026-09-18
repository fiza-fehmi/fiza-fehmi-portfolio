import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", background: "#050505", color: "#f5f5f5" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "4rem", fontWeight: 900 }}>404</h1>
        <p style={{ marginTop: "1rem", color: "#929292" }}>Page not found.</p>
        <a href="/" style={{ marginTop: "1.5rem", display: "inline-block", color: "#b7ff32" }}>Go home</a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", background: "#050505", color: "#f5f5f5" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Something went wrong</h1>
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.5rem", justifyContent: "center" }}>
          <button onClick={() => { router.invalidate(); reset(); }} style={{ padding: "0.5rem 1rem", background: "#b7ff32", color: "#050505", borderRadius: "0.5rem", border: "none", cursor: "pointer", fontWeight: 600 }}>
            Try again
          </button>
          <a href="/" style={{ padding: "0.5rem 1rem", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "0.5rem", color: "#f5f5f5", textDecoration: "none" }}>
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
