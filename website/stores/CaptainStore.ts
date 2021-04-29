import create from 'zustand';

import { persist } from 'zustand/middleware';

type State = {
	captain: string;
	setcaptain: (cap: string) => void;
	vicecaptain: string;
	setvicecaptain: (vice: string) => void;
};

const captainStore = create<State>(
	persist(
		(set) => ({
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
		}),
		{
			name: 'captainDetails',
		}
	)
);

export default captainStore;
