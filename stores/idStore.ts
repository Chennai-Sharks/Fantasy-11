import create from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
	id: string;

	setid: (email: string) => void;
};

const idStore = create<State>(
	persist(
		(set) => ({
			id: '',

			setid: (email) =>
				set((state) => ({
					...state,
					id: email,
				})),
		}),
		{
			name: 'matchId',
			getStorage: () => sessionStorage,
		}
	)
);

export default idStore;
