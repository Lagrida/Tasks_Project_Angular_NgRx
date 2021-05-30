import { createAction, props } from '@ngrx/store';

export const UPDATE_ERROR_MESSAGE = '[Common] Load Commons';

export const errorMessageCommon = createAction(UPDATE_ERROR_MESSAGE, props<{ message: string }>());
