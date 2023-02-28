export type State = {
  isOpen: boolean;
};
enum ActionTypes {
  OPEN_SIDEBAR = 'OPEN_SIDEBAR',
  CLOSE_SIDEBAR = 'CLOSE_SIDEBAR',
  TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR',
}

type Action =
  | { type: ActionTypes.OPEN_SIDEBAR; payload: boolean }
  | { type: ActionTypes.CLOSE_SIDEBAR; payload: boolean }
  | { type: ActionTypes.TOGGLE_SIDEBAR };

export const ActionCreators = {
  open: (): Action => ({
    type: ActionTypes.OPEN_SIDEBAR,
    payload: true,
  }),
  close: (): Action => ({
    type: ActionTypes.CLOSE_SIDEBAR,
    payload: true,
  }),
  toggle: (): Action => ({
    type: ActionTypes.TOGGLE_SIDEBAR,
  }),
};

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.OPEN_SIDEBAR:
      return {
        ...state,
        isOpen: true,
      };
    case ActionTypes.CLOSE_SIDEBAR:
      return {
        ...state,
        isOpen: false,
      };
    case ActionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
}
