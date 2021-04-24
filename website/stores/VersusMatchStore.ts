import create from 'zustand';

type State = {
	oneTeam: string;
	twoTeam: string;
	setoneTeam: (oneTeam: string) => void;
	setTwoTeam: (twoTeam: string) => void;
};

const versusMatchStore = create<State>((set) => ({
	oneTeam: '',
	twoTeam: '',
	setoneTeam: (oneTeam) =>
		set((state) => ({
			...state,
			oneTeam: oneTeam,
		})),
	setTwoTeam: (twoTeam) =>
		set((state) => ({
			...state,
			twoTeam: twoTeam,
		})),
}));

export default versusMatchStore;
