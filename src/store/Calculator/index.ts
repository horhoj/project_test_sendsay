import { actions, reducer } from './slice';

import * as selectors from './selectors';

export const calculatorSlice = { actions, selectors, reducer } as const;
