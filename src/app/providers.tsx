'use client';

import { RickAndMortyProvider } from "./_presentation/context/rick-and-morty-context";

export function Providers({ children }: any): JSX.Element {
	return <RickAndMortyProvider>{children}</RickAndMortyProvider>;
}
