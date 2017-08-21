import {InjectionToken } from '@angular/core';

import { LANG_GB_NAME, LANG_GB_TRANS } from './lang-gb';
import { LANG_BR_NAME, LANG_BR_TRANS } from './lang-br';
import { LANG_DE_NAME, LANG_DE_TRANS } from './lang-de';
import { LANG_FR_NAME, LANG_FR_TRANS } from './lang-fr';

export const TRANSLATIONS = new InjectionToken('translations');

export const dictionary = {
  [LANG_GB_NAME]: LANG_GB_TRANS,
  [LANG_BR_NAME]: LANG_BR_TRANS,
  [LANG_DE_NAME]: LANG_DE_TRANS,
  [LANG_FR_NAME]: LANG_FR_TRANS,
};

export const TRANSLATION_PROVIDERS = [
  { provide: TRANSLATIONS, useValue: dictionary},
];
