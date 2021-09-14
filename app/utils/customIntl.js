import translations from '../translations/en.json';
import { createIntl, createIntlCache } from '@formatjs/intl';

function customIntl() {
  return createIntl(
    {
      locale: 'en',
      messages: translations
    },
    createIntlCache()
  );
}
export default customIntl;
