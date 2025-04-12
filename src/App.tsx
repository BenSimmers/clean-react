import {
    ComponentProps,
    JSX,
    JSXElementConstructor,
    memo,
    ReactNode,
    useMemo,
} from "react";
import React from "react";

import "./App.css";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import { TodoPage } from "./pages";
import { BrowserRouter, Outlet } from "react-router-dom";

import { Navigation, Paths } from "./components/navigation";

type InferProps<T> = T extends JSXElementConstructor<infer P> ? P : never;

type ProviderWithProps<T extends JSXElementConstructor<React.ElementType>> = [
    T,
    Omit<ComponentProps<T>, "children"> & { children?: ReactNode },
];

type InferProviderArray<
    T extends ReadonlyArray<JSXElementConstructor<React.ElementType>>,
> = {
    [K in keyof T]: T[K] extends JSXElementConstructor<React.ElementType>
        ? ProviderWithProps<T[K]>
        : never;
};

type ProvidersProps<T extends JSXElementConstructor<React.ElementType>[]> = {
    children: ReactNode;
    providers: InferProviderArray<T>;
};

const typeSafeReactCreateElement = <T extends JSXElementConstructor<unknown>>(
    Component: T,
    props: InferProps<T>,
    children: ReactNode,
) => React.createElement(Component, props, children);

const ProviderStack = memo(
    <T extends JSXElementConstructor<unknown>[]>({
        providers,
        children,
    }: ProvidersProps<T>): JSX.Element =>
        providers.reduceRight(
            (node, [Provider, props]) =>
                typeSafeReactCreateElement(Provider, props, node),
            <>{children}</>,
        ),
);

const Providers = memo(
    <T extends JSXElementConstructor<unknown>[]>({
        children,
        providers,
    }: ProvidersProps<T>): JSX.Element => (
        <ProviderStack providers={providers} children={children} />
    ),
);

const paths = [
    {
        path: "/",
        element: <Outlet />,
    },

    {
        path: "/todos",
        element: <TodoPage />,
    },
    {
        path: "*",
        element: <h1>404</h1>,
    },
];

const App = () => {
    const providers: ProviderWithProps<JSXElementConstructor<unknown>>[] =
        useMemo(
            () => [
                [Provider as JSXElementConstructor<unknown>, { store }],
                [BrowserRouter as JSXElementConstructor<unknown>, {}],
            ],
            [],
        );

    return (
        <Providers providers={providers}>
            <Navigation />
            <Paths paths={paths} />
        </Providers>
    );
};

export default App;
