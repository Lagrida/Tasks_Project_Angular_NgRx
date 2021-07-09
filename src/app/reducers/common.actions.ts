import { createAction, props } from '@ngrx/store';

export const SET_COMMON_ERROR_MESSAGE = '[Common] set common error message';

export const setCommonErrorMessage = createAction(SET_COMMON_ERROR_MESSAGE, props<{ message: string }>());
