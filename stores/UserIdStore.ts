import create from 'zustand';

import { persist } from 'zustand/middleware';

type State = {
	userId: string;

	setuserId: (email: string) => void;
};

const userIdStore = create<State>(
	persist(
		(set) => ({
			userId: '',

			setuserId: (userId) =>
				set((state) => ({
					...state,
					userId: userId,
				})),
		}),
		{
			name: 'userId',
		}
	)
);

export default userIdStore;
