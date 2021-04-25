import create from 'zustand';

type State = {
	id: string;

	setid: (email: string) => void;
};

const idStore = create<State>((set) => ({
	id: '',

	setid: (email) =>
		set((state) => ({
			...state,
			id: email,
		})),
}));

export default idStore;
