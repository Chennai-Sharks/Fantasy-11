import create from 'zustand';

type State = {
	jwt: string;

	setJwt: (email: string) => void;
};

const jwtStore = create<State>((set) => ({
	jwt: '',

	setJwt: (email) =>
		set((state) => ({
			...state,
			email: email,
		})),
}));

export default jwtStore;
