import create from 'zustand';

type State = {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setpassword: (password: string) => void;
};

const userDataStore = create<State>((set) => ({
  email: '',
  password: '',
  setEmail: (email) =>
    set((state) => ({
      ...state,
      email: email,
    })),
  setpassword: (password) =>
    set((state) => ({
      ...state,
      password: password,
    })),
}));

export default userDataStore;
