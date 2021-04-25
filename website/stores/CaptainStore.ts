import create from 'zustand';

type State = {
	captain: string;

	setcaptain: (cap: string) => void;
	vicecaptain: string;
	setvicecaptain: (vice: string) => void;
};

const captainStore = create<State>((set) => ({
	captain: '',

	setcaptain: (email) =>
		set((state) => ({
			...state,
			captain: email,
		})),
	vicecaptain: '',
	setvicecaptain: (email) =>
		set((state) => ({
			...state,
			vicecaptain: email,
		})),
}));

export default captainStore;
