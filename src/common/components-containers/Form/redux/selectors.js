// @flow
import { createSelector } from 'reselect';
import * as R from 'ramda';

const getLandingsConstructorModule = pathToStore => state => R.path(pathToStore, state);

export const getFormState = (pathToStore: Array<string>) =>
  createSelector(
    getLandingsConstructorModule(pathToStore),
    land => land.form,
  );

export const getFormValid = (pathToStore: Array<string>) =>
  createSelector(
    getLandingsConstructorModule(pathToStore),
    land => land.form,
  );
