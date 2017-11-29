export interface State {
    error: string | null;
    pending: boolean;
  }
  
  export const initialState: State = {
    error: null,
    pending: false,
  };