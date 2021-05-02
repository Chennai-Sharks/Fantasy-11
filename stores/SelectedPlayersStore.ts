import create from 'zustand';

import { persist } from 'zustand/middleware';

type State = {
	selectedPlayers: string[];

	setSelectedPlayers: (email: string[]) => void;
};

const selectedPlayersStore = create<State>(
	persist(
		(set) => ({
			selectedPlayers: [''],

			setSelectedPlayers: (selectedPlayers) =>
				set((state) => ({
					...state,
					selectedPlayers: selectedPlayers,
				})),
		}),
		{
			name: 'selectedPlayersArray',
			getStorage: () => sessionStorage,
		}
	)
);

export default selectedPlayersStore;
