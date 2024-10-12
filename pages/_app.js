import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";
import Head from "next/head";
import Layout from "@/layout";

export default function App({ Component, pageProps }) {
    const queryClient = new QueryClient();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Head>
                    <title>online shop</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.png" />
                </Head>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </QueryClientProvider>
        </>
    );
}
