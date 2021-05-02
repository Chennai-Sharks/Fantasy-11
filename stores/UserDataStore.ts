import create from 'zustand';

type State = {
	email: string;
	phone: string;
	password: string;
	setEmail: (email: string) => void;
	setphone: (phone: string) => void;
	setpassword: (password: string) => void;
};

const userDataStore = create<State>((set) => ({
	email: '',
	phone: '',
	password: '',
	setEmail: (email) =>
		set((state) => ({
			...state,
			email: email,
		})),
	setphone: (phone) =>
		set((state) => ({
			...state,
			phone: phone,
		})),
	setpassword: (password) =>
		set((state) => ({
			...state,
			password: password,
		})),
}));

export default userDataStore;
