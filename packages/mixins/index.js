import { validateMixin } from './validate';
import { pageMixin } from './pageMixin';

export default function (app) {
  app.mixin({
    mixins: [validateMixin, pageMixin],
  });
}
