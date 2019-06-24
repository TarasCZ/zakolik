import { AppState, RouterStateUrl } from '@app/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterStateUrl
>('router');

export const selectRouterParam = createSelector(
  selectRouterState,
  (router, param) => router.state.params[param]
);
