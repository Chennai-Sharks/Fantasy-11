import create from 'zustand';

type State = {
	hash: string;

	sethash: (email: string) => void;
};

const hashStore = create<State>((set) => ({
	hash: '',

	sethash: (hash) =>
		set((state) => ({
			...state,
			hash: hash,
		})),
}));

export default hashStore;
