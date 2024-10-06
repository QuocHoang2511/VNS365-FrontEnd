import "./globals.css";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "dayjs/locale/vi";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import Provider from "@/providers/provider";
import SessionProvider from "@/providers/sessionProvider";
import QueryClientProvider from "@/providers/queryClientProvider";
import { Notifications } from "@mantine/notifications";
import ModalsProvider from "@/providers/modalProvider";
import PayPalProvider from "@/providers/paypalProvider";
import { ToastProvider } from "@/providers/toastProvider";

export const metadata = {
  title: "VN Food",
  description: "VN Food",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <SessionProvider>
          <QueryClientProvider>
            <Provider>
              <PayPalProvider>
                <MantineProvider>
                  <ModalsProvider>
                    <Notifications position="top-right" />
                    <ToastProvider />
                    {children}
                  </ModalsProvider>
                </MantineProvider>
              </PayPalProvider>
            </Provider>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
