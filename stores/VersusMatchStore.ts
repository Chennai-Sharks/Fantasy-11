import create from 'zustand';

import { persist } from 'zustand/middleware';

type State = {
	oneTeam: string;
	twoTeam: string;
	setoneTeam: (oneTeam: string) => void;
	setTwoTeam: (twoTeam: string) => void;
};

const versusMatchStore = create<State>(
	persist(
		(set) => ({
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
		}),
		{
			name: 'MatchDetails',
		}
	)
);

export default versusMatchStore;
