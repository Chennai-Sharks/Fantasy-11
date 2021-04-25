import create from 'zustand';

type State = {
	selectedPlayers: string[];

	setSelectedPlayers: (email: string[]) => void;
};

const jwtStore = create<State>((set) => ({
	selectedPlayers: [''],

	setSelectedPlayers: (selectedPlayers) =>
		set((state) => ({
			...state,
			selectedPlayers: selectedPlayers,
		})),
}));

export default jwtStore;
